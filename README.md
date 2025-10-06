# Eph Baum dot Dev

A personal blog built with Astro and a brutalist theme, migrated from Ghost CMS to a modern static site generator.

## 🎯 About

A blog where I talk to myself to answer my own questions about tech, engineering, and working with people. This site was migrated from a Ghost blog running on Digital Ocean to a static Astro site for better performance, lower costs, and easier maintenance.

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[UnoCSS](https://unocss.dev/)** - Atomic CSS engine (TailwindCSS compatible)
- **[Brutal UI](https://github.com/eliancodes/brutal-ui)** - Brutalist design system
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[pnpm](https://pnpm.io/)** - Package manager
- **[asdf](https://asdf-vm.com/)** - Version management

## 🎨 Theme Foundation

This blog is built on the **[Brutal](https://github.com/eliancodes/brutal)** neobrutalist Astro theme, which provides:

- **Neobrutalist Design** - Minimalistic and functional aesthetic
- **No JavaScript by default** - Pure static generation approach
- **UnoCSS Integration** - Utility-first CSS with TailwindCSS compatibility
- **Built-in SEO** - Automatic sitemap, RSS feed, and image optimization
- **16 Color Palette** - Predefined brutalist colors (red, blue, green, yellow, pink, purple, orange, teal, cyan, lime, emerald, fuchsia, violet, rose, sky, amber)

### 🚀 Our Customizations & Enhancements

We've significantly evolved the base theme with these improvements:

| **Base Theme** | **Our Enhanced Version** | **Benefits** |
|---|---|---|
| Basic Astro setup | **TypeScript integration** | Full type safety and better DX |
| Simple markdown posts | **Advanced content management** | Structured blog with tags, metadata |
| Basic image handling | **OG image generation** | Automatic social media previews |
| Standard RSS feed | **Enhanced RSS + sitemap** | Better SEO and content discovery |
| Basic styling | **Custom brutalist components** | Unique design system |
| No version management | **asdf + pnpm setup** | Consistent development environment |
| Basic deployment | **GitHub Actions + Firebase ready** | Automated CI/CD pipeline |
| Ghost migration | **Complete CMS migration** | Preserved content and SEO |
| Security baseline | **Regular security updates** | Astro 4.16.19 with latest patches |

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (managed via asdf)
- [pnpm](https://pnpm.io/) (managed via asdf)
- [asdf](https://asdf-vm.com/) for version management

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ephbaum/ephbaumdotdev.git
   cd ephbaumdotdev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:4321](http://localhost:4321)

### Available Scripts

Based on the original Brutal theme with our enhancements:

| Command | Action | Notes |
|---------|--------|-------|
| `pnpm run dev` | Start local dev server at `localhost:4321` | Enhanced with TypeScript support |
| `pnpm run build` | Build production site to `./dist/` | Includes OG image generation |
| `pnpm run preview` | Preview build locally before deploying | Test production build |
| `pnpm run astro` | Run Astro CLI commands | Full CLI access |
| `pnpm run astro --help` | Get help using the Astro CLI | Documentation |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── blog/          # Blog-specific components (from base theme)
│   ├── errors/        # Error pages like 404 (from base theme)
│   ├── generic/       # Reusable components (from base theme)
│   ├── home/          # Homepage components (from base theme)
│   └── layout/        # Header, footer, head sections (from base theme)
├── content/            # Blog posts and content
│   └── blog/          # Markdown blog posts with frontmatter
├── layouts/           # Page layouts
│   ├── Default.astro  # Base layout with props system
│   └── BlogPost.astro # Blog-specific layout
├── pages/             # File-based routing
│   ├── blog/         # Blog listing and individual posts
│   ├── v1/generate/  # OG image generation (custom addition)
│   ├── feed.xml.js   # RSS feed (from base theme)
│   └── index.astro   # Homepage
└── styles/           # Global styles and UnoCSS config
```

### 🎨 Component Architecture

Following the base theme's structure with our enhancements:

- **`components/blog/`** - Blog listing, content, sidebar components
- **`components/errors/`** - 404 page and error handling
- **`components/generic/`** - Reusable components like RecentBlogPosts
- **`components/home/`** - Homepage-specific components
- **`components/layout/`** - BaseHead, BaseNavigation, BaseFooter

## 🎨 Features

- **Static Site Generation** - Fast, secure, and SEO-friendly
- **Brutalist Design** - Bold, functional, and distinctive UI
- **Responsive Layout** - Works on all devices
- **OG Image Generation** - Automatic social media previews
- **RSS Feed** - `/feed.xml` for subscribers
- **Sitemap** - Automatic SEO sitemap generation
- **Image Optimization** - Automatic WebP conversion and optimization
- **TypeScript** - Full type safety throughout

### 🎨 Brutalist Color System

The theme includes 16 predefined brutalist colors that can be used throughout the site:

**Primary Colors**: red, blue, green, yellow, pink, purple, orange, teal  
**Secondary Colors**: cyan, lime, emerald, fuchsia, violet, rose, sky, amber

These colors are used in:
- Background sections (`bg-pink`, `bg-green`, `bg-blue`, etc.)
- Component styling
- Page layouts and visual hierarchy
- Maintaining the brutalist aesthetic

## 📝 Content Management

Blog posts are written in Markdown and stored in `src/content/blog/`. Each post includes:

- Frontmatter with metadata (title, date, tags, etc.)
- Markdown content
- Automatic OG image generation
- SEO optimization

## 🔒 Security

This project is regularly updated to address security vulnerabilities:

- **Astro 4.16.19** - Latest stable version with security fixes
- **Regular dependency updates** - Automated security patches
- **Static site** - No server-side vulnerabilities
- **Audit workflow** - Regular security scanning

## 🚀 Deployment

### GitHub Actions + Firebase Hosting

The site is designed to be deployed as a static site using:

1. **GitHub Actions** - Automated CI/CD pipeline
2. **Firebase Hosting** - Fast, global CDN
3. **Custom Domain** - `ephbaum.dev`

### Build Process

```bash
pnpm run build
```

This generates optimized static files in the `dist/` directory, ready for deployment.

## 🔄 Migration from Ghost

This blog was migrated from Ghost CMS, which involved:

- **Database export** - MySQL dump to Markdown conversion
- **Image migration** - Asset optimization and organization
- **URL preservation** - Maintaining existing permalinks
- **SEO preservation** - Keeping search engine rankings

## 🤝 Contributing

This is a personal blog, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License & Copyright

### Software License
This project's code, configuration files, and documentation are licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Content Copyright
**IMPORTANT**: All blog content, articles, and written material on this site are copyrighted by Eph Baum and are NOT covered by the MIT license. This includes:
- Blog posts and articles
- Personal writings and opinions  
- Original images and graphics created by the author
- Any other creative content

### Third-Party Content
Any copyrighted material from third parties (images, quotes, references, etc.) used on this site is used under fair use standards for commentary, criticism, education, and news reporting purposes.

### Usage Rights
You may not reproduce, distribute, or use the blog content without explicit written permission from the copyright holder.

## 🔗 Links

- **Live Site**: [ephbaum.dev](https://ephbaum.dev)
- **Repository**: [github.com/ephbaum/ephbaumdotdev](https://github.com/ephbaum/ephbaumdotdev)
- **Author**: [Eph Baum](https://ephbaum.dev)

---

*Built with ❤️ using Astro and deployed with Firebase*