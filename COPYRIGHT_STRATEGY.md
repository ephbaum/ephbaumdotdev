# Copyright & Metadata Strategy

## Two Approaches: Strip Everything vs. Add Copyright

You have two strategic options for handling image metadata. Each has different trade-offs.

---

## Option 1: Strip Everything (Privacy-First) 🔒

**What it does:** Remove ALL metadata, keep only orientation

**Command:**
```bash
# Preview what will happen
pnpm run bulk-strip-metadata --dry-run

# Actually do it
pnpm run bulk-strip-metadata
```

### ✅ Pros:
- **Maximum privacy** - No GPS, camera info, timestamps in git history
- **Smaller files** - Removes unnecessary data
- **Cleaner git diffs** - Only image data changes
- **No ongoing maintenance** - Pre-commit hook handles new images
- **Best for privacy-sensitive content**

### ❌ Cons:
- **No copyright protection in metadata** - If someone downloads your images, there's no embedded copyright notice
- **No attribution info** - Images don't carry creator info
- **No usage terms** - Can't embed fair use claims

### 🎯 Best for:
- Personal blogs
- Privacy-conscious sites
- Images you don't want traced back to specific devices
- When you're using others' images (fair use) and don't want to claim false ownership

---

## Option 2: Strip + Add Copyright (Rights-First) ©️

**What it does:** Remove all EXIF/GPS/camera data, but ADD copyright/fair use info

**Command:**
```bash
# Preview what will happen
pnpm run bulk-add-copyright --dry-run

# Actually do it (requires exiftool)
pnpm run bulk-add-copyright
```

**What gets added:**
```
Copyright: Copyright © Eph Baum. Fair Use.
Artist: Eph Baum
Creator: Eph Baum
Rights: Copyright © Eph Baum. Fair Use.
Usage Terms: Fair Use - Educational and personal use permitted with attribution.
```

### ✅ Pros:
- **Copyright protection** - Your name stays with the image if downloaded
- **Fair use documentation** - Explicit fair use claim in metadata
- **Professional** - Shows you care about attribution
- **Trackable** - Can prove your images if they're used elsewhere
- **Balanced approach** - Privacy (GPS removed) + Rights (copyright added)

### ❌ Cons:
- **Adds metadata** - Files slightly larger (~200-500 bytes)
- **More complex** - Requires exiftool installation
- **Git changes** - Every image shows as modified
- **Maintenance** - Need to update pre-commit hook to add copyright to new images

### 🎯 Best for:
- Professional portfolios
- When you create original content
- When you want attribution for your work
- Documenting fair use of others' images
- Sites where image theft is a concern

---

## Recommendation for Your Blog

Given your use case (personal tech blog with mix of your own images and fair use images from Unsplash/etc):

### 🏆 **Option 1: Strip Everything** (Recommended)

**Why:**
1. **Privacy first** - You already mentioned concern about GPS/EXIF data
2. **Unsplash images** - Many of your images are from Unsplash; you're not the copyright holder
3. **Blog context** - Copyright is asserted on your blog pages, not in image files
4. **Simpler workflow** - Pre-commit hook already set up
5. **Ghost migration** - You have images from various sources; clean slate is clearer

### When to consider Option 2:
- If you start creating significant original photography/artwork
- If you want to watermark images with metadata (in addition to visual watermarks)
- If you're concerned about image theft/reuse

---

## Mixed Approach (Advanced)

You could also do **both strategically**:

1. **Strip everything from most images** (using bulk-strip-metadata)
2. **Add copyright only to YOUR original images** (manually with exiftool)

Example:
```bash
# Strip everything first
pnpm run bulk-strip-metadata

# Then selectively add copyright to specific images
exiftool -Copyright="Copyright © Eph Baum" \
  -Artist="Eph Baum" \
  src/assets/img/my-original-photo.jpg

# Or keep Unsplash attribution
exiftool -Copyright="Photo by Author Name on Unsplash" \
  -Credit="Unsplash" \
  src/assets/img/unsplash-photo.jpg
```

---

## Legal Considerations

### Fair Use Claim in Metadata

Adding "Fair Use" to copyright metadata:
- ✅ **Can document your claim** - Shows you're aware of copyright
- ✅ **Adds transparency** - Clear about usage terms
- ❌ **Doesn't grant rights** - Fair use is determined by courts, not metadata
- ❌ **Could be misleading** - If you didn't create the image, you can't copyright it

### Better Practice for Fair Use:
1. **Don't add copyright to others' images** - That's false copyright claim
2. **Keep attribution in your blog post** - HTML/markdown credit
3. **Strip metadata from others' images** - Remove their metadata, don't replace with yours
4. **Add copyright only to YOUR creations** - Images you took/created

---

## Quick Start Guide

### For Privacy (Recommended for your blog):

```bash
# 1. Preview changes
pnpm run bulk-strip-metadata --dry-run

# 2. Actually strip all metadata
pnpm run bulk-strip-metadata

# 3. Review changes
git diff --stat

# 4. Commit clean images
git add -u
git commit -m "Strip EXIF metadata from all images for privacy"

# 5. Going forward: pre-commit hook handles new images automatically
```

### For Copyright Protection:

```bash
# 1. Install exiftool (if not installed)
sudo apt-get install libimage-exiftool-perl  # Ubuntu/Debian
# or
brew install exiftool  # macOS

# 2. Edit scripts/bulk-add-copyright.js
# Update COPYRIGHT_INFO to match your exact needs

# 3. Preview changes
pnpm run bulk-add-copyright --dry-run

# 4. Apply copyright
pnpm run bulk-add-copyright

# 5. Commit
git add -u
git commit -m "Add copyright metadata to all images"

# 6. Update pre-commit hook to add copyright to new images
```

---

## What I Recommend You Do Now

**Step 1:** Strip everything (privacy-first approach)
```bash
pnpm run bulk-strip-metadata --dry-run  # preview
pnpm run bulk-strip-metadata            # do it
```

**Step 2:** Review and commit
```bash
git diff --stat
git add -u
git commit -m "Strip EXIF metadata from all images"
```

**Step 3:** Going forward
- Pre-commit hook automatically strips new images
- If you create original images you want to protect, manually add copyright to those specific files
- Keep Unsplash/fair use attribution in your blog posts (HTML), not in image metadata

This gives you **privacy by default** with **flexibility to add copyright** to specific images when needed.

---

## Questions to Consider

Before deciding, ask yourself:

1. **Do you own these images?**
   - Mostly yours → Consider Option 2
   - Mix of yours + Unsplash/fair use → Option 1

2. **Are you concerned about image theft?**
   - Yes, frequently happens → Option 2
   - Not really → Option 1

3. **Do you want GPS/location data removed?**
   - Yes (privacy concern) → Must strip EXIF first (both options do this)

4. **Is professional attribution important?**
   - Yes, portfolio site → Option 2
   - No, personal blog → Option 1

For your tech blog with mixed sources: **Option 1 (Strip Everything)** is cleaner, simpler, and more honest about attribution.

