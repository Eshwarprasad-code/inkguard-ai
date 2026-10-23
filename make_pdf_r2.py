import os
import subprocess
from markdown_it import MarkdownIt

# Initialize Markdown parser with table support and without linkify dependency
md = MarkdownIt().enable("table")

md_path = r"C:\Users\gudim\.gemini\antigravity-ide\scratch\inkguard-brand-governance\SUBMISSION_ROUND_2_THE_BUILD.md"
html_path = r"C:\Users\gudim\.gemini\antigravity-ide\scratch\inkguard-brand-governance\submission_r2.html"
pdf_path = r"C:\Users\gudim\.gemini\antigravity-ide\scratch\inkguard-brand-governance\InkGuard_AI_Round_2_Submission_STRAW_HAT_CODER.pdf"

with open(md_path, "r", encoding="utf-8") as f:
    text = f.read()

rendered_content = md.render(text)

# Executive styling tailored for Round 2 submission PDF
html_document = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>InkGuard AI — Round 2 Submission: The Build (STRAW_HAT_CODER)</title>
<style>
  @page {{
    size: A4;
    margin: 14mm 14mm 14mm 14mm;
    @bottom-right {{
      content: counter(page);
    }}
  }}

  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.46;
    font-size: 9.5pt;
  }}

  h1 {{
    font-size: 19pt;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2.5px solid #2563eb;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }}

  h2 {{
    font-size: 12.5pt;
    font-weight: 700;
    color: #1e3a8a;
    background: #eff6ff;
    border-left: 4px solid #2563eb;
    padding: 4px 8px;
    margin-top: 15px;
    margin-bottom: 8px;
    page-break-after: avoid;
    break-after: avoid;
    border-radius: 0 4px 4px 0;
  }}

  h3 {{
    font-size: 11pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 12px;
    margin-bottom: 5px;
    page-break-after: avoid;
    break-after: avoid;
  }}

  p {{
    margin-top: 0;
    margin-bottom: 6px;
  }}

  hr {{
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 12px 0;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 12px 0;
    font-size: 8.8pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }}

  th {{
    background-color: #1e293b;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 6px 8px;
    border: 1px solid #0f172a;
  }}

  td {{
    padding: 6px 8px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }}

  tr:nth-child(even) {{
    background-color: #f8fafc;
  }}

  pre {{
    background: #0f172a;
    color: #f8fafc;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 8.2pt;
    font-family: "Consolas", "Courier New", monospace;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 8px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }}

  code {{
    font-family: "Consolas", "Courier New", monospace;
    background: #f1f5f9;
    color: #0f172a;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 8.8pt;
  }}

  pre code {{
    background: transparent;
    color: inherit;
    padding: 0;
  }}

  ul, ol {{
    margin-top: 4px;
    margin-bottom: 8px;
    padding-left: 18px;
  }}

  li {{
    margin-bottom: 3px;
  }}

  strong {{
    color: #0f172a;
    font-weight: 600;
  }}

  a {{
    color: #2563eb;
    text-decoration: none;
  }}
</style>
</head>
<body>
{rendered_content}
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_document)

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

cmd = [
    edge_exe,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
if os.path.exists(pdf_path):
    print(f"Successfully generated Round 2 PDF: {pdf_path} (size: {os.path.getsize(pdf_path)} bytes)")
else:
    print("Error:", res.stderr)
