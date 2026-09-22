# AI-Generated Assets

Every AI-generated image and logo used in this project is logged here with its filename, the tool used, and the prompt.

## jt-logo.png

- **Path:** `src/assets/jt-logo.png`
- **Tool:** Google Gemini (free tier)
- **Used in:** Header (personal logo)
- **Starting prompt:**

```
Design a bold, original brand emblem for a software developer, centered on the monogram "JT".
Style: a strong insignia that fuses ancient high-fantasy heraldry with sleek sci-fi technology.
Shape: a symmetrical badge or crest, confident and angular, not delicate or ornate.
Center: the letters "J" and "T" interlocked into one strong monogram, rendered clearly and correctly spelled.
Fantasy elements: carved-stone and forged-metal feel, living tree branches or roots wrapping the edge of the crest.
Sci-fi elements: glowing circuit-trace lines running through the branches, a thin orbital ring or star point, precise engineered geometry.
Colors: deep forest green, antique gold, and brushed silver, with electric purple (#a855f7) and ember orange (#ff6a1f) as glowing accents.
Mood: powerful, nerdy, memorable, gender-neutral.
Output: flat vector-style logo, centered, square 1:1, plain dark background, no other text, no watermark, readable when scaled down to a small icon.
Do not imitate or reference any existing franchise logos, insignia, symbols, or scripts.
```

- **Refinement:** Refined over many conversational iterations in Gemini toward a more sci-fi look with iridescent orange, purple, and gold tones.
- **Post-processing:** Dark background removed to transparency and cropped to the emblem (Python/Pillow). No changes to the design or colors.

## src/assets/home-skills.png
- Tool: Google Gemini (free tier)
- Used in: Home page, Technical Skills section banner
- Starting prompt: Create a wide 16:9 website banner of glowing circuit traces intertwined with simple gold leaves, as if technology and nature are growing together. Colors: deep forest green background, antique gold leaves, electric purple (#a855f7) and ember orange (#ff6a1f) glowing circuitry. Sleek, modern, sci-fi, minimal clutter, no text, no watermark. Do not imitate any existing franchise logos, symbols, or designs.
- Refinement: None; first result used.
- Post-processing: Converted from JPEG to PNG and renamed by Claude (Pillow); content and colors untouched.

## src/assets/home-soft-skills.png
- Tool: Google Gemini (free tier)
- Used in: Home page, Soft Skills section banner
- Starting prompt: Create a wide 16:9 website banner showing soft glowing lines of light connecting simple gold leaves, suggesting connection, communication, and growth. Colors: deep forest green background, antique gold, electric purple (#a855f7) and ember orange (#ff6a1f) glow. Calm, modern, sci-fi, minimal clutter, no text, no watermark. Do not imitate any existing franchise logos, symbols, or designs.
- Refinement: None; first result used.
- Post-processing: Converted from JPEG to PNG and renamed by Claude (Pillow); content and colors untouched.

## src/assets/portfolio-experience.png
- Tool: Google Gemini (free tier)
- Used in: Portfolio page, Work Experience section banner
- Starting prompt: Create a very simple, minimal wide 16:9 website banner: a single antique gold leaf on the right side, with one thin glowing electric purple (#a855f7) line flowing from it across the image. Deep forest green background with lots of empty space. Flat, clean, modern, only two or three elements, no clutter, no text, no watermark. Do not imitate any existing franchise logos, symbols, or designs.
- Refinement: None; first result used.
- Post-processing: Converted from JPEG to PNG and renamed by Claude (Pillow); content and colors untouched.

## src/assets/portfolio-projects.png
- Tool: Google Gemini (free tier)
- Used in: Portfolio page, Projects section banner
- Starting prompt: Create a very simple, minimal wide 16:9 website banner: one small glowing ember orange (#ff6a1f) geometric outline shape, like a rounded hexagon, with a single antique gold leaf resting on it, placed off-center. Deep forest green background with lots of empty space. Flat, clean, modern, only two or three elements, no clutter, no text, no watermark. Do not imitate any existing franchise logos, symbols, or designs.
- Refinement: First result rejected. Restarted in a new chat with portfolio-experience.png as the reference image: "Create a new image in this same style and layout, but make the glowing line ember orange (#ff6a1f) instead of purple, and flip the composition so the leaves sit on the opposite side."
- Post-processing: Converted from JPEG to PNG and renamed by Claude (Pillow); content and colors untouched.