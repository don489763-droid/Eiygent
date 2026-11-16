import importlib.util

# Load super-data.py even though it has a dash
spec = importlib.util.spec_from_file_location("super_data", "super-data.py")
super_data_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(super_data_module)
super_data = super_data_module.super_data

word = input("What do you want to search in super-data? ").lower()

print(f"\nSearching for: {word}")
print("=" * 60)

found_total = 0

for page in super_data:
    url = page.get("url", "")
    title = page.get("title", "")

    page_text = str(page).lower()

    if word in page_text:
        found_total += 1
        print(f"\n--- FOUND IN PAGE {found_total} ---")
        print(f"URL: {url}")
        print(f"Title: {title}")

        for h in page.get("headlines", []):
            if word in h.lower():
                print(f"  HEADLINE: {h}")

        for p in page.get("paragraphs", []):
            if word in p.lower():
                print(f"  PARA: {p[:200]}...")
                break

if found_total == 0:
    print("\nNothing found in super-data.py")

print(f"\nDone! Found in {found_total} pages.")
