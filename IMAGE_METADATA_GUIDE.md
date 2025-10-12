# Image Metadata Stripping Guide

## What is EXIF/Metadata?

Every time you take a photo with a camera or phone, or edit an image with software, hidden metadata gets embedded in the file. This can include surprisingly sensitive information.

## 🚨 What Gets STRIPPED (Privacy & Security)

### 1. GPS Location Data 🗺️
**The biggest privacy risk!**
- Exact latitude/longitude coordinates
- Altitude
- GPS timestamp
- Satellite information

**Real-world risk:** A photo taken at home can reveal your home address. A photo from your workplace can reveal where you work. This data persists even if you share the image online.

### 2. Camera & Device Information 📷
- Camera make and model (e.g., "Canon EOS R5", "iPhone 15 Pro")
- Lens information
- Device serial numbers
- Firmware version

**Why remove:** Can identify your specific device and track your equipment

### 3. Photo Technical Settings ⚙️
- ISO speed
- Aperture (f-stop)
- Shutter speed
- Focal length
- Flash settings
- White balance
- Exposure compensation
- Metering mode
- Scene type

**Why remove:** While not directly identifying, reveals technical patterns

### 4. Date & Time Information 🕐
- Date/time photo was taken
- Date/time file was modified
- Original date/time digitized
- Timezone information
- Subsecond timestamps

**Why remove:** Can reveal patterns of when/where you were

### 5. Software & Processing Info 💻
- Editing software used (e.g., "Adobe Photoshop 2024", "GIMP 2.10")
- Software version
- Processing history (XMP)
- Edit layers
- Processing settings

**Why remove:** Reveals your workflow and tools

### 6. Copyright & Author Data ©️
- Copyright notices
- Artist/photographer name
- Contact information
- Keywords
- Description
- Title
- Credits

**Why remove:** You may not want this public or in git history

### 7. Additional Metadata 📋
- IPTC data (journalism metadata)
  - Keywords
  - Captions
  - Credits
  - Contact info
- XMP data (Adobe/editing metadata)
- Thumbnail images (embedded previews)
- Subject distance
- Digital zoom ratio
- Scene capture type
- Color space settings

## ✅ What's PRESERVED (Needed for Display)

### 1. Image Orientation
**Preserved by default**
- EXIF orientation flag (1-8)
- Prevents photos appearing rotated/upside-down
- Essential for mobile photos

### 2. ICC Color Profile (Optional)
**Preserved by default, but can be stripped**
- Color space information (sRGB, Adobe RGB, etc.)
- Ensures colors display correctly across devices
- ~3-4 KB of data
- Contains no personal information

**Note:** Our scripts preserve this, but it can be stripped if needed for maximum size reduction.

## 📊 Real Examples

### Example 1: Smartphone Photo (Typical)
```
Before stripping: 2.8 MB
After stripping: 2.7 MB (100 KB metadata removed)

Removed data included:
- GPS coordinates (your exact location!)
- iPhone 14 Pro, iOS 17.1
- Date/time: 2024-10-12 14:23:47
- Lens: 24mm f/1.5
- Software: Photos 8.0
- And 50+ other fields...
```

### Example 2: Edited Photo (Photoshop)
```
Before stripping: 4.2 MB
After stripping: 3.9 MB (300 KB metadata removed)

Removed data included:
- Original camera info
- Adobe Photoshop 2024 v25.1
- Complete edit history (XMP)
- 15 processing steps
- Layer information
- Copyright notice
- Creator name and contact
```

### Example 3: Your Avatar (ephbaum_avatar_200_200.png)
```
Before stripping: Has 182 bytes EXIF data
After stripping: Clean

Contains basic EXIF data, likely from image editor/optimizer
```

## 🛠️ Check Your Images

Use the built-in checker to see what's in your images:

```bash
# Check a single image
pnpm run check-metadata src/assets/img/photo.jpg

# Example output shows:
# - Basic image info (size, format)
# - What metadata exists
# - What will be stripped
# - Whether it's already clean
```

## 🔒 How Our System Works

### Automatic (Git Hook)
1. You add an image: `git add src/assets/img/photo.jpg`
2. You commit: `git commit -m "Add photo"`
3. Pre-commit hook automatically:
   - Detects the staged image
   - Strips all EXIF/IPTC/XMP data
   - Preserves orientation and ICC profile
   - Re-stages the clean image
   - Proceeds with commit
4. Only clean images enter git history

### Manual (When Needed)
```bash
# Strip metadata from a specific image
pnpm run strip-metadata src/assets/img/photo.jpg

# Check what metadata exists first
pnpm run check-metadata src/assets/img/photo.jpg
```

## 🎯 Best Practices

1. **Check before committing:**
   ```bash
   pnpm run check-metadata path/to/image.jpg
   ```

2. **Strip manually if needed:**
   ```bash
   pnpm run strip-metadata path/to/image.jpg
   ```

3. **Let the hook do its job:**
   - Just add and commit normally
   - Hook handles cleaning automatically

4. **Skip only if intentional:**
   ```bash
   git commit --no-verify  # Skip hook if you need original metadata
   ```

## 🌐 Additional Resources

- **ExifTool Documentation:** https://exiftool.org/
- **EXIF Standard:** https://en.wikipedia.org/wiki/Exif
- **Sharp Documentation:** https://sharp.pixelplumbing.com/api-output#withmetadata
- **Privacy Implications:** Many news stories of people doxxed via GPS in photos

## 🔍 Real Privacy Incidents

- **Journalists** revealing sources through photo GPS data
- **Military personnel** revealing base locations in photos
- **Home addresses** revealed through real estate photos
- **Stalking cases** using GPS metadata from social media photos

This is why we strip metadata by default! 🔒

