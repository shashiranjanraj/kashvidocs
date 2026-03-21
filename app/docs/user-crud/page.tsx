import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "../_components/CodeBlock";

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
    var input models.Product
    if !ctx.BindJSON(&input) {
        return
    }
    if err := c.repo.Create(&input); err != nil {
        ctx.Error(http.StatusBadRequest, "Failed to create product")
        return
    }
    log := logger.WithCtx(ctx.R.Context())
    log.Info("product_created", "id", input.ID, "sku", input.SKU)
    ctx.Created(input)
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
    handler := app.BuildHandler(/* your app with routes */)
    testkit.RunDir(t, handler, "testdata")
}
`;

export const metadata: Metadata = {
  title: "Complete CRUD Walkthrough (Product API)",
  description: "Build a full Product API with model, migration, repository, service, controller, validation, auth, seeder, and tests.",
};

export default function UserCrudPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="complete-crud-walkthrough">Complete CRUD walkthrough (model → migration → repository → service → controller → validation → auth → seed → test)</h1>
      <p>
        This section walks through building a full <strong>Product</strong> API using every layer: <strong>model</strong>, <strong>migration</strong>, <strong>repository</strong>, <strong>service</strong>, <strong>controller</strong>, <strong>validation</strong>, <strong>auth</strong> (optional), <strong>seeder</strong>, and <strong>test scenarios</strong>. The controller uses the <strong>repository</strong> (no direct <code>orm</code> calls), and validation runs via <strong>BindJSON</strong> and <strong>validate</strong> tags.
      </p>
      <p>
        Follow along step-by-step to generate files, wire routes, migrate/seed, and test the API.
      </p>

      <h2 id="step-1-generate">Step 1: Generate the resource</h2>
      <p>From your project root (where <code>go.mod</code> lives):</p>
      <CodeBlock language="bash">{`kashvi make:resource Product`}</CodeBlock>
      <p>This creates:</p>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-2 font-semibold">File</th>
              <th className="text-left px-4 py-2 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>app/models/product.go</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Product model (GORM struct)</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>app/repositories/product.go</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Data layer; controller calls this instead of orm</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>app/controllers/product_controller.go</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">CRUD controller (uses repository)</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>app/services/product_service.go</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Business logic (holds repository)</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>database/migrations/..._create_products_table.go</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Migration with AutoMigrate &amp; DropTable</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>database/seeders/product_seeder.go</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Seeder using <code>app.RegisterSeeder</code></td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>testdata/product_scenarios.json</code></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Test scenarios (list, create, get, update, delete)</td></tr>
          </tbody>
        </table>
      </div>
      <p>The CLI will print the exact route registration snippet to paste into your routes file.</p>

      <h2 id="step-2-model">Step 2: Model and validation tags</h2>
      <p>Edit <code>app/models/product.go</code>: add fields and <strong>gorm</strong> / <strong>json</strong> tags. Use <strong>validate</strong> tags so that <code>ctx.BindJSON(&amp;input)</code> can validate the body:</p>
      <CodeBlock title="app/models/product.go" language="go">
        {productModelExample}
      </CodeBlock>
      <p>Validation runs automatically when the controller calls <code>ctx.BindJSON(&amp;input)</code> with a struct that has <code>validate</code> tags. Supported rules include <code>required</code>, <code>email</code>, <code>min</code>, <code>max</code>, <code>gte</code>, <code>lte</code>, <code>in</code>, <code>url</code>, etc.</p>

      <h2 id="step-3-migration">Step 3: Migration</h2>
      <p>The generated migration already:</p>
      <ul>
        <li><strong>Up:</strong> runs <code>db.AutoMigrate(&amp;models.Product{})</code> so the table matches your model.</li>
        <li><strong>Down:</strong> runs <code>db.Migrator().DropTable("products")</code>.</li>
      </ul>
      <p>Imports use your module path from <code>go.mod</code>. You only need to change the migration if you add custom SQL or indexes.</p>

      <h2 id="step-4-repository">Step 4: Repository</h2>
      <p>The generated <code>app/repositories/product.go</code> embeds <code>repository.Base[models.Product]</code> and exposes:</p>
      <ul>
        <li><code>FindByID(id uint)</code>, <code>All()</code>, <code>Create(m *Product)</code>, <code>Update(m *Product)</code>, <code>Delete(id uint)</code></li>
        <li><code>Query()</code> for custom chains (e.g. filters, pagination)</li>
      </ul>
      <p>No change needed for basic CRUD. Add methods like <code>FindBySKU(sku string)</code> in this file if you need them; keep all data access here, not in the controller.</p>
      <CodeBlock title="app/repositories/product.go (custom method example)" language="go">
        {repoFindBySKUExample}
      </CodeBlock>

      <h2 id="step-5-service">Step 5: Service (optional)</h2>
      <p>The generated service has a <strong>repository</strong> field. Use it for business logic (e.g. checks, multiple repo calls, events):</p>
      <CodeBlock title="app/services/product_service.go" language="go">
        {productServiceExample}
      </CodeBlock>
      <p>For simple CRUD, the controller can call the repository directly; the service is optional.</p>

      <h2 id="step-6-controller">Step 6: Controller and validation</h2>
      <p>The generated controller already uses the <strong>repository</strong> (no <code>orm</code> in the controller). It:</p>
      <ul>
        <li><strong>Store:</strong> binds JSON to <code>models.Product</code> with <code>ctx.BindJSON(&amp;input)</code>. Validation runs from the model&apos;s <code>validate</code> tags; on failure the framework returns 422.</li>
        <li><strong>Update:</strong> loads by ID via repo, binds JSON into the same struct, then <code>repo.Update(item)</code>.</li>
        <li><strong>Index / Show / Destroy:</strong> call <code>repo.All()</code>, <code>repo.FindByID</code>, <code>repo.Delete</code>.</li>
      </ul>
      <p>To add <strong>logging</strong> (e.g. for create):</p>
      <CodeBlock title="Controller Store with logging" language="go">
        {controllerStoreExample}
      </CodeBlock>

      <h2 id="step-7-routes">Step 7: Routes and optional auth</h2>
      <p>Register routes (and optionally the service) in <code>main.go</code> or <code>app/routes/api.go</code>:</p>
      <CodeBlock title="Routes with optional auth" language="go">
        {routesExample}
      </CodeBlock>
      <p><strong>Auth:</strong> use <code>middleware.AuthMiddleware</code> on the router or group. The middleware validates the <code>Authorization: Bearer &lt;token&gt;</code> header and injects <code>user_id</code> and <code>role</code> into the request context. In handlers, use <code>middleware.UserIDFromCtx(r)</code> or <code>middleware.RoleFromCtx(r)</code> to read the current user.</p>

      <h2 id="step-8-seeder">Step 8: Seeder</h2>
      <p>The generated seeder uses <code>app.RegisterSeeder(&quot;products&quot;, func() {'{'} ... {'}'})</code>. Edit <code>database/seeders/product_seeder.go</code> and add sample data:</p>
      <CodeBlock title="database/seeders/product_seeder.go" language="go">
        {seederExample}
      </CodeBlock>
      <p>Ensure your app&apos;s migrations (and optionally seeders) are registered (e.g. blank import <code>_ &quot;yourmodule/database/migrations&quot;</code> and <code>_ &quot;yourmodule/database/seeders&quot;</code> in <code>main.go</code>).</p>

      <h2 id="step-9-run">Step 9: Run migrations, seed, and server</h2>
      <CodeBlock language="bash">
        {`kashvi migrate
kashvi seed
kashvi serve`}
      </CodeBlock>
      <p>Set <strong>LOG_LEVEL</strong> and <strong>DB_LOG_MODE</strong> in <code>.env</code> (see <Link href="/docs/installation#logging" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Logging</Link>) to see app and SQL logs.</p>

      <h2 id="step-10-test">Step 10: Test (curl and test scenarios)</h2>

      <h3 id="curl">Manual (curl)</h3>
      <CodeBlock language="bash">
        {`# List
curl http://localhost:8080/api/products

# Create (if not using auth)
curl -X POST http://localhost:8080/api/products \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Laptop","description":"Gaming","price":999.99,"sku":"LAPTOP001"}'

# Get one
curl http://localhost:8080/api/products/1

# Update
curl -X PUT http://localhost:8080/api/products/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Gaming Laptop","description":"Gaming","price":1099.99,"sku":"LAPTOP001"}'

# Delete
curl -X DELETE http://localhost:8080/api/products/1`}
      </CodeBlock>

      <h3 id="testkit">Automated (testkit)</h3>
      <p>The generated <code>testdata/product_scenarios.json</code> defines scenarios (list, create, get, update, delete). Build your app&apos;s <code>http.Handler</code> (e.g. from <code>app</code> + routes) and run:</p>
      <CodeBlock language="go">
        {testExample}
      </CodeBlock>
      <p>Put request/response JSON fixtures in <code>testdata/</code> as referenced by the scenario files (e.g. <code>product_create_req.json</code>, <code>product_create_res.json</code>).</p>

      <h2 id="flow-summary">Flow summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="text-left px-4 py-2 font-semibold">Layer</th>
              <th className="text-left px-4 py-2 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Model</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Struct + gorm/json/validate tags</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Migration</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">AutoMigrate / DropTable for the model</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Repository</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">All DB access (FindByID, All, Create, Update, Delete, Query)</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Service</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Optional business logic using repository</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Controller</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">HTTP only: BindJSON (validation), call repo/service, logger.WithCtx, respond</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Validation</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">Via <code>validate</code> tags and <code>ctx.BindJSON</code> (422 on failure)</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Auth</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>middleware.AuthMiddleware</code> on routes; JWT in <code>Authorization</code> header</td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Seeder</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><code>app.RegisterSeeder(&quot;key&quot;, func() {'{'} ... {'}'})</code></td></tr>
            <tr><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700"><strong>Test</strong></td><td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">testkit + JSON scenarios in <code>testdata/</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        See also: <Link href="/docs/routing" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Routing</Link>, <Link href="/docs/validation" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Validation</Link>, <Link href="/docs/authentication" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Authentication</Link>, <Link href="/docs/orm" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">ORM &amp; Database</Link>, <Link href="/docs/migrations" className="text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Migrations &amp; Seeders</Link>.
      </p>
    </article>
  );
}
