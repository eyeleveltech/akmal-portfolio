const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('src/akmal-raw.html', 'utf-8');

// A very naive regex to extract sections. 
// We will look for <!-- ═══ SECTION NAME ═══ --> or <!-- ── SECTION NAME ── -->
// and capture until the next one.

const sections = [
  { id: 'Nav', regex: /<!-- ═══ NAV ═══ -->([\s\S]*?)<!-- ── SECTION 1: HERO ── -->/ },
  { id: 'HeroSection', regex: /<!-- ── SECTION 1: HERO ── -->([\s\S]*?)<!-- ── SECTION 2: STORY ── -->/ },
  { id: 'StorySection', regex: /<!-- ── SECTION 2: STORY ── -->([\s\S]*?)<!-- ── SECTION 3: WORK ── -->/ },
  { id: 'WorkSection', regex: /<!-- ── SECTION 3: WORK ── -->([\s\S]*?)<!-- ── SECTION 4: WRITING ── -->/ },
  { id: 'WritingSection', regex: /<!-- ── SECTION 4: WRITING ── -->([\s\S]*?)<!-- ═══ SECTION 5: CREDENTIALS ═══ -->/ },
  { id: 'CredentialsSection', regex: /<!-- ═══ SECTION 5: CREDENTIALS ═══ -->([\s\S]*?)<!-- ═══ SECTION 6: TESTIMONIALS ═══ -->/ },
  { id: 'TestimonialsSection', regex: /<!-- ═══ SECTION 6: TESTIMONIALS ═══ -->([\s\S]*?)<!-- ═══ BOOK A CALL ═══ -->/ },
  { id: 'BookCallSection', regex: /<!-- ═══ BOOK A CALL ═══ -->([\s\S]*?)<!-- ═══ FOOTER ═══ -->/ },
  { id: 'Footer', regex: /<!-- ═══ FOOTER ═══ -->([\s\S]*?)$/ }
];

fs.mkdirSync('src/components/sections', { recursive: true });

function convertHtmlToJsx(html) {
  let jsx = html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/autocomplete=/g, 'autoComplete=')
    .replace(/novalidate/g, 'noValidate')
    .replace(/<img([^>]+[^\/])>/g, '<img$1 />')
    .replace(/<input([^>]+[^\/])>/g, '<input$1 />')
    .replace(/<br>/g, '<br />');
    
  return jsx;
}

sections.forEach(sec => {
  const match = html.match(sec.regex);
  if (match) {
    let content = match[1].trim();
    content = convertHtmlToJsx(content);
    
    const componentCode = `export function ${sec.id}() {\n  return (\n    <>\n      ${content}\n    </>\n  );\n}\n`;
    fs.writeFileSync(`src/components/sections/${sec.id}.tsx`, componentCode);
  }
});

// Create index.ts
const exportsStr = sections.map(sec => `export * from './${sec.id}';`).join('\n');
fs.writeFileSync('src/components/sections/index.ts', exportsStr);

console.log('Done generating components.');
