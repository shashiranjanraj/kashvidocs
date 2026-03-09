import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "5-Minute CRUD Creation Deep Dive",
  description: "A full create/read/update/delete flow in Kashvi using a Product resource.",
};

export default function CrudWalkthroughPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="crud-walkthrough">5-Minute CRUD Creation Deep Dive</h1>
      <p>
        This guide covers a full Create/Read/Update/Delete flow using Kashvi
        generators and runtime commands.
      </p>

      <h2 id="scaffold-resource">Step 1: Generate the Resource (1 minute)</h2>
      <CodeBlock>{`kashvi make:resource Product`}</CodeBlock>
      <p>This creates:</p>
      <ul>
        <li><code>app/models/product.go</code> - Product model</li>
        <li><code>app/controllers/product_controller.go</code> - CRUD controller</li>
        <li><code>app/services/product_service.go</code> - Business logic service</li>
        <li><code>database/migrations/&lt;timestamp&gt;_create_products_table.go</code> - Migration</li>
        <li><code>database/seeders/product_seeder.go</code> - Database seeder</li>
        <li><code>testdata/product_scenarios.json</code> - Test scenarios</li>
      </ul>

      <h2 id="customize-model">Step 2: Customize the Model (1 minute)</h2>
      <p>Edit <code>app/models/product.go</code>:</p>
      <CodeBlock>{`package models

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Name        string  \`json:"name" gorm:"not null"\`
    Description string  \`json:"description"\`
    Price       float64 \`json:"price" gorm:"not null"\`
    SKU         string  \`json:"sku" gorm:"unique;not null"\`
}`}</CodeBlock>

      <h2 id="define-migration">Step 3: Define the Migration (1 minute)</h2>
      <p>Edit <code>database/migrations/&lt;timestamp&gt;_create_products_table.go</code>:</p>
      <CodeBlock>{`package migrations

import (
    "github.com/shashiranjanraj/kashvi/app/models"
    "gorm.io/gorm"
)

type CreateProductsTable struct{}

func (m *CreateProductsTable) Up(db *gorm.DB) error {
    return db.AutoMigrate(&models.Product{})
}

func (m *CreateProductsTable) Down(db *gorm.DB) error {
    return db.Migrator().DropTable("products")
}`}</CodeBlock>

      <h2 id="update-controller">Step 4: Update the Controller (1 minute)</h2>
      <p>Edit <code>app/controllers/product_controller.go</code>:</p>
      <CodeBlock>{`func (c *ProductController) Index(ctx *appctx.Context) {
    var products []models.Product
    if err := orm.DB().Get(&products); err != nil {
        ctx.Error(http.StatusInternalServerError, "Failed to fetch products")
        return
    }
    ctx.Success(products)
}

func (c *ProductController) Store(ctx *appctx.Context) {
    var input struct {
        Name        string  \`json:"name" validate:"required"\`
        Description string  \`json:"description"\`
        Price       float64 \`json:"price" validate:"required,min=0"\`
        SKU         string  \`json:"sku" validate:"required"\`
    }
    
    if !ctx.BindJSON(&input) {
        return
    }
    
    product := &models.Product{
        Name:        input.Name,
        Description: input.Description,
        Price:       input.Price,
        SKU:         input.SKU,
    }
    
    if err := orm.DB().Create(product).Error; err != nil {
        ctx.Error(http.StatusBadRequest, "Failed to create product")
        return
    }
    
    ctx.Created(product)
}

func (c *ProductController) Show(ctx *appctx.Context) {
    id := ctx.Param("id")
    var product models.Product
    
    if err := orm.DB().Where("id = ?", id).First(&product).Error; err != nil {
        ctx.Error(http.StatusNotFound, "Product not found")
        return
    }
    
    ctx.Success(product)
}

func (c *ProductController) Update(ctx *appctx.Context) {
    id := ctx.Param("id")
    var product models.Product
    
    if err := orm.DB().Where("id = ?", id).First(&product).Error; err != nil {
        ctx.Error(http.StatusNotFound, "Product not found")
        return
    }
    
    var input struct {
        Name        string  \`json:"name"\`
        Description string  \`json:"description"\`
        Price       float64 \`json:"price"\`
        SKU         string  \`json:"sku"\`
    }
    
    if !ctx.BindJSON(&input) {
        return
    }
    
    product.Name = input.Name
    product.Description = input.Description
    product.Price = input.Price
    product.SKU = input.SKU
    
    if err := orm.DB().Save(&product).Error; err != nil {
        ctx.Error(http.StatusBadRequest, "Failed to update product")
        return
    }
    
    ctx.Success(product)
}

func (c *ProductController) Destroy(ctx *appctx.Context) {
    id := ctx.Param("id")
    
    if err := orm.DB().Where("id = ?", id).Delete(&models.Product{}).Error; err != nil {
        ctx.Error(http.StatusInternalServerError, "Failed to delete product")
        return
    }
    
    ctx.Status(http.StatusNoContent)
}`}</CodeBlock>

      <h2 id="register-routes">Step 5: Register Routes (1 minute)</h2>
      <p>Add to your routes in <code>main.go</code> or <code>app/routes/api.go</code>:</p>
      <CodeBlock>{`ctrl := controllers.NewProductController()
api := r.Group("/api")

api.Get("/products", "products.index", ctx.Wrap(ctrl.Index))
api.Post("/products", "products.store", ctx.Wrap(ctrl.Store))
api.Get("/products/{id}", "products.show", ctx.Wrap(ctrl.Show))
api.Put("/products/{id}", "products.update", ctx.Wrap(ctrl.Update))
api.Delete("/products/{id}", "products.destroy", ctx.Wrap(ctrl.Destroy))`}</CodeBlock>

      <h2 id="run-migrations-test">Step 6: Run Migrations and Test (1 minute)</h2>
      <CodeBlock>{`kashvi migrate
kashvi serve`}</CodeBlock>

      <p>Test the API:</p>

      <h3 id="create">Create</h3>
      <CodeBlock>{`curl -X POST http://localhost:8080/api/products \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Laptop","description":"Gaming laptop","price":999.99,"sku":"LAPTOP001"}'`}</CodeBlock>

      <h3 id="list">List</h3>
      <CodeBlock>{`curl http://localhost:8080/api/products`}</CodeBlock>

      <h3 id="show">Show</h3>
      <CodeBlock>{`curl http://localhost:8080/api/products/1`}</CodeBlock>

      <h3 id="update">Update</h3>
      <CodeBlock>{`curl -X PUT http://localhost:8080/api/products/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Gaming Laptop","price":1099.99}'`}</CodeBlock>

      <h3 id="delete">Delete</h3>
      <CodeBlock>{`curl -X DELETE http://localhost:8080/api/products/1`}</CodeBlock>

      <h2 id="next-improvements">7. Next improvements</h2>
      <ol>
        <li>Replace empty request structs in controller methods with typed DTOs + validation tags.</li>
        <li>Move DB logic into <code>app/services/product_service.go</code> and keep controllers thin.</li>
        <li>Add middleware (Auth, rate-limit, role checks) per route group.</li>
        <li>Add pagination in <code>Index</code> using <code>pkg/orm</code> pagination helpers.</li>
        <li>Add queue jobs for side effects (notifications, emails, analytics writes).</li>
      </ol>
    </article>
  );
}

