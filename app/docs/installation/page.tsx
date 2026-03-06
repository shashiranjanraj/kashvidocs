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
      <h1 id="installation-quick-start">Installation &amp; Quick Start</h1>
      <p>
        This guide sets up a new Kashvi project from zero to a running server.
      </p>

      <h2 id="requirements">Requirements</h2>
      <ul>
        <li>
          Go <code>1.25+</code> (matches this framework&apos;s <code>go.mod</code>
          )
        </li>
        <li>Optional: Redis (session, queue, cache features)</li>
        <li>
          Optional: Postgres/MySQL/SQL Server (SQLite works by default)
        </li>
      </ul>

      <h2 id="step-1-install-cli">Step 1: Install the CLI</h2>
      <p>Install the global <code>kashvi</code> command once:</p>
      <CodeBlock>
        {`go install github.com/shashiranjanraj/kashvi/cmd/kashvi@latest
kashvi --help`}
      </CodeBlock>
      <p>If you are developing the framework repository itself, you can also run:</p>
      <CodeBlock>{`make install`}</CodeBlock>

      <h2 id="step-2-create-project">Step 2: Create a project</h2>
      <CodeBlock>
        {`mkdir my-app
cd my-app
go mod init my-app
go get github.com/shashiranjanraj/kashvi`}
      </CodeBlock>
      <p>Create <code>main.go</code>:</p>
      <CodeBlock title="main.go">
        {`package main

import (
	"github.com/shashiranjanraj/kashvi/pkg/app"
	appctx "github.com/shashiranjanraj/kashvi/pkg/ctx"
	"github.com/shashiranjanraj/kashvi/pkg/router"
)

func main() {
	app.New().
		Routes(func(r *router.Router) {
			r.Get("/health", "health", appctx.Wrap(func(c *appctx.Context) {
				c.Success(map[string]any{"ok": true})
			}))
		}).
		Run()
}`}
      </CodeBlock>

      <h2 id="step-3-env-config">Step 3: Add environment config</h2>
      <p>Create <code>.env</code>:</p>
      <CodeBlock title=".env">
        {`APP_ENV=local
APP_PORT=8080
JWT_SECRET=replace-with-long-random-secret

DB_DRIVER=sqlite
DATABASE_DSN=kashvi.db

REDIS_ADDR=localhost:6379
REDIS_PASSWORD=`}
      </CodeBlock>

      <Callout type="note" title="Notes">
        <ul className="mt-0">
          <li>
            <code>DB_DRIVER</code> supports: <code>sqlite</code>,{" "}
            <code>postgres</code>, <code>mysql</code>, <code>sqlserver</code>.
          </li>
          <li>
            Kashvi reads both <code>config/app.json</code> and <code>.env</code>{" "}
            (then applies defaults). <code>.env</code> wins.
          </li>
        </ul>
      </Callout>

      <h2 id="step-4-run-app">Step 4: Run the app</h2>
      <p>From the project directory:</p>
      <CodeBlock>{`kashvi serve`}</CodeBlock>
      <p>
        The CLI delegates to your project entrypoint (<code>go run . serve</code>
        ), so your own routes/migrations/seeders are used.
      </p>
      <p>Quick checks:</p>
      <CodeBlock>
        {`curl http://localhost:8080/health
kashvi route:list`}
      </CodeBlock>

      <h2 id="step-5-first-resource">Step 5: Add your first resource</h2>
      <CodeBlock>{`kashvi make:crud Post`}</CodeBlock>
      <p>
        This generates model/controller/service/migration/seeder/test-scenario
        files. Then:
      </p>
      <CodeBlock>
        {`kashvi migrate
kashvi serve`}
      </CodeBlock>
    </article>
  );
}

