#!/usr/bin/env node

/**
 * Strip EXIF metadata from images using Sharp
 * Alternative to exiftool using a package already in the project
 * 
 * Usage:
 *   node scripts/strip-image-metadata.js <image-file>
 *   node scripts/strip-image-metadata.js src/assets/img/2025/10/photo.jpg
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Usage: node scripts/strip-image-metadata.js <image-file>');
    console.error('Example: node scripts/strip-image-metadata.js src/assets/img/photo.jpg');
    process.exit(1);
}

async function stripMetadata(imagePath) {
    const fullPath = resolve(imagePath);
    const ext = extname(imagePath).toLowerCase();

    // Supported formats
    const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

    if (!supportedFormats.includes(ext)) {
        console.error(`Unsupported format: ${ext}`);
        console.error(`Supported formats: ${supportedFormats.join(', ')}`);
        process.exit(1);
    }

    try {
        console.log(`Processing: ${imagePath}`);

        // Read the image
        const image = sharp(fullPath);
        const metadata = await image.metadata();

        // Check if there's EXIF data
        const hasExif = metadata.exif || metadata.icc || metadata.xmp || metadata.iptc;

        if (!hasExif) {
            console.log('  ℹ No EXIF data found');
            return;
        }

        console.log('  Found metadata:');
        if (metadata.exif) console.log('    - EXIF data');
        if (metadata.xmp) console.log('    - XMP data');
        if (metadata.iptc) console.log('    - IPTC data');
        if (metadata.icc) console.log('    - ICC color profile (will be preserved)');

    // Strip ALL metadata
    // We rotate the image if needed based on orientation, then strip everything
    let processedImage = image;
    
    // Apply rotation based on EXIF orientation, then strip the EXIF
    if (metadata.orientation) {
      processedImage = processedImage.rotate();
    }
    
    // Strip all metadata completely
    const processed = await processedImage
      .toBuffer();

        // Write back to the same file
        writeFileSync(fullPath, processed);
        console.log('  ✓ Metadata stripped successfully');

    } catch (error) {
        console.error(`  ✗ Error processing ${imagePath}:`);
        console.error(`    ${error.message}`);
        process.exit(1);
    }
}

async function main() {
    for (const imagePath of args) {
        await stripMetadata(imagePath);
    }
    console.log('\n✓ All images processed');
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});

