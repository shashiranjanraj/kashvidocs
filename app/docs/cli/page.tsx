import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "CLI Reference",
  description: "Kashvi CLI commands for server, database, workers, scaffolding.",
};

export default function CliReferencePage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="cli-reference">CLI Reference</h1>
      <p>
        All commands are run via the <code>kashvi</code> binary. Install with{" "}
        <code>make install</code>.
      </p>

      <h2 id="server-commands">Server Commands</h2>

      <h3 id="kashvi-run">
        <code>kashvi run</code>
      </h3>
      <p>
        Start the HTTP server (<code>serve</code> alias). In project mode this
        delegates to your app entrypoint (<code>go run . serve</code>).
      </p>
      <CodeBlock>
        {`kashvi run
# → 🚀 Kashvi running on :8080  [env: local]`}
      </CodeBlock>

      <h3 id="kashvi-serve">
        <code>kashvi serve</code>
      </h3>
      <p>
        Alias for <code>kashvi run</code>.
      </p>

      <h3 id="kashvi-build">
        <code>kashvi build</code>
      </h3>
      <p>Compile the server binary to <code>./kashvi</code>.</p>
      <CodeBlock>
        {`kashvi build
# → ✅ Built: ./kashvi`}
      </CodeBlock>

      <h3 id="kashvi-route-list">
        <code>kashvi route:list</code>
      </h3>
      <p>Print all named routes in a sorted table.</p>
      <CodeBlock>
        {`kashvi route:list

METHOD   PATH                         NAME
------   ----                         ----
DELETE   /api/posts/{id}              posts.destroy
GET      /api/health                  health
GET      /api/posts                   posts.index
GET      /api/posts/{id}              posts.show
GET      /api/profile                 auth.profile
POST     /api/login                   auth.login
POST     /api/posts                   posts.store
POST     /api/register                auth.register
PUT      /api/posts/{id}              posts.update`}
      </CodeBlock>

      <h2 id="database-commands">Database Commands</h2>

      <h3 id="kashvi-migrate">
        <code>kashvi migrate</code>
      </h3>
      <p>Run all pending migrations.</p>
      <CodeBlock>
        {`kashvi migrate
  ▶ Migrating: 20240101000000_create_users_table
  ✅ Migrated:  20240101000000_create_users_table
  ▶ Migrating: 20240102000000_create_posts_table
  ✅ Migrated:  20240102000000_create_posts_table`}
      </CodeBlock>

      <h3 id="kashvi-migrate-rollback">
        <code>kashvi migrate:rollback</code>
      </h3>
      <p>Rollback the last batch of migrations.</p>
      <CodeBlock>
        {`kashvi migrate:rollback
  ◀ Rolling back: 20240102000000_create_posts_table
  ✅ Rolled back:  20240102000000_create_posts_table`}
      </CodeBlock>

      <h3 id="kashvi-migrate-status">
        <code>kashvi migrate:status</code>
      </h3>
      <p>Show which migrations have been run.</p>
      <CodeBlock>
        {`kashvi migrate:status

Migration                                         Status    Batch
20240101000000_create_users_table                 Ran       1
20240102000000_create_posts_table                 Ran       1
20240103000000_add_role_to_users                  Pending   -`}
      </CodeBlock>

      <h3 id="kashvi-seed">
        <code>kashvi seed</code>
      </h3>
      <p>Run all database seeders.</p>
      <CodeBlock>{`kashvi seed`}</CodeBlock>

      <h2 id="worker-commands">Worker Commands</h2>

      <h3 id="kashvi-queue-work">
        <code>kashvi queue:work</code>
      </h3>
      <p>Start queue workers to process background jobs.</p>
      <CodeBlock>
        {`kashvi queue:work           # default: 5 workers
kashvi queue:work -w 10     # 10 workers`}
      </CodeBlock>
      <p>
        Workers run until SIGINT/SIGTERM, then finish the current job and exit.
      </p>

      <h3 id="kashvi-schedule-run">
        <code>kashvi schedule:run</code>
      </h3>
      <p>
        Start the task scheduler. Runs scheduled tasks at their configured
        times.
      </p>
      <CodeBlock>{`kashvi schedule:run`}</CodeBlock>

      <h2 id="scaffold-commands">Scaffold Commands</h2>
      <p>
        All scaffold commands create files in your project using a built-in{" "}
        <code>text/template</code> engine. They will not overwrite existing
        files.
      </p>

      <h3 id="template-overrides">Template Overrides</h3>
      <p>
        You can customize the boilerplates for all scaffolding commands by
        mirroring the framework&apos;s <code>.stub</code> files into your
        project&apos;s <code>.kashvi/stubs/</code> directory.
      </p>
      <CodeBlock>
        {`mkdir -p .kashvi/stubs
# create .kashvi/stubs/model.stub to override the default model template`}
      </CodeBlock>
      <p>
        Customizable stubs include: <code>model.stub</code>,{" "}
        <code>controller.stub</code>, <code>service.stub</code>,{" "}
        <code>migration.stub</code>, <code>seeder.stub</code>, and{" "}
        <code>test_scenario.stub</code>.
      </p>

      <h3 id="kashvi-make-resource">
        <code>kashvi make:resource [Name]</code> (alias: <code>make:crud</code>)
      </h3>
      <p>
        Most useful command. Scaffolds a complete CRUD resource in one shot.
      </p>
      <CodeBlock>{`kashvi make:crud Post --authorize --cache`}</CodeBlock>
      <p>Creates:</p>
      <ul>
        <li>
          <code>app/models/post.go</code>
        </li>
        <li>
          <code>app/controllers/post_controller.go</code> (full CRUD using{" "}
          <code>ctx.Context</code>)
        </li>
        <li>
          <code>app/services/post_service.go</code>
        </li>
        <li>
          <code>database/migrations/TIMESTAMP_create_posts_table.go</code>
        </li>
        <li>
          <code>database/seeders/post_seeder.go</code>
        </li>
        <li>
          <code>testdata/post_scenarios.json</code> (Automated API tests)
        </li>
      </ul>
      <p>Flags:</p>
      <ul>
        <li>
          <code>--authorize</code>: injects auth middleware placeholder and JWT
          header placeholders into scenarios.
        </li>
        <li>
          <code>--cache</code>: adds cache template placeholders in generated
          controller methods.
        </li>
      </ul>

      <h3 id="kashvi-make-model">
        <code>kashvi make:model [Name]</code>
      </h3>
      <p>Scaffold a GORM model.</p>
      <CodeBlock>
        {`kashvi make:model Comment
# Creates: app/models/comment.go`}
      </CodeBlock>

      <h3 id="kashvi-make-controller">
        <code>kashvi make:controller [Name]</code>
      </h3>
      <p>Scaffold a basic controller.</p>
      <CodeBlock>
        {`kashvi make:controller Comment
# Creates: app/controllers/comment.go`}
      </CodeBlock>

      <h3 id="kashvi-make-service">
        <code>kashvi make:service [Name]</code>
      </h3>
      <p>Scaffold a service layer struct.</p>
      <CodeBlock>
        {`kashvi make:service BillingService
# Creates: app/services/billingservice.go`}
      </CodeBlock>

      <h3 id="kashvi-make-migration">
        <code>kashvi make:migration [name]</code>
      </h3>
      <p>Create a new migration file with a timestamp prefix.</p>
      <CodeBlock>
        {`kashvi make:migration "add tags to posts"
# Creates: database/migrations/20260221170000_add_tags_to_posts.go`}
      </CodeBlock>

      <h3 id="kashvi-make-seeder">
        <code>kashvi make:seeder [Name]</code>
      </h3>
      <p>Scaffold a seeder function.</p>
      <CodeBlock>
        {`kashvi make:seeder PostSeeder
# Creates: database/seeders/postseeder.go (name is lowercased)`}
      </CodeBlock>

      <h2 id="tips">Tips</h2>
      <CodeBlock>
        {`# See all available commands
kashvi --help

# See help for a specific command
kashvi make:resource --help
kashvi queue:work --help`}
      </CodeBlock>
    </article>
  );
}

