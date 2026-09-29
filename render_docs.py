import os
from PIL import Image
import pypdf

# Let's check if pypdf or pdf2image or fitz is available
try:
    import fitz # PyMuPDF
    print("fitz is available")
except ImportError:
    pass

# We already have the page 3 screenshot in .user_uploaded/media_1787943837848.png
# and the CV page 1, page 2 screenshots in media_...
# Let's verify what image files exist and create crisp document renders in public/
print("Checking document renders...")
