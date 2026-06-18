import { google } from 'googleapis';
import crypto from 'crypto';

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

  // Parse date and time (assuming date is YYYY-MM-DD and time is HH:MM in local timezone, but we'll assume it's roughly parsed)
  // Let's create a generic start time and end time (+30 mins) based on the inputs
  const startTime = new Date(`${date}T${time}:00`);
  const endTime = new Date(startTime.getTime() + 30 * 60000);

  const event = {
    summary: `Meeting with ${name}`,
    description: `Booked via website.`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'UTC', // Using UTC for simplicity, adjust to your local timezone if needed
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'UTC',
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
