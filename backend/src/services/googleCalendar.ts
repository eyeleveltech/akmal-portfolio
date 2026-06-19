import { google } from 'googleapis';
import crypto from 'crypto';

// The frontend sends time as a 12-hour string like "02:30 PM". Convert it to
// 24-hour "HH:MM" so `new Date(\`${date}T${time}:00\`)` parses correctly.
// Also accepts an already-24-hour "HH:MM" value unchanged.
function to24Hour(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) {
    throw new Error(`Unrecognised time format: "${time}"`);
  }

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridiem = match[3]?.toUpperCase();

  if (meridiem) {
    if (hours === 12) hours = 0;
    if (meridiem === 'PM') hours += 12;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

export async function createMeetEvent(name: string, email: string, date: string, time: string) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error('Google OAuth credentials are not fully configured in .env');
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:5000/oauth2callback' // redirect URL is typically not needed for just refreshing, but required by constructor
  );

  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // The booked time is wall-clock time in the host's timezone (configurable,
  // defaults to Asia/Kolkata). We build naive "YYYY-MM-DDTHH:MM:SS" strings
  // and let Google interpret them in `timeZone`. Arithmetic for the 30-minute
  // end time is done by treating the naive value as UTC purely for the +30min
  // shift, then stripping back to a naive wall-clock string (this also handles
  // hour/day rollover correctly).
  const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Kolkata';
  const startNaive = new Date(`${date}T${to24Hour(time)}:00Z`);
  if (isNaN(startNaive.getTime())) {
    throw new Error(`Invalid date/time: "${date}" "${time}"`);
  }
  const endNaive = new Date(startNaive.getTime() + 30 * 60000);
  const toWallClock = (d: Date) => d.toISOString().slice(0, 19); // drop the trailing "Z"

  const event = {
    summary: `Meeting with ${name}`,
    description: `Booked via website.`,
    start: {
      dateTime: toWallClock(startNaive),
      timeZone,
    },
    end: {
      dateTime: toWallClock(endNaive),
      timeZone,
    },
    attendees: [{ email }],
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1, // Required to generate the Meet link
      sendUpdates: 'all', // Send email invite to the attendee
    });

    return res.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}
