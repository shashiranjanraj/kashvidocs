import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "../_components/CodeBlock";
import { Callout } from "../_components/Callout";
import { DocsPageHeader } from "../_components/DocsPageHeader";
import { FileTree } from "../_components/FileTree";

/* ─── inline code snippets ───────────────────────────── */

const productModelExample = `package models

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Name        string  \`json:"name"        gorm:"not null"              validate:"required,min=1,max=255"\`
    Description string  \`json:"description"\`
    Price       float64 \`json:"price"        gorm:"not null"              validate:"required,gte=0"\`
    SKU         string  \`json:"sku"         gorm:"uniqueIndex;not null"   validate:"required"\`
}
`;

const repoFindBySKUExample = `// Optional: add custom queries
func (r *ProductRepository) FindBySKU(sku string) (*models.Product, error) {
    var p models.Product
    err := r.Query().Where("sku = ?", sku).First(&p)
    if err != nil {
        return nil, err
    }
    return &p, nil
}
`;

const productServiceExample = `func (s *ProductService) CreateProduct(input *models.Product) error {
    if err := s.repo.Create(input); err != nil {
        return err
    }
    // e.g. logger.Info("product_created", "id", input.ID)
    return nil
}
`;

const controllerStoreExample = `import "github.com/shashiranjanraj/kashvi/pkg/logger"

func (c *ProductController) Store(ctx *appctx.Context) {
    var input dto.CreateProductRequest
    if !ctx.BindJSON(&input) {
        return // BindJSON already sent 422 + validation errors
    }
    model := &models.Product{
        Name: input.Name, Description: input.Description, Price: input.Price, SKU: input.SKU,
    }
    if err := c.repo.Create(model); err != nil {
        ctx.Error(http.StatusBadRequest, "Failed to create product")
        return
    }
    log := logger.WithCtx(ctx.R.Context())
    log.Info("product_created", "id", model.ID, "sku", model.SKU)
    ctx.Created(model)
}
`;

const routesExample = `repo := repositories.NewProductRepository()
svc := services.NewProductService(repo)
ctrl := controllers.NewProductController(repo)

api := r.Group("/api")

// Public
api.Get("/products", "products.index", ctx.Wrap(ctrl.Index))
api.Get("/products/{id}", "products.show", ctx.Wrap(ctrl.Show))

// Protected (JWT required). Import: "github.com/shashiranjanraj/kashvi/pkg/middleware"
protected := api.Group("", middleware.AuthMiddleware)
protected.Post("/products", "products.store", ctx.Wrap(ctrl.Store))
protected.Put("/products/{id}", "products.update", ctx.Wrap(ctrl.Update))
protected.Delete("/products/{id}", "products.destroy", ctx.Wrap(ctrl.Destroy))`;

const seederExample = `func init() {
    app.RegisterSeeder("products", func() {
        database.DB.Create(&[]models.Product{
            {Name: "Laptop", Description: "Gaming", Price: 999.99, SKU: "LAPTOP001"},
            {Name: "Mouse", Description: "Wireless", Price: 29.99, SKU: "MOUSE001"},
        })
    })
}
`;

const testExample = `func TestProductAPI(t *testing.T) {
    handler := app.New().
        Routes(RegisterRoutes).
        Handler()
    testkit.RunDir(t, handler, "testdata")
}
`;

/* ─── generated file tree ────────────────────────────── */
const generatedFiles = [
  {
    name: "app/",
    isDir: true,
    children: [
      {
        name: "models/",
        isDir: true,
        children: [
          {
            name: "product.go",
            highlight: true,
            description: "Product struct with gorm/json/validate tags",
          },
        ],
      },
      {
        name: "dto/",
        isDir: true,
        children: [
          {
            name: "product_dto.go",
            highlight: true,
            description: "CreateProductRequest, UpdateProductRequest",
          },
        ],
      },
      {
        name: "repositories/",
        isDir: true,
        children: [
          {
            name: "product.go",
            highlight: true,
            description: "FindByID, All, Create, Update, Delete, Query",
          },
        ],
      },
      {
        name: "services/",
        isDir: true,
        children: [
          {
            name: "product_service.go",
            highlight: true,
            description: "Business logic (optional)",
          },
        ],
      },
      {
        name: "controllers/",
        isDir: true,
        children: [
          {
            name: "product_controller.go",
            highlight: true,
            description: "HTTP handlers using repository + DTOs",
          },
        ],
      },
    ],
  },
  {
    name: "database/",
    isDir: true,
    children: [
      {
        name: "migrations/",
        isDir: true,
        children: [
          {
            name: "..._create_products_table.go",
            highlight: true,
            description: "AutoMigrate up, DropTable down",
          },
        ],
      },
      {
        name: "seeders/",
        isDir: true,
        children: [
          {
            name: "product_seeder.go",
            highlight: true,
            description: "Sample data via app.RegisterSeeder",
          },
        ],
      },
    ],
  },
  {
    name: "testdata/",
    isDir: true,
    children: [
      {
        name: "product_scenarios.json",
        highlight: true,
        description: "JSON test scenarios: list, create, get, update, delete",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Complete CRUD Walkthrough (Product API)",
  description:
    "Build a full Product API with model, migration, repository, service, controller, validation, auth, seeder, and tests.",
};

export default function UserCrudPage() {
  return (
    <article data-doc="true" className="docs-content">
      <DocsPageHeader
        id="complete-crud-walkthrough"
        eyebrow="Guide"
        title="Complete CRUD Walkthrough"
        description="Build a Product API end-to-end: model → DTO → migration → repository → service → controller → auth → seed → test. Follow along step by step or jump to the section you need."
      />

      {/* ── What we're building ───────────────────── */}
      <h2 id="what-we-are-building">What we&apos;re building</h2>
      <p>
        By the end of this guide you will have a working REST API for managing
        products, with these endpoints:
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-2 font-semibold">Method</th>
              <th className="text-left px-4 py-2 font-semibold">Endpoint</th>
              <th className="text-left px-4 py-2 font-semibold">Auth?</th>
              <th className="text-left px-4 py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <span className="badge badge-blue">GET</span>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <code>/api/products</code>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                No
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                List all products
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <span className="badge badge-blue">GET</span>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <code>/api/products/{"{id}"}</code>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                No
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                Get one product
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <span className="badge badge-green">POST</span>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <code>/api/products</code>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                JWT
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                Create a product
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <span className="badge badge-amber">PUT</span>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <code>/api/products/{"{id}"}</code>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                JWT
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                Update a product
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <span className="badge badge-purple">DELETE</span>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                <code>/api/products/{"{id}"}</code>
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                JWT
              </td>
              <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                Delete a product
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── How the layers fit together ───────────── */}
      <h2 id="architecture">How the layers fit together</h2>
      <p>
        Kashvi follows MVC with an extra <strong>Repository</strong> layer to
        keep all database calls in one place. Here is the flow for a{" "}
        <code>POST /api/products</code> request:
      </p>
      <pre className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 p-5 text-sm font-mono overflow-x-auto leading-7">
{`HTTP Request  →  Router  →  Middleware (JWT, Logger)
                               ↓
                         Controller
                           • ctx.BindJSON(&dto)   ← parse + validate body
                           • repo.Create(&model)  ← call repository
                           • ctx.Created(model)   ← send 201 JSON response
                               ↓
                         Repository
                           • orm.DB().Create(...)  ← the ONLY place that
                                                      touches the database
                               ↓
                           Database (SQLite / MySQL / PostgreSQL)`}
      </pre>
      <Callout type="note" title="Why not call the database directly in the controller?">
        Keeping DB calls in the <strong>Repository</strong> means your
        controller is easier to test (you can mock the repository), and
        switching databases later only requires changes in one place.
      </Callout>

      {/* ── Step 1: Generate ─────────────────────── */}
      <h2 id="step-1-generate">Step 1 — Generate the resource</h2>
      <p>
        From your project root (where <code>go.mod</code> lives), run one
        command to scaffold every file you need:
      </p>
      <CodeBlock language="bash">{`kashvi make:resource Product`}</CodeBlock>

      <p>
        The CLI prints the exact route snippet to paste into your routes file,
        and creates the following files:
      </p>

      <FileTree
        items={generatedFiles}
        caption="All highlighted files are generated automatically — you only need to edit them to add your fields and business logic."
      />

      <Callout type="tip" title="Need only some pieces?">
        You can generate them individually:{" "}
        <code>kashvi make:model Product</code>,{" "}
        <code>kashvi make:controller Product</code>,{" "}
        <code>kashvi make:dto Product</code>, etc.
      </Callout>

      {/* ── Step 2: Model ────────────────────────── */}
      <h2 id="step-2-model">Step 2 — Define the model</h2>
      <p>
        Edit <code>app/models/product.go</code>. Add your fields with{" "}
        <strong>gorm</strong>, <strong>json</strong>, and{" "}
        <strong>validate</strong> tags. The <code>validate</code> tags are read
        automatically by <code>ctx.BindJSON</code> — no extra code needed.
      </p>
      <CodeBlock title="app/models/product.go" language="go">
        {productModelExample}
      </CodeBlock>
      <p>
        Common validate rules: <code>required</code>, <code>email</code>,{" "}
        <code>min</code>, <code>max</code>, <code>gte</code>, <code>lte</code>,{" "}
        <code>in</code>, <code>url</code>. A failed rule returns{" "}
        <code>422 Unprocessable Entity</code> with field-level errors — your
        controller does not need to handle it.
      </p>

      {/* ── Step 3: Migration ────────────────────── */}
      <h2 id="step-3-migration">Step 3 — Run the migration</h2>
      <p>
        The generated migration file at{" "}
        <code>database/migrations/..._create_products_table.go</code> already
        contains:
      </p>
      <ul>
        <li>
          <strong>Up:</strong> <code>db.AutoMigrate(&amp;models.Product{})</code>{" "}
          — creates or updates the <code>products</code> table to match your
          model struct.
        </li>
        <li>
          <strong>Down:</strong>{" "}
          <code>db.Migrator().DropTable(&quot;products&quot;)</code> — removes
          the table on rollback.
        </li>
      </ul>
      <p>
        Imports use your module path from <code>go.mod</code>. You only need
        to edit the migration file if you want to add custom SQL indexes or
        constraints beyond what GORM handles automatically.
      </p>
      <CodeBlock language="bash">{`kashvi migrate`}</CodeBlock>

      {/* ── Step 4: Repository ───────────────────── */}
      <h2 id="step-4-repository">Step 4 — Repository (data layer)</h2>
      <p>
        The generated <code>app/repositories/product.go</code> embeds{" "}
        <code>repository.Base[models.Product]</code> and gives you these
        methods for free:
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-2 font-semibold">Method</th>
              <th className="text-left px-4 py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["FindByID(id uint)", "Fetch one record by primary key"],
              ["All()", "Fetch all records"],
              ["Create(m *Product)", "Insert a new record"],
              ["Update(m *Product)", "Save changes to an existing record"],
              ["Delete(id uint)", "Soft-delete by primary key"],
              [
                "Query()",
                "Raw GORM chain for custom filters, pagination, joins",
              ],
            ].map(([method, desc]) => (
              <tr key={method}>
                <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                  <code>{method}</code>
                </td>
                <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                  {desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        No changes needed for basic CRUD. To add a custom query, add a method
        to this file:
      </p>
      <CodeBlock
        title="app/repositories/product.go — custom method"
        language="go"
      >
        {repoFindBySKUExample}
      </CodeBlock>
      <Callout type="caution" title="Keep ALL database calls in the repository">
        Never call <code>orm.DB()</code> directly from a controller or
        service. This ensures your controllers stay testable and your data
        access stays in one predictable place.
      </Callout>

      {/* ── Step 5: Service ──────────────────────── */}
      <h2 id="step-5-service">Step 5 — Service (optional)</h2>
      <p>
        The service layer is <strong>optional for simple CRUD</strong>. Use it
        when you have business logic that spans multiple repositories, sends
        emails, publishes queue jobs, etc. The generated service already holds
        a repository reference:
      </p>
      <CodeBlock title="app/services/product_service.go" language="go">
        {productServiceExample}
      </CodeBlock>
      <p>
        For simple CRUD, the controller can call the repository directly and
        you can skip the service entirely.
      </p>

      {/* ── Step 6: DTOs ─────────────────────────── */}
      <h2 id="step-6-dto">Step 6 — DTOs (request / response)</h2>
      <p>
        The generated <code>app/dto/product_dto.go</code> holds:
      </p>
      <ul>
        <li>
          <strong>CreateProductRequest</strong> — all required fields with
          validate tags
        </li>
        <li>
          <strong>UpdateProductRequest</strong> — same fields as pointers (so
          partial updates work; a missing field means &quot;don&apos;t change
          it&quot;)
        </li>
        <li>
          <strong>ProductResponse</strong> (optional) — a safe shape to return
          to API clients, hiding internal fields
        </li>
      </ul>
      <p>
        Controllers bind the request body to these structs with{" "}
        <code>ctx.BindJSON</code> so validation runs before the model is
        touched. To generate DTOs without a full resource:{" "}
        <code>kashvi make:dto Product</code>.
      </p>

      {/* ── Step 7: Controller ───────────────────── */}
      <h2 id="step-7-controller">Step 7 — Controller and validation</h2>
      <p>
        The generated controller uses the <strong>repository</strong> and{" "}
        <strong>DTOs</strong> — there is no <code>orm</code> import in
        the controller file. Each handler follows the same pattern:
      </p>
      <ul>
        <li>
          <strong>Store:</strong> binds JSON to{" "}
          <code>dto.CreateProductRequest</code>, then maps into{" "}
          <code>models.Product</code> and calls <code>repo.Create</code>.
        </li>
        <li>
          <strong>Update:</strong> loads by ID via repo, binds{" "}
          <code>dto.UpdateProductRequest</code>, applies pointer fields, then{" "}
          <code>repo.Update</code>.
        </li>
        <li>
          <strong>Index / Show / Destroy:</strong> call <code>repo.All()</code>
          , <code>repo.FindByID</code>, <code>repo.Delete</code>.
        </li>
      </ul>
      <p>
        To add <strong>logging</strong> (recommended for create/update/delete):
      </p>
      <CodeBlock title="app/controllers/product_controller.go — Store" language="go">
        {controllerStoreExample}
      </CodeBlock>

      {/* ── Step 8: Routes ───────────────────────── */}
      <h2 id="step-8-routes">Step 8 — Routes and authentication</h2>
      <p>
        Register routes in <code>main.go</code> or{" "}
        <code>app/routes/api.go</code>. The CLI printed the exact snippet when
        you ran <code>kashvi make:resource</code> — paste it here:
      </p>
      <CodeBlock title="app/routes/api.go" language="go">
        {routesExample}
      </CodeBlock>
      <Callout type="note" title="How JWT auth works">
        <code>middleware.AuthMiddleware</code> validates the{" "}
        <code>Authorization: Bearer &lt;token&gt;</code> header. If the token
        is missing or invalid the request is rejected with{" "}
        <code>401 Unauthorized</code> before reaching your controller. Inside
        handlers you can read the current user with{" "}
        <code>middleware.UserIDFromCtx(r)</code> or{" "}
        <code>middleware.RoleFromCtx(r)</code>.
      </Callout>

      {/* ── Step 9: Seeder ───────────────────────── */}
      <h2 id="step-9-seeder">Step 9 — Seed sample data</h2>
      <p>
        Edit <code>database/seeders/product_seeder.go</code> and add some
        sample rows:
      </p>
      <CodeBlock title="database/seeders/product_seeder.go" language="go">
        {seederExample}
      </CodeBlock>
      <p>
        Ensure migrations and seeders are registered in <code>main.go</code>{" "}
        via blank imports:
      </p>
      <CodeBlock title="main.go — blank imports" language="go">
        {`import (
    _ "yourmodule/database/migrations"
    _ "yourmodule/database/seeders"
)`}
      </CodeBlock>

      {/* ── Step 10: Run ─────────────────────────── */}
      <h2 id="step-10-run">Step 10 — Run migrations, seed, and serve</h2>
      <CodeBlock language="bash">
        {`kashvi migrate   # create / update the products table
kashvi seed      # insert sample data
kashvi serve     # start the server on APP_PORT (default 8080)`}
      </CodeBlock>
      <p>
        Set <strong>LOG_LEVEL</strong> and <strong>DB_LOG_MODE</strong> in{" "}
        <code>.env</code> (see{" "}
        <Link href="/docs/installation#logging">Logging</Link>) to see app
        logs and SQL queries during development.
      </p>

      {/* ── Step 11: Test ────────────────────────── */}
      <h2 id="step-11-test">Step 11 — Test the API</h2>

      <h3 id="curl">Quick check with curl</h3>
      <CodeBlock language="bash">
        {`# List all products
curl http://localhost:8080/api/products

# Create a product (no auth on this example)
curl -X POST http://localhost:8080/api/products \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Laptop","description":"Gaming","price":999.99,"sku":"LAPTOP001"}'

# Get one product
curl http://localhost:8080/api/products/1

# Update
curl -X PUT http://localhost:8080/api/products/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Gaming Laptop","description":"Gaming","price":1099.99,"sku":"LAPTOP001"}'

# Delete
curl -X DELETE http://localhost:8080/api/products/1`}
      </CodeBlock>

      <h3 id="testkit">Automated with TestKit</h3>
      <p>
        The generated <code>testdata/product_scenarios.json</code> defines
        scenarios (list, create, get, update, delete). Build your app&apos;s
        handler and run:
      </p>
      <CodeBlock language="go">{testExample}</CodeBlock>
      <p>
        Put request/response JSON fixtures in <code>testdata/</code> as
        referenced by the scenario file (e.g.{" "}
        <code>product_create_req.json</code>,{" "}
        <code>product_create_res.json</code>). See the{" "}
        <Link href="/docs/testkit">TestKit docs</Link> for the full scenario
        format.
      </p>

      {/* ── Flow summary ─────────────────────────── */}
      <h2 id="flow-summary">Layer quick reference</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-2 font-semibold">Layer</th>
              <th className="text-left px-4 py-2 font-semibold">File</th>
              <th className="text-left px-4 py-2 font-semibold">
                Responsibility
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Model",
                "app/models/product.go",
                "Struct + gorm/json/validate tags",
              ],
              [
                "DTO",
                "app/dto/product_dto.go",
                "Request/response structs; validate tags; used with ctx.BindJSON",
              ],
              [
                "Migration",
                "database/migrations/…",
                "AutoMigrate / DropTable for the model",
              ],
              [
                "Repository",
                "app/repositories/product.go",
                "ALL DB access (FindByID, All, Create, Update, Delete, Query)",
              ],
              [
                "Service",
                "app/services/product_service.go",
                "Optional business logic using repository",
              ],
              [
                "Controller",
                "app/controllers/product_controller.go",
                "HTTP only: BindJSON (validation), call repo/service, log, respond",
              ],
              [
                "Routes",
                "app/routes/api.go",
                "Wire controller methods to HTTP methods + paths",
              ],
              [
                "Seeder",
                "database/seeders/product_seeder.go",
                'app.RegisterSeeder("key", func() { ... })',
              ],
              [
                "Tests",
                "testdata/product_scenarios.json",
                "testkit + JSON scenarios",
              ],
            ].map(([layer, file, role]) => (
              <tr key={layer}>
                <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-900 dark:text-zinc-100">
                  {layer}
                </td>
                <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                  <code>{file}</code>
                </td>
                <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
                  {role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── What's next ──────────────────────────── */}
      <h2 id="whats-next">What&apos;s next?</h2>
      <p>
        See also:{" "}
        <Link href="/docs/routing">Routing</Link>,{" "}
        <Link href="/docs/validation">Validation</Link>,{" "}
        <Link href="/docs/authentication">Authentication</Link>,{" "}
        <Link href="/docs/orm">ORM &amp; Database</Link>,{" "}
        <Link href="/docs/migrations">Migrations &amp; Seeders</Link>.
      </p>
    </article>
  );
}
