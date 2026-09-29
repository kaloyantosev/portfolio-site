import sys
import numpy as np
from PIL import Image, ImageFilter

src_path = r"C:/Users/Terve/.gemini/antigravity/brain/05ab1666-d5b3-4ce6-8847-a0b9148e86d6/.user_uploaded/media_1787941181990.png"
dst_path = r"C:/Users/Terve/.gemini/antigravity/scratch/prestige-portfolio/public/kaloyan.png"

img = Image.open(src_path).convert("RGBA")
arr = np.array(img, dtype=np.float32)

# Analyze background color
# The background is solid vibrant blue: high B, moderate G, lower R
r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]

# Calculate blue dominance / difference:
# Background has B > 180, B - R > 80, B - G > 50
# Let's compute distance to the blue chroma
blue_dist = np.sqrt((r - 55)**2 + (g - 110)**2 + (b - 230)**2)

# Create soft alpha mask:
# If blue_dist < 60 -> fully background (alpha = 0)
# If blue_dist > 110 -> fully foreground (alpha = 255)
# In between -> smooth transition
alpha = np.clip((blue_dist - 55) / 50.0, 0.0, 1.0) * 255.0

# Despill blue fringes on edges
# If B > (R+G)/2, clamp B down to avoid blue fringe on edges
avg_rg = (r + g) / 2.0
blue_spill = np.maximum(0, b - avg_rg)
arr[:, :, 2] = arr[:, :, 2] - blue_spill * (1.0 - (alpha / 255.0)**2) * 0.8

arr[:, :, 3] = alpha

result = Image.fromarray(np.uint8(arr), mode="RGBA")

# Slight gaussian blur on alpha channel only for ultra-smooth edge antialiasing
r_ch, g_ch, b_ch, a_ch = result.split()
a_ch = a_ch.filter(ImageFilter.GaussianBlur(radius=0.7))
final_img = Image.merge("RGBA", (r_ch, g_ch, b_ch, a_ch))

final_img.save(dst_path, "PNG")
print("Saved cleanly to:", dst_path)
