import type { Metadata } from "next";
import { Callout } from "../_components/Callout";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Installation & Quick Start",
  description: "Set up a new Kashvi project and run the server.",
};

export default function InstallationPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="installation">Installation</h1>

      <h2 id="install-go">1. Install Go</h2>
      <p>Ensure you have Go 1.22 or later installed.</p>

      <h2 id="install-cli">2. Install Kashvi CLI</h2>
      <CodeBlock language="bash">
        {`go install github.com/shashiranjanraj/kashvi/cmd/kashvi@latest`}
      </CodeBlock>

      <h2 id="create-project">3. Create a New Project</h2>
      <CodeBlock language="bash">
        {`kashvi new myproject
cd myproject`}
      </CodeBlock>

      <h2 id="configure-environment">4. Configure Environment</h2>
      <p>Copy the example environment file:</p>
      <CodeBlock language="bash">{`cp .env.example .env`}</CodeBlock>
      <p>Edit <code>.env</code> with your database and other settings (see <strong>Logging</strong> for <code>LOG_LEVEL</code> and <code>DB_LOG_MODE</code>):</p>
      <CodeBlock title=".env" language="bash">
        {`DB_DRIVER=sqlite
DATABASE_DSN=kashvi.db
JWT_SECRET=your-secret-key
APP_PORT=8080
APP_ENV=local
REDIS_ADDR=localhost:6379
LOG_LEVEL=info
DB_LOG_MODE=silent`}
      </CodeBlock>

      <h2 id="logging">Logging (app and database)</h2>
      <p>
        A common need is to see <strong>what the app is doing</strong> (info logs) and <strong>what SQL is running</strong> (database logs). Kashvi uses structured logging and supports both.
      </p>

      <h3 id="logging-env">Environment</h3>
      <p>In <code>.env</code>:</p>
      <CodeBlock title=".env" language="bash">
        {`# App log level: debug | info | warn | error (default: info)
LOG_LEVEL=debug

# GORM/SQL log level: silent | error | warn | info (default: silent)
# Use "info" in development to log every query; "silent" in production.
DB_LOG_MODE=info`}
      </CodeBlock>
      <ul>
        <li><strong>LOG_LEVEL</strong> — Controls the application logger (startup, requests, errors). Use <code>debug</code> in development to see route registration and detailed messages; <code>info</code> or <code>warn</code> in production.</li>
        <li><strong>DB_LOG_MODE</strong> — Controls GORM&apos;s SQL logging. Use <code>info</code> while developing to see queries and bindings; set to <code>silent</code> or <code>error</code> in production to reduce noise.</li>
      </ul>

      <h3 id="logging-code">In your code</h3>
      <p>Use the global logger for app-level messages:</p>
      <CodeBlock title="Logger usage" language="go">
        {`import "github.com/shashiranjanraj/kashvi/pkg/logger"

logger.Info("user_created", "user_id", user.ID, "email", user.Email)
logger.Debug("cache_miss", "key", cacheKey)
logger.Warn("rate_limit_approaching", "ip", ip, "count", n)
logger.Error("payment_failed", "error", err, "order_id", orderID)`}
      </CodeBlock>
      <p>Arguments are key-value pairs (alternating); they appear as structured fields in the log output.</p>

      <h3 id="logging-request-scoped">Request-scoped logs (with request_id)</h3>
      <p>The framework injects a <strong>request_id</strong> per request. Use it so you can trace one request across logs:</p>
      <CodeBlock language="go">
        {`// In a handler that has *http.Request (e.g. after ctx.Wrap, use c.R.Context())
log := logger.WithCtx(c.R.Context())
log.Info("order_created", "order_id", order.ID, "user_id", userID)`}
      </CodeBlock>
      <p>If the request passed through <code>reqid.Middleware()</code> and <code>middleware.Logger()</code>, <code>WithCtx</code> returns a logger that already includes <code>request_id</code>. The same ID is logged for that request in the HTTP access line (method, path, status, duration).</p>

      <h3 id="logging-summary">Summary</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-2 font-semibold">Goal</th>
              <th className="text-left px-4 py-2 font-semibold">What to set / use</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">See app info and debug messages</td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>LOG_LEVEL=debug</code> (or <code>info</code>)</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">See SQL queries in development</td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>DB_LOG_MODE=info</code></td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Trace one HTTP request in logs</td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>logger.WithCtx(r.Context())</code> in handlers</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Log from anywhere</td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>logger.Info/Debug/Warn/Error(&quot;msg&quot;, &quot;key&quot;, value)</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="quick-start">Quick Start</h2>

      <h3 id="basic-application">Basic Application</h3>
      <p>Create <code>main.go</code>:</p>
      <CodeBlock title="main.go" language="go">
        {`package main

import (
    "net/http"
    "github.com/shashiranjanraj/kashvi/pkg/app"
    "github.com/shashiranjanraj/kashvi/pkg/router"
)

func main() {
    app.New().
        Routes(func(r *router.Router) {
            r.Get("/hello", "hello", func(w http.ResponseWriter, req *http.Request) {
                w.Write([]byte("Hello from Kashvi!"))
            })
        }).
        Run()
}`}
      </CodeBlock>
      <p>Run the application:</p>
      <CodeBlock language="bash">
        {`go run main.go serve
# or
kashvi serve`}
      </CodeBlock>

      <h3 id="database-setup">Database Setup</h3>
      <p>For database support, add models and migrations:</p>
      <CodeBlock language="go">
        {`app.New().
    Routes(func(r *router.Router) {
        // routes here
    }).
    AutoMigrate(&User{}).
    Run()`}
      </CodeBlock>

    </article>
  );
}
