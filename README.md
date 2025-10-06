# Eph Baum dot Dev

A personal blog built with Astro and a brutalist theme, migrated from Ghost CMS to a modern static site generator.

## 🎯 About

A blog where I talk to myself to answer my own questions about tech, engineering, and working with people. This site was migrated from a Ghost blog running on Digital Ocean to a static Astro site for better performance, lower costs, and easier maintenance.

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[UnoCSS](https://unocss.dev/)** - Atomic CSS engine
- **[Brutal UI](https://github.com/eliancodes/brutal-ui)** - Brutalist design system
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[pnpm](https://pnpm.io/)** - Package manager
- **[asdf](https://asdf-vm.com/)** - Version management

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

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build locally
- `pnpm run astro` - Run Astro CLI commands

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── content/            # Blog posts and content
│   └── blog/          # Markdown blog posts
├── layouts/           # Page layouts
├── pages/             # File-based routing
│   ├── blog/         # Blog listing and individual posts
│   └── v1/generate/  # OG image generation
└── styles/           # Global styles and UnoCSS config
```

## 🎨 Features

- **Static Site Generation** - Fast, secure, and SEO-friendly
- **Brutalist Design** - Bold, functional, and distinctive UI
- **Responsive Layout** - Works on all devices
- **OG Image Generation** - Automatic social media previews
- **RSS Feed** - `/feed.xml` for subscribers
- **Sitemap** - Automatic SEO sitemap generation
- **Image Optimization** - Automatic WebP conversion and optimization
- **TypeScript** - Full type safety throughout

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Site**: [ephbaum.dev](https://ephbaum.dev)
- **Repository**: [github.com/ephbaum/ephbaumdotdev](https://github.com/ephbaum/ephbaumdotdev)
- **Author**: [Eph Baum](https://ephbaum.dev)

---

*Built with ❤️ using Astro and deployed with Firebase*