import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-dvh overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-110">
              K
            </span>
            <span className="font-extrabold tracking-tight text-lg text-zinc-900 dark:text-zinc-50">
              Kashvi
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition">Features</a>
            <a href="#docs" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition">Docs</a>
            <a href="https://github.com/shashiranjanraj/kashvi" target="_blank" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition">GitHub</a>
          </div>

          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105"
          >
            View Docs
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 px-4 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
            Production-Ready Go Framework
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
            Build <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">powerful APIs</span> with confidence
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Kashvi is a modern, feature-rich framework for building production-grade Go APIs.
            Ships with CLI tools, ORM, validation, authentication, and more—everything you need to ship fast.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/docs/installation"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base hover:shadow-2xl hover:shadow-indigo-500/40 transition-all hover:scale-105 group"
            >
              <span>Get Started</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://github.com/shashiranjanraj/kashvi"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold text-base hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Type-Safe
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              Fast
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
              Production Ready
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4">
              Everything you need to build APIs
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
              Kashvi comes packed with all the tools and features modern API development demands.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Built on Go's performance to handle millions of requests per second."
              },
              {
                icon: "🔐",
                title: "Secure by Default",
                description: "Built-in authentication, authorization, and security best practices."
              },
              {
                icon: "📦",
                title: "Complete ORM",
                description: "Powerful database ORM with migrations, relationships, and transactions."
              },
              {
                icon: "✅",
                title: "Smart Validation",
                description: "Declarative validation rules with detailed error messages."
              },
              {
                icon: "🛠️",
                title: "CLI Tools",
                description: "Powerful command-line tools for scaffolding and code generation."
              },
              {
                icon: "📡",
                title: "Real-time Features",
                description: "WebSocket support and real-time data synchronization built-in."
              },
              {
                icon: "📚",
                title: "Complete Docs",
                description: "Comprehensive guides, API reference, and practical examples."
              },
              {
                icon: "🧪",
                title: "Testing Ready",
                description: "Built-in testing utilities and fixtures for easy testing."
              },
              {
                icon: "🚀",
                title: "Deploy Anywhere",
                description: "Deploy as a single binary to any cloud platform or server."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="docs-card group p-6 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50K+", label: "Downloads", icon: "📥" },
              { number: "98%", label: "API Coverage", icon: "📊" },
              { number: "<5ms", label: "Avg Response Time", icon: "⚡" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200/50 dark:border-indigo-800/30"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-6">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
            Start with our comprehensive documentation and examples. Join thousands of developers already building with Kashvi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-2xl hover:shadow-indigo-500/40 transition-all hover:scale-105"
            >
              Read the Docs
            </Link>
            <Link
              href="/docs/installation"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all hover:scale-105"
            >
              Quick Start
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white">
                  K
                </span>
                <span className="font-bold text-zinc-900 dark:text-white">Kashvi</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Build production-grade Go APIs with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Guide</Link></li>
                <li><Link href="/docs/api" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">API Reference</Link></li>
                <li><Link href="/docs/cli" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">CLI</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">GitHub</a></li>
                <li><a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Twitter</a></li>
                <li><a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/shashiranjanraj/kashvi/blob/main/LICENSE" target="_blank" rel="noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">License</a></li>
                <li><a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Privacy</a></li>
                <li><a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <p>&copy; 2024 Kashvi Framework. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition">GitHub</a>
              <a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition">Twitter</a>
              <a href="https://github.com/shashiranjanraj/kashvi" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
