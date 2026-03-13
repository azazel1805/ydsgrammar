import os

file_path = r'c:\Users\User\Desktop\Adai\yds\ydsgrammar\public\miniexams.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove backslashes before ${ and `
# We use regex to avoid removing legitimate backslashes (though unlikely in this file)
import re
new_content = re.sub(r'\\(\$|`)', r'\1', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Cleaned up miniexams.js")
