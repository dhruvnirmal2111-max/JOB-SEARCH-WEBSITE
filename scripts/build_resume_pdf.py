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
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem,
)
from reportlab.lib.styles import ParagraphStyle

ACCENT = HexColor("#1f3a5f")
GREY = HexColor("#444444")
BAND = HexColor("#e8eef5")  # light tint behind section headers

CUT_HEADING = re.compile(r"(keyword alignment|recommendation|keyword match)", re.I)


def no_em_dash(text: str) -> str:
    """House style: no em dashes. Render them as a spaced hyphen, and keep
    en dashes only inside numeric/date ranges (e.g. 2022–2023)."""
    text = text.replace(" — ", " - ").replace("—", " - ")
    # en dash used as a separator (with spaces) -> hyphen; ranges like 4–5 keep theirs
    text = re.sub(r"\s–\s", " - ", text)
    # collapse any accidental double spaces introduced above
    text = re.sub(r" {2,}", " ", text)
    return text


def esc(text: str) -> str:
    text = no_em_dash(text)
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # links: [label](url) -> clickable hyperlink (accent-coloured, underlined)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)",
                  r'<link href="\2" color="#1f3a5f"><u>\1</u></link>', text)
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
    # Tuned to breathe: leading ~1.4x body, generous bullet gaps + margins.
    # Auto-fit steps down only as far as the content forces it.
    (20, 12.5, 10.5, 10.5, 15.5, 13, 4.5, 18),
    (19, 12, 10, 10, 14.6, 12, 4.0, 17),
    (18, 11.5, 9.5, 9.5, 13.8, 11, 3.5, 16),
    (17, 11, 9.2, 9.2, 13.0, 10, 3.0, 15),
    (16, 10.5, 9, 9, 12.4, 9, 2.6, 14),
    (15, 10, 8.6, 8.6, 11.6, 8, 2.2, 13),
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
                                 leading=h2z + 3, textColor=ACCENT, spaceBefore=sb,
                                 spaceAfter=4, backColor=BAND, borderColor=BAND,
                                 borderPadding=(4, 6, 4, 6), borderRadius=2),
            "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=h3z,
                                 leading=h3z + 3, textColor=ACCENT, spaceBefore=5,
                                 spaceAfter=1),
            "body": ParagraphStyle("body", fontName="Helvetica", fontSize=bz,
                                   leading=lead, spaceAfter=2, alignment=TA_JUSTIFY),
            "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=bz,
                                     leading=lead, spaceAfter=bg, alignment=TA_JUSTIFY),
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
                # highlighted section band, uppercase for clear hierarchy
                story.append(Paragraph(esc(txt.upper()), styles["h2"]))
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
