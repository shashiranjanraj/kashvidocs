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
        This guide covers a full Create/Read/Update/Delete flow using Kashvi
        generators and runtime commands. No advanced features (like WebSockets or gRPC) here—just standard, clean
        RESTful architecture.
      </p>

      <h2 id="create-project">Step 1: Create the Project</h2>
      <p>
        First, scaffold a fresh project. This creates a ready-to-use folder
        structure for you.
      </p>
      <CodeBlock>
        {`kashvi new my-api\ncd my-api`}
      </CodeBlock>
      <p>
        This command generates your <code>main.go</code>, <code>app/</code>{" "}
        folder for logic, <code>database/</code> for schemas, and a{" "}
        <code>.env</code> file pre-configured for SQLite.
      </p>

      <h2 id="scaffold-resource">Step 2: Generate the Resource</h2>
      <CodeBlock>{`kashvi make:resource User`}</CodeBlock>
      <p>This creates:</p>
      <ul>
        <li><code>app/models/user.go</code> - User model</li>
        <li><code>app/controllers/user_controller.go</code> - CRUD controller</li>
        <li><code>app/services/user_service.go</code> - Business logic service</li>
        <li><code>database/migrations/&lt;timestamp&gt;_create_users_table.go</code> - Migration</li>
        <li><code>database/seeders/user_seeder.go</code> - Database seeder</li>
        <li><code>testdata/user_scenarios.json</code> - Test scenarios</li>
      </ul>

      <h2 id="customize-model">Step 3: Customize the Model</h2>
      <p>Edit <code>app/models/user.go</code> to add validation rules and exact DB columns:</p>
      <CodeBlock>{`package models

import "gorm.io/gorm"

type User struct {
    gorm.Model
    Name  string \`json:"name" gorm:"not null"\`
    Email string \`json:"email" gorm:"unique;not null"\`
}`}</CodeBlock>

      <h2 id="define-migration">Step 4: Define the Migration</h2>
      <p>Edit <code>database/migrations/&lt;timestamp&gt;_create_users_table.go</code>:</p>
      <CodeBlock>{`package migrations

import (
    "github.com/shashiranjanraj/kashvi/app/models"
    "gorm.io/gorm"
)

type CreateUsersTable struct{}

func (m *CreateUsersTable) Up(db *gorm.DB) error {
    return db.AutoMigrate(&models.User{})
}

func (m *CreateUsersTable) Down(db *gorm.DB) error {
    return db.Migrator().DropTable("users")
}`}</CodeBlock>

      <h2 id="update-controller">Step 5: Write the Controller Logic</h2>
      <p>Edit <code>app/controllers/user_controller.go</code>:</p>
      <CodeBlock>{`package controllers

import (
    "github.com/shashiranjanraj/kashvi/pkg/ctx"
    "my-api/app/models"
    "my-api/database" 
    "net/http"
)

func (c *UserController) Index(ctx *ctx.Context) {
    var users []models.User
    database.DB.Find(&users)
    ctx.Success(users)
}

func (c *UserController) Store(ctx *ctx.Context) {
    var input struct {
        Name  string \`json:"name" validate:"required,min=2"\`
        Email string \`json:"email" validate:"required,email"\`
    }
    
    if !ctx.BindJSON(&input) {
        return
    }
    
    user := &models.User{Name: input.Name, Email: input.Email}
    if err := database.DB.Create(user).Error; err != nil {
        ctx.Error(http.StatusBadRequest, "Failed to create user")
        return
    }
    
    ctx.Created(user)
}

func (c *UserController) Show(ctx *ctx.Context) {
    id := ctx.Param("id")
    var user models.User
    
    if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
        ctx.Error(http.StatusNotFound, "User not found")
        return
    }
    
    ctx.Success(user)
}

func (c *UserController) Update(ctx *ctx.Context) {
    id := ctx.Param("id")
    var user models.User
    
    if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
        ctx.Error(http.StatusNotFound, "User not found")
        return
    }
    
    var input struct {
        Name  string \`json:"name"\`
        Email string \`json:"email"\`
    }
    
    if !ctx.BindJSON(&input) {
        return
    }
    
    user.Name = input.Name
    user.Email = input.Email
    
    if err := database.DB.Save(&user).Error; err != nil {
        ctx.Error(http.StatusBadRequest, "Failed to update user")
        return
    }
    
    ctx.Success(user)
}

func (c *UserController) Destroy(ctx *ctx.Context) {
    id := ctx.Param("id")
    
    if err := database.DB.Where("id = ?", id).Delete(&models.User{}).Error; err != nil {
        ctx.Error(http.StatusInternalServerError, "Failed to delete user")
        return
    }
    
    ctx.Status(http.StatusNoContent)
}`}</CodeBlock>

      <h2 id="register-routes">Step 6: Register Routes</h2>
      <p>Add to your routes in <code>app/routes/api.go</code>:</p>
      <CodeBlock>{`import "my-api/app/controllers"

func RegisterAPI(r *router.Router) {
    api := r.Group("/api")

    ctrl := controllers.NewUserController()
    api.Get("/users", "users.index", ctx.Wrap(ctrl.Index))
    api.Post("/users", "users.store", ctx.Wrap(ctrl.Store))
    api.Get("/users/{id}", "users.show", ctx.Wrap(ctrl.Show))
    api.Put("/users/{id}", "users.update", ctx.Wrap(ctrl.Update))
    api.Delete("/users/{id}", "users.destroy", ctx.Wrap(ctrl.Destroy))
}`}</CodeBlock>

      <h2 id="run-migrations-test">Step 7: Run Migrations and Test</h2>
      <CodeBlock>{`kashvi migrate
kashvi serve`}</CodeBlock>

      <p>Test the API:</p>

      <h3 id="create">Create</h3>
      <CodeBlock>{`curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Rahul","email":"rahul@example.com"}'`}</CodeBlock>

      <h3 id="list">List</h3>
      <CodeBlock>{`curl http://localhost:8080/api/users`}</CodeBlock>

      <h3 id="show">Show</h3>
      <CodeBlock>{`curl http://localhost:8080/api/users/1`}</CodeBlock>

      <h3 id="update">Update</h3>
      <CodeBlock>{`curl -X PUT http://localhost:8080/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Rahul Raj","email":"rahul.raj@example.com"}'`}</CodeBlock>

      <h3 id="delete">Delete</h3>
      <CodeBlock>{`curl -X DELETE http://localhost:8080/api/users/1`}</CodeBlock>

      <h2 id="next-improvements">8. Next improvements</h2>
      <ol>
        <li>Replace anonymous structs in controller methods with typed DTOs.</li>
        <li>Move DB logic into <code>app/services/user_service.go</code> to keep controllers thin.</li>
        <li>Add middleware (Auth, rate-limit, role checks) to the route group.</li>
        <li>Add queue jobs for side effects (e.g. sending a welcome email).</li>
      </ol>
    </article>
  );
}
