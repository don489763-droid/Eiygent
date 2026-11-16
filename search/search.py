from data import headlines, paragraphs, links, images

# Ask what to search for
word = input("What do you want to search for? ").lower()

print(f"\nSearching for: {word}")
print("=" * 50)

# Search headlines
found = 0
print(f"\n--- HEADLINES ---")
for h in headlines:
    if word in h.lower():
        print(f"- {h}")
        found += 1
if found == 0:
    print("No headlines found")

# Search paragraphs
found = 0
print(f"\n--- PARAGRAPHS ---")
for p in paragraphs:
    if word in p.lower():
        print(f"- {p[:200]}...")
        found += 1
        if found >= 5:  # show only first 5
            break
if found == 0:
    print("No paragraphs found")

# Search links
found = 0
print(f"\n--- LINKS ---")
for link in links:
    if word in link['text'].lower() or word in link['url'].lower():
        print(f"- {link['text']} -> {link['url']}")
        found += 1
if found == 0:
    print("No links found")

# Search images
found = 0
print(f"\n--- IMAGES ---")
for img in images:
    if word in img.lower():
        print(f"- {img}")
        found += 1
if found == 0:
    print("No images found")

print("\nDone searching!")
