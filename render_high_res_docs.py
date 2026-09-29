import fitz # PyMuPDF
import os

public_dir = r"C:/Users/Terve/.gemini/antigravity/scratch/prestige-portfolio/public"
pdf_src = r"C:/Users/Terve/.gemini/antigravity/brain/05ab1666-d5b3-4ce6-8847-a0b9148e86d6/.user_uploaded/media_1787943062930.pdf"

doc = fitz.open(pdf_src)
print(f"Total pages: {len(doc)}")

# Render Page 3 (Letter of Recommendation) at high DPI (2.5x zoom = ~200 DPI)
zoom = 2.5
mat = fitz.Matrix(zoom, zoom)

if len(doc) >= 3:
    page_rec = doc[2] # page 3
    pix_rec = page_rec.get_pixmap(matrix=mat, alpha=False)
    rec_png_path = os.path.join(public_dir, "letter_of_recommendation_doc.png")
    pix_rec.save(rec_png_path)
    print(f"Letter of Recommendation rendered to: {rec_png_path}")

# Render Pages 1 & 2 for CV
if len(doc) >= 1:
    pix_cv1 = doc[0].get_pixmap(matrix=mat, alpha=False)
    cv1_path = os.path.join(public_dir, "cv_page_1.png")
    pix_cv1.save(cv1_path)
    print(f"CV Page 1 rendered to: {cv1_path}")

if len(doc) >= 2:
    pix_cv2 = doc[1].get_pixmap(matrix=mat, alpha=False)
    cv2_path = os.path.join(public_dir, "cv_page_2.png")
    pix_cv2.save(cv2_path)
    print(f"CV Page 2 rendered to: {cv2_path}")

print("All high-res documents rendered successfully!")
