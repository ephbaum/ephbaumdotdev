# Placeholder Image Mapping Document

This document maps all placeholder.com images found in the blog content that need to be replaced with their original Ghost CMS images.

## Summary
- **Total placeholder images found**: 13
- **Files affected**: 7 blog posts
- **Date range**: 2014-2021

## Detailed Mapping

### 1. `/src/content/blog/2021/04/2021-04-25-on-falling-in-love-with-your-town.md` ✅ **COMPLETED**
- **Line 56**: `![Greetings from the State of Washington](../../../../assets/img/2021/04/9ee3542843bf4cf78837d720f48fddc9.jpg)`
  - **Original**: `__GHOST_URL__/content/images/2021/04/9ee3542843bf4cf78837d720f48fddc9.jpg`
- **Line 72**: `![Mt. Ranier from 6th & Veneta](../../../../assets/img/2021/04/89523510d98a43ee9d685c459225ffe6.jpg)`
  - **Original**: `__GHOST_URL__/content/images/2021/04/89523510d98a43ee9d685c459225ffe6.jpg`
- **Line 76**: `![The Cascades from near PSNS](../../../../assets/img/2021/04/0e2f9dbf2f5c44caa13c5892ae601dcd.jpg)`
  - **Original**: `__GHOST_URL__/content/images/2021/04/0e2f9dbf2f5c44caa13c5892ae601dcd.jpg`
- **Line 99**: `![Lovely Items for Sale in Port Orchard](../../../../assets/img/2021/04/f8ab3fcfdd044c7890960cbf384c2d56.jpg)`
  - **Original**: `__GHOST_URL__/content/images/2021/04/f8ab3fcfdd044c7890960cbf384c2d56.jpg`
- **Line 119**: `![Kitty on a Bench in a Garden](../../../../assets/img/2021/04/07fdbebd2c61417bb28c99415e6c43b0.jpg)`
  - **Original**: `__GHOST_URL__/content/images/2021/04/07fdbebd2c61417bb28c99415e6c43b0.jpg`

### 2. `/src/content/blog/2014/06/2014-06-03-my-friend-alfred.md` ✅ **COMPLETED**
- **Line 18**: `![](../../../../assets/img/2021/02/image.png)` (Alfred Logo)
  - **Original**: `__GHOST_URL__/content/images/2021/02/image.png`
- **Line 82**: `![](../../../../assets/img/2021/02/image-1.png)` (Alfred Preferences Showing Monokai Glass Theme)
  - **Original**: `__GHOST_URL__/content/images/2021/02/image-1.png`
- **Line 88**: `![](../../../../assets/img/2021/02/image-2.png)` (Alfred with Monokai Glass Theme and Blur Hack)
  - **Original**: `__GHOST_URL__/content/images/2021/02/image-2.png`

### 3. `/src/content/blog/2021/02/2021-02-25-recognizing-the-pnw-journey.md` ✅ **COMPLETED**
- **Line 32**: `![Manda and I in front of the Great Wheel at Pier 57](../../../../assets/img/2021/02/FA362562-04AB-4715-A2C7-7CF55A5EFBD3.jpeg)`
  - **Original**: `__GHOST_URL__/content/images/2021/02/FA362562-04AB-4715-A2C7-7CF55A5EFBD3.jpeg`

### 4. `/src/content/blog/2021/02/2021-02-07-on-being-a-capable-impostor.md` ✅ **COMPLETED**
- **Line 18**: `![A TRS-80 sits with monitor and tape deck drive sits on a small kitchen table next to manuals and cassettes. In the background is a space heater and curtains](../../../../assets/img/2021/02/image-3.png)`
  - **Original**: `__GHOST_URL__/content/images/2021/02/image-3.png`

### 5. `/src/content/blog/2021/02/2021-02-11-test-tangential-development-ttd.md` ✅ **COMPLETED**
- **Line 31**: `![In a room filled with flames and smoke an oblivious little dog in a hat sits at a table next to a coffee cup. The caption reads "This Is Fine". Grabbed from memgenerator.net](../../../../assets/img/2021/02/image-4.png)`
  - **Original**: `__GHOST_URL__/content/images/2021/02/image-4.png`

### 6. `/src/content/blog/2021/11/2021-11-20-engineering-control.md` ✅ **COMPLETED**
- **Line 35**: `![A 2x2 or "Four Box" - left label says important, bottom label says urgent - each box read, from right to left first the top row and then the bottom: Defer, Do, Don't Do, Delegate](../../../../assets/img/2021/11/5239e826afa84e8b83458a0ec723efde.jpg)`
  - **Original**: `__GHOST_URL__/content/images/2021/11/5239e826afa84e8b83458a0ec723efde.jpg`

### 7. `/src/content/blog/2021/03/2021-03-12-unnecessary-zoom-fatigue.md` ✅ **COMPLETED**
- **Line 29**: `![spongebob magic](../../../../assets/img/2021/03/spongebob-magic.gif)`
  - **Original**: `__GHOST_URL__/content/images/2021/03/spongebob-magic.gif`

## Next Steps

1. **Extract Git History**: For each file and line number above, we need to:
   - Check git history to find the original image URLs from Ghost CMS
   - Identify when the placeholders were introduced
   - Extract the original image references

2. **Image Analysis**: For each placeholder, determine:
   - Original Ghost CMS image URL
   - Image content/description from alt text
   - Appropriate replacement image source

3. **Replacement Strategy**: 
   - Download original images if still accessible
   - Find suitable replacements for broken links
   - Update all markdown files with correct image URLs

## Git Commands to Run

For each file, we'll need to run commands like:
```bash
git log -p --follow -- src/content/blog/[FILE_PATH] | grep -A5 -B5 "placeholder.com"
```

This will help us trace when the placeholders were introduced and what the original URLs were.

## Git History Analysis Results

### ✅ **ALL FILES COMPLETED** (7/7 files completed)

**All blog posts have been successfully processed:**

1. **`2021-04-25-on-falling-in-love-with-your-town.md`** - 5 images ✅
2. **`2014-06-03-my-friend-alfred.md`** - 3 images ✅  
3. **`2021-02-25-recognizing-the-pnw-journey.md`** - 1 image ✅
4. **`2021-02-07-on-being-a-capable-impostor.md`** - 1 image ✅
5. **`2021-02-11-test-tangential-development-ttd.md`** - 1 image ✅
6. **`2021-11-20-engineering-control.md`** - 1 image ✅
7. **`2021-03-12-unnecessary-zoom-fatigue.md`** - 1 image ✅

**Total**: 13 placeholder images successfully replaced with correct local asset paths

**Key Findings**:
- All original Ghost CMS images were successfully migrated to `/src/assets/img/` 
- Image filenames match exactly with the original Ghost CMS hashes
- All placeholders have been replaced with proper relative paths (`../../../../assets/img/...`)
- No placeholder.com URLs remain in any blog posts

## Notes

- All placeholders use the same format: `https://via.placeholder.com/400x300/cccccc/666666?text=Image`
- One exception: The "This Is Fine" meme uses `text=This+Is+Fine`
- Alt text descriptions are preserved and should help identify the correct replacement images
- Images span from 2014 to 2021, so we may need to check different time periods in git history
- Original Ghost URLs use format: `__GHOST_URL__/content/images/[year]/[month]/[hash].jpg`
