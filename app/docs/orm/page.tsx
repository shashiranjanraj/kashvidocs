import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "ORM & Database",
  description: "GORM wrapper, query builder, pagination, caching, and models.",
};

export default function OrmPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="orm-database">ORM &amp; Database</h1>
      <p>
        Kashvi wraps GORM with a fluent chainable query builder in{" "}
        <code>pkg/orm</code>.
      </p>

      <h2 id="connection">Connection</h2>
      <p>The database is connected at server boot. Configure via <code>.env</code>:</p>
      <CodeBlock title=".env">
        {`DB_DRIVER=postgres
DATABASE_DSN=host=localhost user=postgres dbname=kashvi sslmode=disable`}
      </CodeBlock>
      <p>Use <code>database.DB</code> to get the GORM instance anywhere:</p>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/pkg/database"

database.DB.Create(&user)`}
      </CodeBlock>

      <h2 id="basic-crud">Basic CRUD</h2>
      <CodeBlock>
        {`import (
    "github.com/shashiranjanraj/kashvi/pkg/database"
    "github.com/shashiranjanraj/kashvi/pkg/orm"
)

q := orm.New(database.DB)

// Create
q.Create(&models.Post{Title: "Hello", Body: "World"})

// Find by ID
var post models.Post
q.Find(&post, 1)

// Update
q.Where("id = ?", 1).Update(&models.Post{}, map[string]any{"title": "Updated"})

// Delete
q.Where("id = ?", 1).Delete(&models.Post{})`}
      </CodeBlock>

      <h2 id="query-builder">Query Builder</h2>
      <CodeBlock>
        {`q := orm.New(database.DB)

// Filtering
q.Where("status = ?", "active").
  Where("created_at > ?", time.Now().AddDate(0, -1, 0))

// Ordering & limiting
q.OrderBy("created_at DESC").Limit(10).Offset(20)

// Select specific columns
q.Select("id", "title", "created_at")

// Eager loading
q.With("Author", "Tags")

// Execute
var posts []models.Post
q.Get(&posts)`}
      </CodeBlock>

      <h2 id="pagination">Pagination</h2>
      <CodeBlock>
        {`func (ctrl *PostController) Index(c *appctx.Context) {
    var posts []models.Post

    pagination, err := orm.New(database.DB).
        Where("published = ?", true).
        OrderBy("created_at DESC").
        Paginate(&posts, c.R)  // reads ?page=1&per_page=15 from request

    if err != nil {
        c.Error(500, "Failed to fetch posts")
        return
    }

    response.Paginated(c.W, posts, pagination)
}`}
      </CodeBlock>
      <p>Response shape:</p>
      <CodeBlock>
        {`{
  "status": 200,
  "data": {
    "items": [...],
    "pagination": {
      "total": 150,
      "per_page": 15,
      "current_page": 1,
      "last_page": 10,
      "from": 1,
      "to": 15
    }
  }
}`}
      </CodeBlock>

      <h2 id="parallel-queries">Parallel Queries</h2>
      <p>Run multiple queries concurrently and wait for all results:</p>
      <CodeBlock>
        {`var users []models.User
var posts []models.Post
var tags  []models.Tag

orm.Parallel(
    func() { database.DB.Find(&users) },
    func() { database.DB.Where("published = ?", true).Find(&posts) },
    func() { database.DB.Find(&tags) },
)

// All three queries ran simultaneously`}
      </CodeBlock>

      <h2 id="orm-cache-bridge">ORM Cache Bridge</h2>
      <p>Cache query results in Redis automatically:</p>
      <CodeBlock>
        {`var user models.User
orm.New(database.DB).
    Cache("user:42", 5*time.Minute).
    Find(&user, 42)
// Second call hits Redis, not the DB`}
      </CodeBlock>

      <h2 id="models">Models</h2>
      <p>Define models in <code>app/models/</code>:</p>
      <CodeBlock>
        {`package models

import "gorm.io/gorm"

type Post struct {
    gorm.Model          // ID, CreatedAt, UpdatedAt, DeletedAt
    Title     string    \`gorm:"size:255;not null"\`
    Body      string    \`gorm:"type:text"\`
    Published bool      \`gorm:"default:false"\`
    UserID    uint
    User      User      // belongs to
    Tags      []Tag     \`gorm:"many2many:post_tags;"\`
}`}
      </CodeBlock>

      <h2 id="raw-queries">Raw Queries</h2>
      <CodeBlock>
        {`var result []map[string]any
database.DB.Raw("SELECT id, title FROM posts WHERE published = ?", true).Scan(&result)`}
      </CodeBlock>

      <h2 id="pool-settings">Connection Pool Settings (auto-configured)</h2>
      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max open connections</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Max idle connections</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Max conn lifetime</td>
            <td>5 minutes</td>
          </tr>
          <tr>
            <td>Max idle time</td>
            <td>2 minutes</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

