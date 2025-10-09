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
| Basic deployment | **GitHub Actions + Vercel ready** | Automated CI/CD pipeline |
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
| `pnpm run new-post` | Create a new blog post with frontmatter | Interactive script for content creation |

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
│       └── YYYY/MM/   # Organized by year and month
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

### Creating New Blog Posts

Use the interactive blog post creation tool:

```bash
pnpm run new-post
```

This script will prompt you for:
- **Title** - The blog post title
- **Description** - SEO description for the post
- **Tags** - Comma-separated tags (defaults to 'general' if none provided)
- **Date/Time** - Publication date (defaults to current time if not specified)
- **Draft Status** - Whether the post should be marked as draft

The script automatically:
- ✅ **Generates slug** from the title (URL-friendly format)
- ✅ **Creates directory structure** by year/month (`src/content/blog/YYYY/MM/`)
- ✅ **Generates frontmatter** with all required metadata
- ✅ **Sets up file structure** with proper image paths and layout
- ✅ **Provides template content** with introduction, main content, and conclusion sections

### Blog Post Structure

Blog posts are written in Markdown and stored in `src/content/blog/YYYY/MM/`. Each post includes:

- **Frontmatter** with metadata (title, date, tags, author, etc.)
- **Markdown content** with template structure
- **Automatic OG image generation** for social media
- **SEO optimization** with proper meta tags
- **Draft support** for work-in-progress posts

## 🔒 Security

This project is regularly updated to address security vulnerabilities:

- **Astro 4.16.19** - Latest stable version with security fixes
- **Regular dependency updates** - Automated security patches
- **Static site** - No server-side vulnerabilities
- **Audit workflow** - Regular security scanning

## 🚀 Deployment

### GitHub Actions + Vercel

The site is designed to be deployed as a static site using:

1. **GitHub Actions** - Automated CI/CD pipeline
2. **Vercel** - Fast, global CDN with edge functions
3. **Custom Domain** - `ephbaum.dev`

### Build Process

```bash
pnpm run build
```

This generates optimized static files in the `dist/` directory, ready for deployment.

### 🛠️ Deployment Setup

The site is currently deployed using:

#### **Vercel Configuration**
- ✅ **Vercel Project** - Connected to GitHub repository
- ✅ **Custom Domain** - `ephbaum.dev` with automatic SSL
- ✅ **Build Configuration** - `vercel.json` with Astro framework detection
- ✅ **Automatic Deployments** - Deploys on every push to `main` branch

#### **GitHub Actions Workflow**
- ✅ **Workflow File** - `.github/workflows/deploy-vercel.yml`
- ✅ **GitHub Secrets** configured:
  - `VERCEL_TOKEN` - Vercel authentication token
  - `VERCEL_ORG_ID` - Vercel organization ID
  - `VERCEL_PROJECT_ID` - Vercel project ID
- ✅ **Automated Process** - Builds and deploys on push to `main`
- ✅ **Preview Deployments** - Automatic preview URLs for pull requests

#### **Preview Deployments**
When you create a pull request, Vercel automatically:
- 🚀 **Builds and deploys** your changes to a unique preview URL
- 🔗 **Comments on the PR** with the preview deployment link
- 🧪 **Provides isolated testing** environment identical to production
- 👥 **Enables collaboration** - reviewers can test changes live before merging
- 🗑️ **Auto-cleanup** - preview deployments are removed when PR is closed

### 🔒 Security Considerations

**Why This Setup is Safe:**
- ✅ **Static site only** - No server-side code execution
- ✅ **Public content** - Blog posts are meant to be public
- ✅ **No secrets in build** - Vercel tokens stored in GitHub Secrets
- ✅ **Minimal permissions** - Vercel tokens restricted to project deployment
- ✅ **Encrypted secrets** - GitHub Secrets are encrypted at rest

**What We're Protecting:**
- 🔐 Vercel authentication tokens
- 🔐 Project configuration
- 🔐 Deployment tokens
- 🔐 Any future API keys (if needed)

### 📋 Deployment Workflow

```mermaid
graph TD
    A[Push to main] --> B[GitHub Actions]
    C[Create Pull Request] --> B
    B --> D[Install dependencies]
    D --> E[Build Astro site]
    E --> F{Deployment Type}
    F -->|Main branch| G[Deploy to Production]
    F -->|PR branch| H[Deploy Preview]
    G --> I[Live at ephbaum.dev]
    H --> J[Preview URL in PR comment]
```

**Automated Process:**
1. **Code Push/PR** → Triggers GitHub Actions
2. **Build** → `npm ci` → `npm run build`
3. **Deploy** → Deploy to Vercel using Vercel Action
4. **Result** → Production site at `ephbaum.dev` OR preview URL for PRs

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

*Built with ❤️ using Astro and deployed with Vercel*