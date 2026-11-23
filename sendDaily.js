// sendDaily.js - Searches data.json, picks random paragraph, sends to all subscribers
import fs from "fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "YOUR_RESEND_API_KEY");

// --- 1. SEARCH data.json FOR ALL PARAGRAPHS ---
function findParagraphs(data, found = []) {
  if (typeof data === "string") {
    // Only take real paragraphs, not short labels / ids
    if (data.trim().length > 30) found.push(data.trim());
  } else if (Array.isArray(data)) {
    for (const item of data) findParagraphs(item, found);
  } else if (typeof data === "object" && data !== null) {
    // Look for common paragraph keys first
    for (const key of ["text", "paragraph", "content", "body", "message"]) {
      if (typeof data[key] === "string" && data[key].trim().length > 30) {
        found.push(data[key].trim());
      }
    }
    // Also search inside all other values
    for (const value of Object.values(data)) {
      if (typeof value !== "string") findParagraphs(value, found);
    }
  }
  return found;
}

const rawData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const paragraphs = [...new Set(findParagraphs(rawData))]; // remove duplicates

if (paragraphs.length === 0) {
  console.log("No paragraphs found in data.json");
  process.exit(1);
}

// --- 2. PICK ANY RANDOM PARAGRAPH ---
// Avoid sending same paragraph as yesterday
let lastSent = "";
try { lastSent = fs.readFileSync("./lastSent.txt", "utf-8"); } catch {}

let randomParagraph;
do {
  randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
} while (paragraphs.length > 1 && randomParagraph === lastSent);

fs.writeFileSync("./lastSent.txt", randomParagraph);
console.log("Today's paragraph:", randomParagraph);

// --- 3. LOAD SUBSCRIBERS ---
const subscribers = JSON.parse(fs.readFileSync("./subscribers.json", "utf-8"));

// --- 4. SEND TO EVERYONE ---
for (const user of subscribers) {
  const email = typeof user === "string" ? user : user.email;
  if (!email) continue;

  await resend.emails.send({
    from: "Daily Newsletter <newsletter@yourdomain.com>",
    to: email,
    subject: "Your Daily Paragraph",
    html: `<p>${randomParagraph}</p>`
  });
  console.log(`Sent to ${email}`);
}

console.log(`Done! Sent to ${subscribers.length} subscribers.`);
