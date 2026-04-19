import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "../_components/Callout";
import { CodeBlock } from "../_components/CodeBlock";
import { DocsPageHeader } from "../_components/DocsPageHeader";

export const metadata: Metadata = {
  title: "CLI Reference",
  description:
    "Kashvi CLI commands: install, project mode, server, database, scaffolding, workers.",
};

export default function CliReferencePage() {
  return (
    <article data-doc="true" className="docs-content">
      <DocsPageHeader
        id="cli-reference"
        eyebrow="Reference"
        title="CLI Reference"
        description={
          <>
            Commands match the{" "}
            <a
              href="https://github.com/shashiranjanraj/kashvi/tree/main/cmd/kashvi"
              target="_blank"
              rel="noreferrer"
            >
              kashvi
            </a>{" "}
            Cobra CLI. Install the binary with <code>go install</code> (see below).
          </>
        }
      />

      <h2 id="install">Install</h2>
      <CodeBlock language="bash">
        {`go install github.com/shashiranjanraj/kashvi/cmd/kashvi@latest`}
      </CodeBlock>

      <Callout type="note" title="Project mode vs framework development">
        <p className="!mt-0">
          When you run <code>kashvi</code> from <strong>your app directory</strong> (with a{" "}
          <code>go.mod</code>), runtime commands delegate to <code>go run . &lt;cmd&gt;</code> so your{" "}
          <code>main.go</code> (calling <code>app.Run()</code>) loads <strong>your</strong> migrations,
          seeders, and routes. Scaffolding commands (<code>kashvi new</code>, <code>kashvi make:*</code>)
          always run in the current directory and only create files.
        </p>
        <p className="!mb-0">
          A few commands are registered only when the CLI is run <strong>inside the Kashvi framework git
          clone</strong> (where <code>pkg/app/app.go</code> exists): <code>build</code>,{" "}
          <code>grpc:serve</code>, <code>queue:work</code>, and <code>schedule:run</code>. Use{" "}
          <code>go run . serve</code> / your binary for app lifecycle everywhere else.
        </p>
      </Callout>

      <h2 id="version">Version</h2>
      <h3 id="kashvi-version">
        <code>kashvi version</code>
      </h3>
      <p>Print the framework version (same string as <code>app.Version</code>).</p>
      <CodeBlock>{`kashvi version
# → Kashvi Framework v1.x.x`}</CodeBlock>

      <h2 id="server-commands">Server &amp; routes</h2>
      <p>
        In project mode these delegate to your app (same as <code>go run . serve</code>, etc.). Your{" "}
        <code>app.Run()</code> also accepts: <code>serve</code>, <code>start</code>, <code>run</code>,{" "}
        <code>migrate</code>, <code>seed</code>, <code>route:list</code>, <code>version</code>.
      </p>

      <h3 id="kashvi-run">
        <code>kashvi run</code> · <code>kashvi serve</code> · <code>kashvi start</code>
      </h3>
      <p>Start the HTTP server (and gRPC alongside HTTP per your app config). Aliases are equivalent.</p>
      <CodeBlock>
        {`kashvi serve
# → delegates to: go run . serve`}
      </CodeBlock>

      <h3 id="kashvi-route-list">
        <code>kashvi route:list</code>
      </h3>
      <p>Print all named routes in a sorted table (delegates to your project).</p>
      <CodeBlock>
        {`kashvi route:list

METHOD   PATH                         NAME
------   ----                         ----
DELETE   /api/posts/{id}              posts.destroy
GET      /api/health                  health
GET      /api/posts                   posts.index
GET      /api/posts/{id}              posts.show
POST     /api/posts                   posts.store
PUT      /api/posts/{id}              posts.update`}
      </CodeBlock>

      <h3 id="kashvi-build">
        <code>kashvi build</code> <span className="text-sm font-normal text-zinc-500">(framework clone only)</span>
      </h3>
      <p>
        Compiles the sample server in the framework repo to <code>./kashvi</code> via{" "}
        <code>go build -o kashvi ./cmd/server</code>. For your own project, use{" "}
        <code>go build -o myapp .</code> or your CI pipeline.
      </p>

      <h3 id="kashvi-grpc-serve">
        <code>kashvi grpc:serve</code> <span className="text-sm font-normal text-zinc-500">(framework clone only)</span>
      </h3>
      <p>Start only the gRPC server (health + reflection) using framework config. HTTP apps normally start gRPC with <code>serve</code>.</p>
      <CodeBlock>{`kashvi grpc:serve`}</CodeBlock>

      <h2 id="database-commands">Database</h2>

      <h3 id="kashvi-migrate">
        <code>kashvi migrate</code>
      </h3>
      <p>Run all pending migrations (delegates to your project).</p>
      <CodeBlock>
        {`kashvi migrate`}
      </CodeBlock>

      <h3 id="kashvi-migrate-rollback">
        <code>kashvi migrate:rollback</code>
      </h3>
      <p>Rollback the last batch of migrations.</p>

      <h3 id="kashvi-migrate-status">
        <code>kashvi migrate:status</code>
      </h3>
      <p>Show which migrations have been applied.</p>

      <h3 id="kashvi-seed">
        <code>kashvi seed</code>
      </h3>
      <p>Run registered seeders.</p>
      <CodeBlock>{`kashvi seed`}</CodeBlock>

      <h2 id="worker-commands">Workers &amp; scheduler</h2>
      <Callout type="caution" title="Framework repository only">
        <code>kashvi queue:work</code> and <code>kashvi schedule:run</code> are wired on the CLI only when
        you run the binary from a <strong>Kashvi framework</strong> checkout. In an application project,
        start workers in code with <code>queue.StartWorkers(ctx, n)</code> (see{" "}
        <Link href="/docs/queue">Queue &amp; Jobs</Link>) or a small <code>main</code> package that calls
        the same APIs.
      </Callout>

      <h3 id="kashvi-queue-work">
        <code>kashvi queue:work</code>
      </h3>
      <p>Start queue workers (<code>-w</code> / <code>--workers</code> flag, default 5).</p>
      <CodeBlock>
        {`kashvi queue:work
kashvi queue:work -w 10`}
      </CodeBlock>

      <h3 id="kashvi-schedule-run">
        <code>kashvi schedule:run</code>
      </h3>
      <p>Run the task scheduler until SIGINT/SIGTERM.</p>
      <CodeBlock>{`kashvi schedule:run`}</CodeBlock>

      <h2 id="project-scaffold">New project</h2>
      <h3 id="kashvi-new">
        <code>kashvi new [ProjectName]</code>
      </h3>
      <p>
        Creates a directory, runs <code>go mod init</code>, pulls Kashvi, and scaffolds{" "}
        <code>main.go</code>, <code>app/routes/api.go</code>, <code>api_test.go</code>, and{" "}
        <code>.env</code> files.
      </p>
      <CodeBlock language="bash">
        {`kashvi new myproject
cd myproject
kashvi serve`}
      </CodeBlock>

      <h2 id="scaffold-commands">Scaffold commands</h2>
      <p>
        Generators use embedded <code>text/template</code> stubs. They <strong>do not overwrite</strong>{" "}
        existing files. Override templates by placing files under <code>.kashvi/stubs/</code> (same names
        as in the framework: <code>model.stub</code>, <code>dto.stub</code>, <code>repository.stub</code>,{" "}
        <code>controller.stub</code>, <code>resource_controller.stub</code>, <code>service.stub</code>,{" "}
        <code>migration.stub</code>, <code>seeder.stub</code>, <code>test_scenario.stub</code>).
      </p>

      <h3 id="kashvi-make-resource">
        <code>kashvi make:resource [Name]</code> <span className="text-zinc-500">(alias: </span>
        <code className="text-zinc-500">make:crud</code>
        <span className="text-zinc-500">)</span>
      </h3>
      <p>Full CRUD stack in one command: model, DTOs, repository, controller, service, migration, seeder, test scenarios.</p>
      <CodeBlock>{`kashvi make:resource Post
kashvi make:crud Product --authorize --cache`}</CodeBlock>
      <p>Flags:</p>
      <ul>
        <li>
          <code>--authorize</code> — adds auth middleware placeholders in the printed route snippet and stubs.
        </li>
        <li>
          <code>--cache</code> — adds cache-related placeholders in generated controller code.
        </li>
      </ul>
      <p>Typical output paths for <code>Product</code>:</p>
      <ul>
        <li>
          <code>app/models/product.go</code>
        </li>
        <li>
          <code>app/dto/product_dto.go</code> (<code>CreateProductRequest</code>, <code>UpdateProductRequest</code>, …)
        </li>
        <li>
          <code>app/repositories/product.go</code>
        </li>
        <li>
          <code>app/controllers/product_controller.go</code>
        </li>
        <li>
          <code>app/services/product_service.go</code>
        </li>
        <li>
          <code>database/migrations/TIMESTAMP_create_products_table.go</code>
        </li>
        <li>
          <code>database/seeders/product_seeder.go</code>
        </li>
        <li>
          <code>testdata/product_scenarios.json</code>
        </li>
      </ul>

      <h3 id="kashvi-make-dto">
        <code>kashvi make:dto [Name]</code>
      </h3>
      <p>Request/response DTOs only — <code>app/dto/&lt;name&gt;_dto.go</code>.</p>
      <CodeBlock>{`kashvi make:dto Order`}</CodeBlock>

      <h3 id="kashvi-make-repository">
        <code>kashvi make:repository [Name]</code>
      </h3>
      <p>Repository embedding <code>repository.Base[T]</code> — <code>app/repositories/&lt;name&gt;.go</code>.</p>

      <h3 id="kashvi-make-model">
        <code>kashvi make:model [Name]</code>
      </h3>
      <CodeBlock>{`kashvi make:model Comment`}</CodeBlock>

      <h3 id="kashvi-make-controller">
        <code>kashvi make:controller [Name]</code>
      </h3>
      <CodeBlock>{`kashvi make:controller Comment`}</CodeBlock>

      <h3 id="kashvi-make-service">
        <code>kashvi make:service [Name]</code>
      </h3>
      <CodeBlock>{`kashvi make:service Billing`}</CodeBlock>

      <h3 id="kashvi-make-migration">
        <code>kashvi make:migration [name]</code>
      </h3>
      <p>Creates <code>database/migrations/&lt;timestamp&gt;_&lt;slug&gt;.go</code>.</p>

      <h3 id="kashvi-make-seeder">
        <code>kashvi make:seeder [Name]</code>
      </h3>
      <p>Creates <code>database/seeders/&lt;lower&gt;_seeder.go</code> (name lowercased).</p>

      <h2 id="tips">Discoverability</h2>
      <CodeBlock>
        {`kashvi --help
kashvi make:resource --help`}
      </CodeBlock>
    </article>
  );
}
