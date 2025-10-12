#!/usr/bin/env node

/**
 * Bulk strip EXIF metadata from all images in the project
 * One-time cleanup to remove all existing metadata
 * 
 * Usage:
 *   node scripts/bulk-strip-metadata.js [--dry-run]
 *   
 * Options:
 *   --dry-run    Show what would be done without making changes
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import sharp from 'sharp';

const isDryRun = process.argv.includes('--dry-run');
const projectRoot = process.cwd();

// Directories to scan
const imageDirs = [
    'src/assets/img',
    'public/img'
];

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

let totalProcessed = 0;
let totalWithMetadata = 0;
let totalClean = 0;
let totalErrors = 0;

/**
 * Recursively find all image files in a directory
 */
function findImages(dir, fileList = []) {
    const files = readdirSync(dir);

    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            findImages(filePath, fileList);
        } else {
            const ext = extname(file).toLowerCase();
            if (supportedFormats.includes(ext)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

/**
 * Check and strip metadata from an image
 */
async function processImage(imagePath) {
    const relativePath = relative(projectRoot, imagePath);

    try {
        const image = sharp(imagePath);
        const metadata = await image.metadata();

        // Check if there's any metadata
        const hasMetadata = metadata.exif || metadata.xmp || metadata.iptc;

        if (!hasMetadata) {
            console.log(`  ✓ ${relativePath} - already clean`);
            totalClean++;
            return;
        }

        // Found metadata
        const metadataTypes = [];
        if (metadata.exif) metadataTypes.push('EXIF');
        if (metadata.xmp) metadataTypes.push('XMP');
        if (metadata.iptc) metadataTypes.push('IPTC');

        if (isDryRun) {
            console.log(`  🔍 ${relativePath} - would strip: ${metadataTypes.join(', ')}`);
            totalWithMetadata++;
            return;
        }

    // Strip ALL metadata
    // Apply rotation based on EXIF orientation first, then strip everything
    let processedImage = image;
    
    if (metadata.orientation) {
      processedImage = processedImage.rotate();
    }
    
    const processed = await processedImage
      .toBuffer();

        // Write back
        writeFileSync(imagePath, processed);
        console.log(`  ✓ ${relativePath} - stripped: ${metadataTypes.join(', ')}`);
        totalWithMetadata++;

    } catch (error) {
        console.error(`  ✗ ${relativePath} - ERROR: ${error.message}`);
        totalErrors++;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('🔍 Scanning for images...\n');

    if (isDryRun) {
        console.log('⚠️  DRY RUN MODE - No changes will be made\n');
    }

    // Find all images
    const allImages = [];
    for (const dir of imageDirs) {
        const dirPath = join(projectRoot, dir);
        try {
            const images = findImages(dirPath);
            allImages.push(...images);
            console.log(`Found ${images.length} images in ${dir}/`);
        } catch (error) {
            console.log(`Skipping ${dir}/ (not found or inaccessible)`);
        }
    }

    console.log(`\n📊 Total images found: ${allImages.length}\n`);

    if (allImages.length === 0) {
        console.log('No images to process.');
        return;
    }

    console.log('🔧 Processing images...\n');

    // Process each image
    for (const imagePath of allImages) {
        await processImage(imagePath);
        totalProcessed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Summary:');
    console.log('='.repeat(60));
    console.log(`Total processed: ${totalProcessed}`);
    console.log(`Already clean: ${totalClean}`);
    console.log(`Had metadata: ${totalWithMetadata}`);
    if (totalErrors > 0) {
        console.log(`Errors: ${totalErrors}`);
    }
    console.log('='.repeat(60));

    if (isDryRun) {
        console.log('\n⚠️  This was a dry run. Run without --dry-run to actually strip metadata.');
    } else if (totalWithMetadata > 0) {
        console.log('\n✅ Done! All metadata has been stripped.');
        console.log('💡 Next steps:');
        console.log('   1. Review the changes');
        console.log('   2. Commit the cleaned images: git add -u');
        console.log('   3. Commit: git commit -m "Strip EXIF metadata from all images"');
    } else {
        console.log('\n✨ All images were already clean!');
    }
}

main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
});

