#!/usr/bin/env node

/**
 * Check what EXIF metadata exists in an image
 * Shows what would be stripped by the pre-commit hook
 * 
 * Usage:
 *   node scripts/check-image-metadata.js <image-file>
 */

import sharp from 'sharp';
import { resolve } from 'node:path';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Usage: node scripts/check-image-metadata.js <image-file>');
    process.exit(1);
}

async function checkMetadata(imagePath) {
    const fullPath = resolve(imagePath);

    try {
        console.log(`\n🔍 Checking metadata for: ${imagePath}`);
        console.log('='.repeat(60));

        const image = sharp(fullPath);
        const metadata = await image.metadata();

        console.log('\n📸 Basic Image Info:');
        console.log(`   Format: ${metadata.format}`);
        console.log(`   Size: ${metadata.width}x${metadata.height}`);
        console.log(`   Space: ${metadata.space}`);
        console.log(`   Channels: ${metadata.channels}`);
        console.log(`   Depth: ${metadata.depth}`);
        console.log(`   Density: ${metadata.density || 'not set'}`);
        console.log(`   Orientation: ${metadata.orientation || 'not set'}`);

        let hasPrivacyData = false;

        if (metadata.exif) {
            console.log('\n⚠️  EXIF Data Found (WILL BE STRIPPED):');
            console.log('   Contains technical camera/photo data');
            console.log(`   Size: ${metadata.exif.length} bytes`);
            hasPrivacyData = true;

            // Try to parse some common EXIF fields
            // Note: Sharp doesn't fully parse EXIF, but we can check for GPS tags
            const exifBuffer = metadata.exif;
            if (exifBuffer.includes('GPS')) {
                console.log('   ⚠️  GPS DATA DETECTED - Location information present!');
            }
        }

        if (metadata.icc) {
            console.log('\n✅ ICC Color Profile Found (PRESERVED):');
            console.log('   Contains color space information');
            console.log(`   Size: ${metadata.icc.length} bytes`);
        }

        if (metadata.xmp) {
            console.log('\n⚠️  XMP Data Found (WILL BE STRIPPED):');
            console.log('   Contains editing history and software info');
            console.log(`   Size: ${metadata.xmp.length} bytes`);
            hasPrivacyData = true;
        }

        if (metadata.iptc) {
            console.log('\n⚠️  IPTC Data Found (WILL BE STRIPPED):');
            console.log('   Contains keywords, captions, copyright info');
            console.log(`   Size: ${metadata.iptc.length} bytes`);
            hasPrivacyData = true;
        }

        console.log('\n' + '='.repeat(60));

        if (hasPrivacyData) {
            console.log('⚠️  This image contains metadata that will be stripped on commit');
            console.log('   To strip manually: pnpm run strip-metadata ' + imagePath);
        } else {
            console.log('✅ This image has no privacy-sensitive metadata');
        }

        console.log('');

    } catch (error) {
        console.error(`✗ Error reading ${imagePath}:`);
        console.error(`  ${error.message}`);
        process.exit(1);
    }
}

checkMetadata(args[0]);

