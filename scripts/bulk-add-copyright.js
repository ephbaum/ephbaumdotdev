#!/usr/bin/env node

/**
 * Add copyright metadata to all images
 * Alternative approach: Strip everything EXCEPT add your copyright
 * 
 * Usage:
 *   node scripts/bulk-add-copyright.js [--dry-run]
 *   
 * Options:
 *   --dry-run    Show what would be done without making changes
 *   
 * Note: This requires exiftool to be installed
 *   Ubuntu/Debian: sudo apt-get install libimage-exiftool-perl
 *   macOS: brew install exiftool
 */

import { execSync } from 'node:child_process';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const isDryRun = process.argv.includes('--dry-run');
const projectRoot = process.cwd();

// Copyright information
const COPYRIGHT_INFO = {
    copyright: 'Copyright © Eph Baum. Fair Use.',
    artist: 'Eph Baum',
    copyrightNotice: 'Copyright © Eph Baum. Fair Use.',
    creator: 'Eph Baum',
    rights: 'Copyright © Eph Baum. Fair Use.',
    usageTerms: 'Fair Use - Educational and personal use permitted with attribution.'
};

// Directories to scan
const imageDirs = [
    'src/assets/img',
    'public/img'
];

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

let totalProcessed = 0;
let totalErrors = 0;

/**
 * Check if exiftool is installed
 */
function checkExiftool() {
    try {
        execSync('exiftool -ver', { stdio: 'pipe' });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Recursively find all image files in a directory
 */
function findImages(dir, fileList = []) {
    if (!existsSync(dir)) return fileList;

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
 * Add copyright metadata to an image
 */
function addCopyright(imagePath) {
    const relativePath = relative(projectRoot, imagePath);

    try {
        if (isDryRun) {
            console.log(`  🔍 ${relativePath} - would add copyright`);
            totalProcessed++;
            return;
        }

        // Build exiftool command
        // -all= strips everything first
        // Then we add back only copyright info
        // -overwrite_original prevents creating backups
        const command = `exiftool -all= \
      -Copyright="${COPYRIGHT_INFO.copyright}" \
      -Artist="${COPYRIGHT_INFO.artist}" \
      -CopyrightNotice="${COPYRIGHT_INFO.copyrightNotice}" \
      -Creator="${COPYRIGHT_INFO.creator}" \
      -Rights="${COPYRIGHT_INFO.rights}" \
      -UsageTerms="${COPYRIGHT_INFO.usageTerms}" \
      -overwrite_original \
      "${imagePath}"`;

        execSync(command, { stdio: 'pipe' });
        console.log(`  ✓ ${relativePath} - copyright added`);
        totalProcessed++;

    } catch (error) {
        console.error(`  ✗ ${relativePath} - ERROR: ${error.message}`);
        totalErrors++;
    }
}

/**
 * Main execution
 */
function main() {
    console.log('🔍 Checking for exiftool...\n');

    if (!checkExiftool()) {
        console.error('❌ Error: exiftool is not installed\n');
        console.error('Please install it:');
        console.error('  Ubuntu/Debian: sudo apt-get install libimage-exiftool-perl');
        console.error('  macOS: brew install exiftool');
        process.exit(1);
    }

    console.log('✓ exiftool found\n');
    console.log('📋 Copyright info that will be added:');
    console.log(`   Copyright: ${COPYRIGHT_INFO.copyright}`);
    console.log(`   Artist: ${COPYRIGHT_INFO.artist}`);
    console.log(`   Usage Terms: ${COPYRIGHT_INFO.usageTerms}`);
    console.log('');

    if (isDryRun) {
        console.log('⚠️  DRY RUN MODE - No changes will be made\n');
    }

    console.log('🔍 Scanning for images...\n');

    // Find all images
    const allImages = [];
    for (const dir of imageDirs) {
        const dirPath = join(projectRoot, dir);
        const images = findImages(dirPath);
        allImages.push(...images);
        console.log(`Found ${images.length} images in ${dir}/`);
    }

    console.log(`\n📊 Total images found: ${allImages.length}\n`);

    if (allImages.length === 0) {
        console.log('No images to process.');
        return;
    }

    console.log('🔧 Processing images...\n');

    // Process each image
    for (const imagePath of allImages) {
        addCopyright(imagePath);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Summary:');
    console.log('='.repeat(60));
    console.log(`Total processed: ${totalProcessed}`);
    if (totalErrors > 0) {
        console.log(`Errors: ${totalErrors}`);
    }
    console.log('='.repeat(60));

    if (isDryRun) {
        console.log('\n⚠️  This was a dry run. Run without --dry-run to actually add copyright.');
    } else if (totalProcessed > 0) {
        console.log('\n✅ Done! Copyright info added to all images.');
        console.log('💡 Next steps:');
        console.log('   1. Review the changes');
        console.log('   2. Commit: git add -u');
        console.log('   3. Commit: git commit -m "Add copyright metadata to all images"');
    }
}

main();

