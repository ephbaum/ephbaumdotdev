#!/usr/bin/env node

import { createInterface } from 'readline';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const displayHours = date.getHours() % 12 || 12;

    return {
        filename: `${year}-${month}-${day}`,
        pubDate: `${month}/${day}/${year} ${displayHours}:${minutes} ${ampm}`
    };
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
}

async function main() {
    console.log('📝 Creating a new blog post...\n');

    try {
        // Get title
        const title = await question('Title: ');
        if (!title.trim()) {
            console.log('❌ Title is required!');
            process.exit(1);
        }

        // Get description
        const description = await question('Description: ');
        if (!description.trim()) {
            console.log('❌ Description is required!');
            process.exit(1);
        }

        // Get tags
        const tagsInput = await question('Tags (comma-separated): ');
        const tags = tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        // Ensure we always have at least one tag
        if (tags.length === 0) {
            tags.push('general');
        }

        // Get date/time
        const dateInput = await question('Date/Time (YYYY-MM-DD HH:MM AM/PM) or press Enter for now: ');
        let date;

        if (dateInput.trim()) {
            try {
                date = new Date(dateInput);
                if (isNaN(date.getTime())) {
                    throw new Error('Invalid date');
                }
            } catch (error) {
                console.log('❌ Invalid date format. Using current date/time.');
                date = new Date();
            }
        } else {
            date = new Date();
        }

        // Get draft status
        const draftInput = await question('Draft? (y/N): ');
        const isDraft = draftInput.toLowerCase().startsWith('y');

        // Generate slug and filename
        const slug = slugify(title);
        const { filename, pubDate } = formatDate(date);
        const fullFilename = `${filename}-${slug}.md`;

        // Create directory structure
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dirPath = join('src', 'content', 'blog', year.toString(), month);

        if (!existsSync(dirPath)) {
            mkdirSync(dirPath, { recursive: true });
        }

        const filePath = join(dirPath, fullFilename);

        // Generate frontmatter
        const frontmatter = `---
title: "${title}"
postSlug: ${slug}
slug: ${slug}
pubDate: ${pubDate}
imgUrl: "../../../../assets/img/ephbaum_avatar_800_400.png"
ogImage: "../../../../assets/img/ephbaum_avatar_800_400.png"
author: Eph Baum
featured: false
draft: ${isDraft}
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
description: "${description}"
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/ephbaum_avatar_800_400.png)

Your blog post content goes here...

## Introduction

Start writing your post here.

## Main Content

Add your main content sections here.

## Conclusion

Wrap up your thoughts here.
`;

        // Write the file
        writeFileSync(filePath, frontmatter);

        console.log(`\n✅ Blog post created successfully!`);
        console.log(`📁 Location: ${filePath}`);
        console.log(`🔗 Slug: ${slug}`);
        console.log(`📅 Date: ${pubDate}`);
        console.log(`📝 Draft: ${isDraft ? 'Yes' : 'No'}`);
        console.log(`🏷️  Tags: ${tags.join(', ')}`);
        console.log(`\n💡 Tip: Edit the file to add your content and images!`);

    } catch (error) {
        console.error('❌ Error creating blog post:', error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main();
