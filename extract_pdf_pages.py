import pypdf
import os

pdf_src = r"C:/Users/Terve/.gemini/antigravity/brain/05ab1666-d5b3-4ce6-8847-a0b9148e86d6/.user_uploaded/media_1787943062930.pdf"
public_dir = r"C:/Users/Terve/.gemini/antigravity/scratch/prestige-portfolio/public"
os.makedirs(public_dir, exist_ok=True)

reader = pypdf.PdfReader(pdf_src)
print(f"Total pages in source PDF: {len(reader.pages)}")

# 1. Extract Page 3 only for Letter of Recommendation
writer_rec = pypdf.PdfWriter()
if len(reader.pages) >= 3:
    writer_rec.add_page(reader.pages[2]) # page 3 (0-indexed 2)
    rec_out = os.path.join(public_dir, "letter_of_recommendation.pdf")
    with open(rec_out, "wb") as f:
        writer_rec.write(f)
    print(f"Page 3 saved to: {rec_out}")

# 2. Extract Pages 1 & 2 for CV
writer_cv = pypdf.PdfWriter()
for i in range(min(2, len(reader.pages))):
    writer_cv.add_page(reader.pages[i])
cv_out = os.path.join(public_dir, "cv.pdf")
with open(cv_out, "wb") as f:
    writer_cv.write(f)
print(f"Pages 1-2 saved to: {cv_out}")
