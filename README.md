# 🚴 VeloStore

> Premium bicycle e-commerce platform showcasing cutting-edge cycling technology with stunning visual design.

[![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat&logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- 🎨 **Premium Design** - Modern, responsive UI with glassmorphism and smooth animations
- 🔍 **Product Catalog** - Browse high-end road, mountain, gravel, and electric bikes
- 📰 **Innovation Blog** - Detailed articles on cycling technology breakthroughs
- 🛒 **Shopping Cart** - Full-featured cart with real-time price calculations
- 🌙 **Dark Mode** - Beautiful dark-themed interface optimized for readability
- ⚡ **Performance** - Lightning-fast SSR with Nuxt 3 and optimized assets
- 📱 **Mobile First** - Fully responsive across all devices
- ♿ **Accessible** - WCAG compliant with semantic HTML

---

## 🛠️ Tech Stack

### Core
- **[Nuxt 3](https://nuxt.com/)** - Vue 3 meta-framework with SSR
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Nuxt Image](https://image.nuxt.com/)** - Optimized image delivery

### Development
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[ESLint](https://eslint.org/)** - Code quality & consistency
- **[Git](https://git-scm.com/)** - Version control

### Architecture
- **Atomic Design** - Reusable component hierarchy (atoms → organisms)
- **TypeScript Best Practices** - Branded types, JSDoc, type guards
- **Centralized Data** - Single source of truth with composables
- **SSR Compatible** - No hydration mismatches

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or **Bun 1.x** installed
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Ibnu-Alinsani/velostore.git
cd velostore

# Install dependencies (using Bun)
bun install

# Or using npm/yarn/pnpm
npm install
```

### Development

```bash
# Start development server
bun run dev

# Open http://localhost:3000 in your browser
```

The app will automatically reload when you make changes.

### Build for Production

```bash
# Generate static site
bun run generate

# Or build SSR
bun run build

# Preview production build
bun run preview
```

---

## 📁 Project Structure

```
velostore/
├── app/
│   ├── components/
│   │   ├── atoms/          # Reusable atomic components
│   │   │   ├── SectionBadge.vue
│   │   │   ├── GradientHeading.vue
│   │   │   ├── StatDisplay.vue
│   │   │   └── IconWrapper.vue
│   │   └── organisms/      # Complex feature components
│   │       ├── BrandIntro.vue
│   │       ├── InnovationGrid.vue
│   │       └── ...
│   ├── composables/        # Vue composables
│   │   ├── useInnovationData.ts
│   │   └── useScrollReveal.ts
│   ├── pages/              # File-based routing
│   │   ├── index.vue       # Homepage
│   │   ├── bikes.vue       # Product catalog
│   │   └── innovation/     # Blog pages
│   ├── types/              # TypeScript definitions
│   │   └── index.ts
│   ├── public/             # Static assets
│   └── app.vue             # Root component
├── nuxt.config.ts          # Nuxt configuration
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Dependencies & scripts
```

---

## 🎯 Recent Improvements

### Comprehensive TypeScript Refactor (Dec 2024)

Recently completed a major refactoring effort focused on code quality and maintainability:

#### What Changed
- ✅ **-178 lines** of duplicated code eliminated
- ✅ **4 atomic components** created for reusability
- ✅ **Full TypeScript type safety** with branded types & guards
- ✅ **Centralized data management** with composables
- ✅ **100% JSDoc coverage** for better DX

#### Key Components

**SectionBadge** - Unified badge component
```vue
<SectionBadge label="Innovation" variant="gradient" color="blue" />
```

**StatDisplay** - Consistent stat presentation
```vue
<StatDisplay value="50K+" label="Global Riders" gradient />
```

**GradientHeading** - Animated gradient text
```vue
<GradientHeading size="xl" animate-gradient>
  Your Perfect Ride
</GradientHeading>
```

#### TypeScript Best Practices
- Branded types (`BikeId`, `Slug`) prevent type mixing
- Const assertions for better inference
- Type guards for runtime safety
- Comprehensive JSDoc documentation

See [walkthrough.md](.gemini/antigravity/brain/7ad0beea-43de-4e27-8f57-1fa1bcff3fec/walkthrough.md) for complete refactor details.

---

## 🌐 Deployment

### GitHub Pages

This project includes CI/CD setup for GitHub Pages deployment:

```bash
# Build static site
bun run generate

# Output goes to .output/public/
```

**nuxt.config.ts** is pre-configured for static generation:
```ts
export default defineNuxtConfig({
  ssr: false, // Static generation
  // ... other config
})
```

### Manual Deployment

```bash
# Generate static files
bun run generate

# Deploy .output/public/ to your hosting provider
```

### Environment Variables

No environment variables required for basic deployment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

### Code Style
- Follow existing TypeScript & Vue patterns
- Use atomic design principles for new components
- Add JSDoc comments for public APIs
- Test on multiple devices before submitting

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production (SSR) |
| `bun run generate` | Generate static site |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript checks |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ibnu Alinsani**

- GitHub: [@Ibnu-Alinsani](https://github.com/Ibnu-Alinsani)

---

## 🙏 Acknowledgments

- Design inspiration from premium cycling brands
- Nuxt.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Open source community

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ and lots of ☕

</div>
