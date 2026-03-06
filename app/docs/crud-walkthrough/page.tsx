import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "CRUD Walkthrough",
  description: "A full create/read/update/delete flow in Kashvi.",
};

export default function CrudWalkthroughPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="crud-walkthrough">CRUD Walkthrough</h1>
      <p>
        This guide covers a full Create/Read/Update/Delete flow using Kashvi
        generators and runtime commands.
      </p>

      <h2 id="scaffold-resource">1. Scaffold a resource</h2>
      <p>Generate all CRUD files:</p>
      <CodeBlock>{`kashvi make:crud Post`}</CodeBlock>
      <p>You can also use flags:</p>
      <CodeBlock>{`kashvi make:crud Post --authorize --cache`}</CodeBlock>
      <ul>
        <li>
          <code>--authorize</code>: route snippet printed by CLI includes an auth
          middleware placeholder.
        </li>
        <li>
          <code>--cache</code>: generated controller includes cache placeholders
          in <code>Index</code> and <code>Show</code>.
        </li>
      </ul>

      <h2 id="generated-files">2. Generated files</h2>
      <p>For <code>Post</code>, Kashvi creates:</p>
      <ul>
        <li>
          <code>app/models/post.go</code>
        </li>
        <li>
          <code>app/controllers/post_controller.go</code>
        </li>
        <li>
          <code>app/services/post_service.go</code>
        </li>
        <li>
          <code>database/migrations/&lt;timestamp&gt;_create_posts_table.go</code>
        </li>
        <li>
          <code>database/seeders/post_seeder.go</code>
        </li>
        <li>
          <code>testdata/post_scenarios.json</code>
        </li>
      </ul>

      <h2 id="register-routes">3. Register routes</h2>
      <p>The generator prints lines to paste into your route setup. Typical wiring:</p>
      <CodeBlock>
        {`package routes

import (
	"github.com/your-org/your-app/app/controllers"
	appctx "github.com/shashiranjanraj/kashvi/pkg/ctx"
	"github.com/shashiranjanraj/kashvi/pkg/router"
)

func RegisterAPI(r *router.Router) {
	api := r.Group("/api")

	ctrl := controllers.NewPostController()
	api.Get("/posts", "posts.index", appctx.Wrap(ctrl.Index))
	api.Post("/posts", "posts.store", appctx.Wrap(ctrl.Store))
	api.Get("/posts/{id}", "posts.show", appctx.Wrap(ctrl.Show))
	api.Put("/posts/{id}", "posts.update", appctx.Wrap(ctrl.Update))
	api.Delete("/posts/{id}", "posts.destroy", appctx.Wrap(ctrl.Destroy))
}`}
      </CodeBlock>
      <p>Ensure the route function is attached in <code>main.go</code>:</p>
      <CodeBlock>
        {`app.New().
	Routes(routes.RegisterAPI).
	Run()`}
      </CodeBlock>

      <h2 id="implement-migration">4. Implement migration</h2>
      <p>
        The generated migration registers automatically, but <code>Up</code> and{" "}
        <code>Down</code> are placeholders. Fill them:
      </p>
      <CodeBlock>
        {`func (m *M_20260301010101_create_posts_table) Up(db *gorm.DB) error {
	type Post struct {
		gorm.Model
		Title string
		Body  string
	}
	return db.AutoMigrate(&Post{})
}

func (m *M_20260301010101_create_posts_table) Down(db *gorm.DB) error {
	return db.Migrator().DropTable("posts")
}`}
      </CodeBlock>
      <p>Run migration:</p>
      <CodeBlock>{`kashvi migrate`}</CodeBlock>
      <p>Inspect migration state:</p>
      <CodeBlock>{`kashvi migrate:status`}</CodeBlock>

      <h2 id="run-and-test">5. Run and test endpoints</h2>
      <p>Start server:</p>
      <CodeBlock>{`kashvi serve`}</CodeBlock>

      <h3 id="create">Create</h3>
      <CodeBlock>
        {`curl -X POST http://localhost:8080/api/posts \\
  -H 'Content-Type: application/json' \\
  -d '{}'`}
      </CodeBlock>

      <h3 id="list">List</h3>
      <CodeBlock>{`curl http://localhost:8080/api/posts`}</CodeBlock>

      <h3 id="show">Show</h3>
      <CodeBlock>{`curl http://localhost:8080/api/posts/1`}</CodeBlock>

      <h3 id="update">Update</h3>
      <CodeBlock>
        {`curl -X PUT http://localhost:8080/api/posts/1 \\
  -H 'Content-Type: application/json' \\
  -d '{}'`}
      </CodeBlock>

      <h3 id="delete">Delete</h3>
      <CodeBlock>
        {`curl -X DELETE http://localhost:8080/api/posts/1 -i`}
      </CodeBlock>
      <p>The generated <code>Destroy</code> handler returns <code>204 No Content</code>.</p>

      <h2 id="generated-test-scenarios">6. Use generated test scenarios</h2>
      <p>
        <code>kashvi make:crud</code> creates <code>testdata/post_scenarios.json</code>.
        You can feed these scenarios into your <code>pkg/testkit</code> test runner and
        keep them as executable API documentation.
      </p>
      <p>
        If you used <code>--authorize</code>, scenario entries include an{" "}
        <code>Authorization</code> header placeholder (<code>Bearer dummy-jwt-token</code>).
      </p>

      <h2 id="next-improvements">7. Next improvements</h2>
      <ol>
        <li>
          Replace empty request structs in controller methods with typed DTOs + validation tags.
        </li>
        <li>Move DB logic into <code>app/services/post_service.go</code> and keep controllers thin.</li>
        <li>Add middleware (Auth, rate-limit, role checks) per route group.</li>
        <li>Add pagination in <code>Index</code> using <code>pkg/orm</code> pagination helpers.</li>
        <li>Add queue jobs for side effects (notifications, emails, analytics writes).</li>
      </ol>
    </article>
  );
}

