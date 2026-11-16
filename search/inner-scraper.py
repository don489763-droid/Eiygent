from data import url as base_url, links
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import time

print(f"Found {len(links)} links in data.py")
print(f"Base site: {base_url}")
print()

how_many = input(f"How many links to scrape? (1-{len(links)} or 'all'): ")

if how_many.lower() == "all":
    links_to_scrape = links
else:
    try:
        how_many = int(how_many)
        links_to_scrape = links[:how_many]
    except:
        links_to_scrape = links[:5]

all_scraped = []

for i, link in enumerate(links_to_scrape, 1):
    full_url = urljoin(base_url, link['url'])
    
    print(f"[{i}/{len(links_to_scrape)}] Scraping: {full_url}")

    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        r = requests.get(full_url, headers=headers, timeout=10)
        soup = BeautifulSoup(r.text, "html.parser")

        title = soup.title.get_text(strip=True) if soup.title else ""

        headlines = []
        for tag in soup.find_all(["h1", "h2", "h3"]):
            t = tag.get_text(strip=True)
            if t and t not in headlines:
                headlines.append(t)

        paragraphs = []
        for p in soup.find_all("p"):
            t = p.get_text(strip=True)
            if t:
                paragraphs.append(t)

        all_scraped.append({
            "from_link_text": link['text'],
            "url": full_url,
            "title": title,
            "headlines": headlines[:10],
            "paragraphs": paragraphs[:10]
        })

        print(f"  -> Got {len(headlines)} headlines, {len(paragraphs)} paragraphs")

    except Exception as e:
        print(f"  -> Failed: {e}")
        all_scraped.append({
            "url": full_url,
            "error": str(e)
        })

    time.sleep(1)

# Save to super-data.py
with open("super-data.py", "w", encoding="utf-8") as f:
    f.write(f"super_data = {json.dumps(all_scraped, indent=4, ensure_ascii=False)}\n")

print()
print(f"Done! Saved {len(all_scraped)} pages to super-data.py")
