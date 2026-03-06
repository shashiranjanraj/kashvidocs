import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "User CRUD API (5 Minutes)",
  description: "Build a user CRUD API with validation in Kashvi.",
};

export default function UserCrudPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="user-crud-api">Building a User CRUD API in Kashvi (5 Minutes)</h1>
      <p>
        Welcome to Kashvi! If you&apos;re a fresher or transitioning from
        PHP/Laravel, you&apos;ll feel right at home. We&apos;re going to build a
        fully functional <code>User</code> API in just a few minutes.
      </p>
      <p>
        No advanced features (like WebSockets or gRPC) here—just standard, clean
        RESTful architecture.
      </p>

      <h2 id="create-project">1. Create the Project</h2>
      <p>
        First, scaffold a fresh project. This creates a ready-to-use folder
        structure for you.
      </p>
      <CodeBlock>
        {`kashvi new my-api
cd my-api`}
      </CodeBlock>
      <p>
        This command generates your <code>main.go</code>, <code>app/</code>{" "}
        folder for logic, <code>database/</code> for schemas, and a{" "}
        <code>.env</code> file pre-configured for SQLite.
      </p>

      <h2 id="generate-resource">2. Generate the Resource</h2>
      <p>
        We need a Model (to represent the user), a Controller (to handle HTTP
        requests), a Migration (to create the database table), and a Seeder (to
        add dummy data).
      </p>
      <p>Instead of creating these manually, Kashvi&apos;s CLI does it in one command:</p>
      <CodeBlock>{`kashvi make:resource User`}</CodeBlock>
      <ul>
        <li>
          <code>app/models/user.go</code>: Your data structure.
        </li>
        <li>
          <code>app/controllers/user_controller.go</code>: Where your API logic
          lives.
        </li>
        <li>
          <code>database/migrations/xxxx_create_users_table.go</code>:
          Instructions for creating the database table.
        </li>
        <li>
          <code>database/seeders/user_seeder.go</code>: A place to create fake
          users for testing.
        </li>
      </ul>

      <h2 id="define-table">3. Define the Database Table</h2>
      <p>
        Open the newly generated migration file inside the{" "}
        <code>database/migrations/</code> folder and add <code>name</code> and{" "}
        <code>email</code> columns.
      </p>
      <CodeBlock title="database/migrations/xxxx_create_users_table.go">
        {`func (m *Migration) Up() {
    table := m.CreateTable("users")
    table.String("name").NotNull()
    table.String("email").Unique().NotNull()
}`}
      </CodeBlock>
      <p>Run the migration to create the table in SQLite:</p>
      <CodeBlock>{`kashvi migrate`}</CodeBlock>

      <h2 id="controller-logic">4. Write the Controller Logic</h2>
      <p>
        Open <code>app/controllers/user_controller.go</code> and implement{" "}
        <code>Store</code>. Kashvi has built-in JSON validation—missing fields
        will automatically return a <code>422</code>.
      </p>
      <CodeBlock title="app/controllers/user_controller.go">
        {`package controllers

import (
    "github.com/shashiranjanraj/kashvi/pkg/ctx"
    "my-api/app/models"
    "my-api/database" // Assuming you export your db connection here
)

func (c *UserController) Store(ctx *ctx.Context) {
    var input struct {
        Name  string \`json:"name" validate:"required,min=2"\`
        Email string \`json:"email" validate:"required,email"\`
    }

    if !ctx.BindJSON(&input) {
        return
    }

    user := models.User{Name: input.Name, Email: input.Email}
    database.DB.Create(&user)

    ctx.Created(user)
}`}
      </CodeBlock>

      <h2 id="register-route">5. Register the Route</h2>
      <p>
        Map a URL (like <code>POST /api/users</code>) to the controller. Add this
        inside your route registration function.
      </p>
      <CodeBlock title="app/routes/api.go">
        {`import "my-api/app/controllers"

func RegisterAPI(r *router.Router) {
    api := r.Group("/api")

    userCtrl := controllers.NewUserController()
    api.Post("/users", "users.store", ctx.Wrap(userCtrl.Store))
}`}
      </CodeBlock>

      <h2 id="run-server">6. Run the Server</h2>
      <CodeBlock>{`kashvi serve`}</CodeBlock>

      <h2 id="test-it-out">7. Test It Out</h2>
      <p>Create a user:</p>
      <CodeBlock>
        {`curl -X POST http://localhost:8080/api/users \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Rahul", "email": "rahul@example.com"}'`}
      </CodeBlock>
      <p>Success response:</p>
      <CodeBlock>
        {`{
  "name": "Rahul",
  "email": "rahul@example.com"
}`}
      </CodeBlock>
      <p>Validation test (missing email):</p>
      <CodeBlock>
        {`curl -X POST http://localhost:8080/api/users \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Rahul"}'`}
      </CodeBlock>
      <p>Error response:</p>
      <CodeBlock>
        {`{
  "error": "validation failed",
  "details": {
    "email": "email is required"
  }
}`}
      </CodeBlock>
    </article>
  );
}

