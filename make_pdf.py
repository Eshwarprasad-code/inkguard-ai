import os
import subprocess
from markdown_it import MarkdownIt

# Initialize Markdown parser with table support and without linkify dependency
md = MarkdownIt().enable("table")

md_path = r"C:\Users\gudim\.gemini\antigravity-ide\scratch\inkguard-brand-governance\SUBMISSION_ROUND_1_THE_PLAN.md"
html_path = r"C:\Users\gudim\.gemini\antigravity-ide\scratch\inkguard-brand-governance\submission.html"
pdf_path = r"C:\Users\gudim\.gemini\antigravity-ide\scratch\inkguard-brand-governance\InkGuard_AI_Round_1_Submission_STRAW_HAT_CODER.pdf"

with open(md_path, "r", encoding="utf-8") as f:
    text = f.read()

rendered_content = md.render(text)

# Premium executive document CSS styling
html_document = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>InkGuard AI — Round 1 Submission (STRAW_HAT_CODER)</title>
<style>
  @page {{
    size: A4;
    margin: 15mm 15mm 15mm 15mm;
    @bottom-right {{
      content: counter(page);
    }}
  }}

  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.50;
    font-size: 10pt;
  }}

  h1 {{
    font-size: 20pt;
    font-weight: 800;
    color: #0f172a;
    border-bottom: 2.5px solid #2563eb;
    padding-bottom: 6px;
    margin-top: 0;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }}

  h2 {{
    font-size: 13pt;
    font-weight: 700;
    color: #1e3a8a;
    background: #eff6ff;
    border-left: 4px solid #2563eb;
    padding: 5px 10px;
    margin-top: 18px;
    margin-bottom: 10px;
    page-break-after: avoid;
    break-after: avoid;
    border-radius: 0 4px 4px 0;
  }}

  h3 {{
    font-size: 11.5pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 16px;
    margin-bottom: 6px;
    page-break-after: avoid;
    break-after: avoid;
  }}

  h4 {{
    font-size: 10.5pt;
    font-weight: 600;
    color: #334155;
    margin-top: 12px;
    margin-bottom: 4px;
    page-break-after: avoid;
    break-after: avoid;
  }}

  p {{
    margin-top: 0;
    margin-bottom: 8px;
  }}

  hr {{
    border: none;
    border-top: 1.5px solid #e2e8f0;
    margin: 16px 0;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 9.2pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }}

  th {{
    background-color: #1e293b;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 8px 10px;
    border: 1px solid #0f172a;
  }}

  td {{
    padding: 7px 10px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }}

  tr:nth-child(even) {{
    background-color: #f8fafc;
  }}

  pre {{
    background: #0f172a;
    color: #f8fafc;
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 8.5pt;
    font-family: "Consolas", "Courier New", monospace;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 10px 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }}

  code {{
    font-family: "Consolas", "Courier New", monospace;
    background: #f1f5f9;
    color: #0f172a;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 9pt;
  }}

  pre code {{
    background: transparent;
    color: inherit;
    padding: 0;
  }}

  blockquote {{
    border-left: 4px solid #3b82f6;
    background: #f0fdf4;
    border-color: #22c55e;
    color: #14532d;
    margin: 12px 0;
    padding: 8px 14px;
    border-radius: 0 4px 4px 0;
    font-size: 9.8pt;
  }}

  ul, ol {{
    margin-top: 4px;
    margin-bottom: 10px;
    padding-left: 20px;
  }}

  li {{
    margin-bottom: 4px;
  }}

  strong {{
    color: #0f172a;
    font-weight: 600;
  }}

  .badge {{
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 8pt;
    font-weight: 600;
    text-transform: uppercase;
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

print(f"Wrote styled HTML to {html_path}")

# Run headless Edge to print-to-pdf
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

print("Running command:", " ".join(cmd))
res = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", res.returncode)
if os.path.exists(pdf_path):
    print(f"Successfully generated PDF: {pdf_path} (size: {os.path.getsize(pdf_path)} bytes)")
else:
    print("Error generating PDF. Stdout:", res.stdout, "Stderr:", res.stderr)
