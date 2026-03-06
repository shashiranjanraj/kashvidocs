import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Migrations & Seeders",
  description: "Create migrations, run/rollback, and seed data.",
};

export default function MigrationsPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="migrations-seeders">Migrations &amp; Seeders</h1>

      <h2 id="creating-migration">Creating a Migration</h2>
      <CodeBlock>{`kashvi make:migration create_posts_table`}</CodeBlock>
      <p>Edit the generated file:</p>
      <CodeBlock>
        {`package migrations

import (
    "github.com/shashiranjanraj/kashvi/pkg/migration"
    "github.com/shashiranjanraj/kashvi/app/models"
    "gorm.io/gorm"
)

func init() {
    migration.Register("20260221_create_posts_table", &M_CreatePostsTable{})
}

type M_CreatePostsTable struct{}

func (m *M_CreatePostsTable) Up(db *gorm.DB) error {
    return db.AutoMigrate(&models.Post{})
}

func (m *M_CreatePostsTable) Down(db *gorm.DB) error {
    return db.Migrator().DropTable("posts")
}`}
      </CodeBlock>

      <h2 id="running-migrations">Running Migrations</h2>
      <CodeBlock>
        {`kashvi migrate              # run all pending
kashvi migrate:rollback     # rollback last batch
kashvi migrate:status       # show status`}
      </CodeBlock>

      <h2 id="seeders">Seeders</h2>
      <CodeBlock>{`kashvi make:seeder PostSeeder`}</CodeBlock>
      <CodeBlock>
        {`func PostSeeder(db *gorm.DB) error {
    posts := []models.Post{
        {Title: "Hello World", Body: "First post!", Published: true},
    }
    return db.Create(&posts).Error
}`}
      </CodeBlock>
      <p>Register in <code>database/seeders/run_all.go</code>:</p>
      <CodeBlock>
        {`func RunAll(db *gorm.DB) error {
    for _, seeder := range []func(*gorm.DB) error{
        UserSeeder,
        PostSeeder,
    } {
        if err := seeder(db); err != nil {
            return err
        }
    }
    return nil
}`}
      </CodeBlock>
      <CodeBlock>{`kashvi seed`}</CodeBlock>
    </article>
  );
}

