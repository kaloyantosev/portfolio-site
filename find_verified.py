import os
import re

src_dir = r"C:\Users\Terve\.gemini\antigravity\scratch\prestige-portfolio\src"

patterns = [
    (re.compile(r'VERIFIED\s+[A-Z\s]+', re.IGNORECASE), ''),
    (re.compile(r'Verified\s+[A-Za-z\s]+', re.IGNORECASE), ''),
]

found = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.js', '.jsx', '.css', '.html')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'verified' in content.lower():
                found.append(path)
                print("Found verified in:", path)

print("Files containing verified:", found)
