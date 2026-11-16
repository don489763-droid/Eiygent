import importlib.util
import json

def load_py_file(path):
    """Load a .py file even if it has a dash in the name"""
    spec = importlib.util.spec_from_file_location("mod", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    # find the first list inside the file
    for value in vars(mod).values():
        if isinstance(value, list):
            return value
    return []

# 1. Load both python files
print("Loading data.py...")
data_list = load_py_file("search/data.py")
print(f"  Found {len(data_list)} items in data.py")

print("Loading super-data.py...")
super_list = load_py_file("search/super-data.py")
print(f"  Found {len(super_list)} items in super-data.py")

# 2. Tag them so you know where they came from
for item in data_list:
    if isinstance(item, dict):
        item["_source"] = "data.py"

for item in super_list:
    if isinstance(item, dict):
        item["_source"] = "super-data.py"

# 3. Combine into one list
combined = data_list + super_list

# 4. Paste it all into data.json
with open("data.json", "w") as f:
    json.dump(combined, f, indent=2)

print(f"\nDone! Copied {len(combined)} total items into data.json")
print(f"  {len(data_list)} from data.py + {len(super_list)} from super-data.py")
