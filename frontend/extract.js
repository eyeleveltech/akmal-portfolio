import fs from 'fs';

const content = fs.readFileSync('src/lib/akmal-content.ts', 'utf-8');

const styleMatch = content.match(/export const PAGE_STYLE = `([^`]+)`/s) || content.match(/export const PAGE_STYLE = "([\s\S]+?)";\nexport const PAGE_BODY/s);
if (styleMatch) {
  let styleStr = styleMatch[1];
  styleStr = styleStr.replace(/\\n/g, '\n').replace(/\\"/g, '"');
  fs.writeFileSync('src/akmal-styles.css', styleStr);
}

const bodyMatch = content.match(/export const PAGE_BODY = "([\s\S]+?)";\nexport const PAGE_SCRIPT/s);
if (bodyMatch) {
  let bodyStr = bodyMatch[1];
  bodyStr = bodyStr.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
  fs.writeFileSync('src/akmal-raw.html', bodyStr);
}
