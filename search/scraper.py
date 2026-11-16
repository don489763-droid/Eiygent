import requests
from bs4 import BeautifulSoup
import json

url = input("Enter website: ")
if not url.startswith("http"):
    url = "https://" + url

headers = {"User-Agent": "Mozilla/5.0"}

r = requests.get(url, headers=headers, timeout=15)
soup = BeautifulSoup(r.text, "html.parser")

title = soup.title.get_text(strip=True) if soup.title else ""

headlines = []
for tag in soup.find_all(["h1", "h2", "h3", "h4"]):
    text = tag.get_text(strip=True)
    if text and text not in headlines:
        headlines.append(text)

paragraphs = []
for p in soup.find_all("p"):
    text = p.get_text(strip=True)
    if text:
        paragraphs.append(text)

links = []
for a in soup.find_all("a", href=True):
    links.append({"text": a.get_text(strip=True), "url": a["href"]})

images = []
for img in soup.find_all("img", src=True):
    images.append(img["src"])

# ONLY SAVE - no other file, no print of data
with open("data.py", "w", encoding="utf-8") as f:
    f.write(f"url = {json.dumps(url)}\n")
    f.write(f"title = {json.dumps(title)}\n")
    f.write(f"headlines = {json.dumps(headlines, indent=4, ensure_ascii=False)}\n\n")
    f.write(f"paragraphs = {json.dumps(paragraphs, indent=4, ensure_ascii=False)}\n\n")
    f.write(f"links = {json.dumps(links, indent=4, ensure_ascii=False)}\n\n")
    f.write(f"images = {json.dumps(images, indent=4, ensure_ascii=False)}\n")

