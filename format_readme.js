const fs = require('fs');

const path = 'README.md';
let lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);

let out = [];
let in_bash = false;
let bash_lines = [];

function process_bash_block(bash_lines) {
    const block_text = bash_lines.join('\n');
    if (block_text.includes('pipeline {') || block_text.includes('services:')) {
        return ["```bash"].concat(bash_lines).concat(["```"]);
    }
    
    let new_lines = [];
    let current_comment = [];
    
    for (let line of bash_lines) {
        let sline = line.trim();
        if (!sline) continue;
        
        if (sline.startsWith('#') && !sline.includes('!/bin/bash')) {
            current_comment.push(line);
        } else {
            let cmd = line;
            let inline_comm = "";
            let match = line.match(/^(.*?)\s+#\s+(.*)$/);
            // Don't split #!/bin/bash as it usually has a comment but it might be treated weirdly
            if (line.includes('#!/bin/bash')) {
                cmd = line.substring(0, line.indexOf('#', 1)).trimEnd();
                inline_comm = "# " + line.substring(line.indexOf('#', 1) + 1).trim();
                if (!inline_comm.includes('Shebang')) { 
                    inline_comm = "# " + "Shebang for bash scripts";
                }
            } else if (match) {
                cmd = match[1].trimEnd();
                inline_comm = "# " + match[2];
            }
            
            new_lines.push("```bash");
            if (current_comment.length > 0) {
                new_lines.push(...current_comment);
                current_comment = [];
            }
            if (inline_comm) {
                new_lines.push(inline_comm);
            }
            
            new_lines.push(cmd);
            new_lines.push("```");
            new_lines.push("");
        }
    }

    if (current_comment.length > 0) {
        new_lines.push("```bash");
        new_lines.push(...current_comment);
        new_lines.push("```");
        new_lines.push("");
    }

    return new_lines;
}

for (let line of lines) {
    if (line.trim() === '```bash') {
        in_bash = true;
        bash_lines = [];
    } else if (line.trim() === '```' && in_bash) {
        in_bash = false;
        out.push(...process_bash_block(bash_lines));
    } else if (in_bash) {
        bash_lines.push(line);
    } else {
        out.push(line);
    }
}

let cleaned_out = [];
let prev_blank = false;
for (let line of out) {
    let is_blank = (line.trim() === '');
    if (is_blank && prev_blank) continue;
    cleaned_out.push(line);
    prev_blank = is_blank;
}

fs.writeFileSync(path, cleaned_out.join('\n'), 'utf8');
