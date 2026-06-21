#!/usr/bin/env python3
"""
build_resume_pdf.py — render a markdown resume to a clean, ATS-friendly PDF.

- Single column, selectable text (ATS-parseable).
- Auto-fits to <= MAX_PAGES (default 2) by stepping through density presets.
- Strips everything from the first "keyword alignment" / "recommendations"
  heading onward (that block is for review, not the PDF). You can also place
  the marker <!-- PDF-END --> anywhere to cut earlier.

Usage:
    python scripts/build_resume_pdf.py <input.md> <output.pdf> [--max-pages N]

Markdown supported:
    # Name                -> name header
    (next contact line)   -> small contact line (auto-detected: has @ | • or digits)
    ## Section            -> section heading with rule
    ### Subhead           -> bold sub-heading (e.g. "Role — Company    Dates")
    - / * bullet          -> bullet (supports nested "  - ")
    **bold** inline       -> bold
    [text](url)           -> text (url dropped, except kept for the contact line)
    plain line            -> paragraph
    | tables | and > quotes and --- are ignored
"""
import re
import sys
import argparse

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem,
)
from reportlab.lib.styles import ParagraphStyle

ACCENT = HexColor("#1f3a5f")
GREY = HexColor("#444444")

CUT_HEADING = re.compile(r"(keyword alignment|recommendation|keyword match)", re.I)


def esc(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # links: [label](url) -> label
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", text)
    # bold
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    # strip stray single asterisks used for italics
    text = re.sub(r"(?<!\*)\*(?!\*)", "", text)
    return text


def parse_blocks(md: str):
    """Yield (kind, text) blocks. kind in {name, contact, h2, h3, bullet, para}."""
    lines = md.splitlines()
    blocks = []
    seen_name = False
    contact_done = False
    for raw in lines:
        line = raw.rstrip()
        s = line.strip()
        if not s:
            continue
        if "<!-- PDF-END -->" in s:
            break
        if s.startswith("#"):
            m = re.match(r"(#+)\s*(.*)", s)
            level, txt = len(m.group(1)), m.group(2).strip()
            if CUT_HEADING.search(txt):
                break
            if level == 1 and not seen_name:
                blocks.append(("name", txt))
                seen_name = True
                continue
            if level <= 2:
                blocks.append(("h2", txt))
            else:
                blocks.append(("h3", txt))
            continue
        # contact line: first normal line right after the name
        if seen_name and not contact_done and not s.startswith(("-", "*", ">", "|")):
            if ("@" in s) or ("•" in s) or ("|" in raw) or re.search(r"\d{3,}", s):
                blocks.append(("contact", s))
                contact_done = True
                continue
        if s.startswith(">") or s.startswith("|") or set(s) <= set("-="):
            continue  # quotes, tables, rules
        if s.startswith(("- ", "* ")):
            blocks.append(("bullet", s[2:].strip()))
            continue
        contact_done = True  # any prose closes the contact slot
        blocks.append(("para", s))
    return blocks


DENSITY = [
    # (name, h2, h3, body, leading, space_before_h2, bullet_gap, margin_mm)
    (19, 11.5, 10, 10, 13.5, 9, 2.5, 16),
    (18, 11, 9.5, 9.5, 12.6, 8, 2, 15),
    (17, 10.5, 9, 9, 11.8, 7, 1.6, 14),
    (16, 10, 8.5, 8.5, 11.0, 6, 1.3, 13),
    (15.5, 9.5, 8.2, 8.2, 10.4, 5, 1.0, 12),
]


def build(md_path, pdf_path, max_pages=2):
    with open(md_path, encoding="utf-8") as f:
        md = f.read()
    blocks = parse_blocks(md)

    last_err = None
    for preset in DENSITY:
        nz, h2z, h3z, bz, lead, sb, bg, marg = preset
        styles = {
            "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=nz,
                                   leading=nz + 2, textColor=ACCENT, spaceAfter=1),
            "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=bz - 0.5,
                                      leading=bz + 1, textColor=GREY, spaceAfter=4),
            "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=h2z,
                                 leading=h2z + 2, textColor=ACCENT, spaceBefore=sb,
                                 spaceAfter=2),
            "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=h3z,
                                 leading=h3z + 2, textColor=GREY, spaceBefore=3,
                                 spaceAfter=1),
            "body": ParagraphStyle("body", fontName="Helvetica", fontSize=bz,
                                   leading=lead, spaceAfter=2),
            "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=bz,
                                     leading=lead, spaceAfter=bg),
        }
        story = []
        bullet_buf = []

        def flush_bullets():
            if not bullet_buf:
                return
            items = [ListItem(Paragraph(esc(b), styles["bullet"]), leftIndent=10)
                     for b in bullet_buf]
            story.append(ListFlowable(items, bulletType="bullet", start="•",
                                      bulletColor=ACCENT, leftIndent=12,
                                      bulletFontSize=bz))
            bullet_buf.clear()

        for kind, txt in blocks:
            if kind == "bullet":
                bullet_buf.append(txt)
                continue
            flush_bullets()
            if kind == "name":
                story.append(Paragraph(esc(txt), styles["name"]))
            elif kind == "contact":
                story.append(Paragraph(esc(txt), styles["contact"]))
            elif kind == "h2":
                story.append(Paragraph(esc(txt), styles["h2"]))
                story.append(HRFlowable(width="100%", thickness=0.6, color=ACCENT,
                                        spaceBefore=1, spaceAfter=3))
            elif kind == "h3":
                story.append(Paragraph(esc(txt), styles["h3"]))
            else:
                story.append(Paragraph(esc(txt), styles["body"]))
        flush_bullets()

        doc = SimpleDocTemplate(
            pdf_path, pagesize=A4,
            leftMargin=marg * mm, rightMargin=marg * mm,
            topMargin=(marg - 2) * mm, bottomMargin=(marg - 2) * mm,
            title="Resume", author="Dhruv Nirmal",
        )
        try:
            doc.build(story)
        except Exception as e:  # noqa
            last_err = e
            continue
        if doc.page <= max_pages:
            print(f"OK: {pdf_path} ({doc.page} page(s), density font={bz})")
            return 0
    print(f"WARNING: could not fit into {max_pages} pages even at tightest density "
          f"(got {doc.page}). Trim resume content. Wrote {pdf_path}.")
    return 0 if last_err is None else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_md")
    ap.add_argument("output_pdf")
    ap.add_argument("--max-pages", type=int, default=2)
    args = ap.parse_args()
    sys.exit(build(args.input_md, args.output_pdf, args.max_pages))


if __name__ == "__main__":
    main()
