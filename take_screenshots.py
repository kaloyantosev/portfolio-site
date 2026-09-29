import os
import asyncio
from playwright.async_api import async_playwright

async def capture_screenshots():
    public_dir = r"C:\Users\Terve\.gemini\antigravity\scratch\prestige-portfolio\public"
    os.makedirs(public_dir, exist_ok=True)

    truecharts_out = os.path.join(public_dir, "truecharts_preview.png")
    cot_out = os.path.join(public_dir, "cot_visualiser_preview.png")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        
        # 1. Capture Truecharts
        page1 = await context.new_page()
        try:
            print("Navigating to Truecharts...")
            await page1.goto("https://truecharts-chi.vercel.app/", wait_until="networkidle", timeout=30000)
            await asyncio.sleep(2)
            await page1.screenshot(path=truecharts_out, full_page=False)
            print("Saved Truecharts screenshot to:", truecharts_out)
        except Exception as e:
            print("Error capturing Truecharts:", e)
            await page1.screenshot(path=truecharts_out, full_page=False)
        finally:
            await page1.close()

        # 2. Capture COT Visualizer
        page2 = await context.new_page()
        try:
            print("Navigating to COT Visualizer...")
            await page2.goto("https://cot-visualiser.vercel.app/", wait_until="networkidle", timeout=30000)
            await asyncio.sleep(2)
            await page2.screenshot(path=cot_out, full_page=False)
            print("Saved COT Visualizer screenshot to:", cot_out)
        except Exception as e:
            print("Error capturing COT Visualizer:", e)
            await page2.screenshot(path=cot_out, full_page=False)
        finally:
            await page2.close()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(capture_screenshots())
