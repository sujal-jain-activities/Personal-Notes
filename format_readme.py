import re

with open('README.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

out = []
in_bash = False
bash_lines = []

def process_bash_block(bash_lines):
    block_text = "".join(bash_lines)
    # Skip blocks that look like scripts or Docker Compose files
    if "pipeline {" in block_text or "#!/bin/bash" in block_text or "services:" in block_text:
        return ["```bash\n"] + bash_lines + ["```\n"]
    
    new_lines = []
    current_comment = []
    
    for line in bash_lines:
        sline = line.strip()
        if not sline:
            continue
        
        if sline.startswith('#'):
            current_comment.append(line)
        else:
            m = re.search(r'^(.*?)\s+#\s+(.*)$', line)
            cmd = line
            inline_comm = ""
            if m:
                cmd = m.group(1).rstrip() + "\n"
                inline_comm = "# " + m.group(2) + "\n"
            
            new_lines.append("```bash\n")
            if current_comment:
                new_lines.extend(current_comment)
                current_comment = []
            if inline_comm:
                new_lines.append(inline_comm)
            
            new_lines.append(cmd)
            new_lines.append("```\n")
            new_lines.append("\n")

    # If trailing comments
    if current_comment:
        new_lines.append("```bash\n")
        new_lines.extend(current_comment)
        new_lines.append("```\n")
        new_lines.append("\n")

    return new_lines

for line in lines:
    if line.strip() == '```bash':
        in_bash = True
        bash_lines = []
    elif line.strip() == '```' and in_bash:
        in_bash = False
        out.extend(process_bash_block(bash_lines))
    elif in_bash:
        bash_lines.append(line)
    else:
        out.append(line)

# clean up consecutive blank lines but keep it mostly identical
cleaned_out = []
prev_blank = False
for line in out:
    is_blank = (line.strip() == '')
    if is_blank and prev_blank:
        continue
    cleaned_out.append(line)
    prev_blank = is_blank

with open('README.md', 'w', encoding='utf-8') as f:
    f.writelines(cleaned_out)
