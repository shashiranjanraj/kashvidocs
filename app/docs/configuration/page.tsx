import type { Metadata } from "next";
import { Callout } from "../_components/Callout";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Configuration",
  description: "Environment variables and config/app.json.",
};

export default function ConfigurationPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="configuration">Configuration</h1>
      <p>Kashvi reads configuration from two sources, merged in order:</p>
      <ol>
        <li>
          <code>config/app.json</code> — committed defaults
        </li>
        <li>
          <code>.env</code> — local overrides (never commit this)
        </li>
      </ol>
      <p>
        <code>.env</code> values always win over <code>config/app.json</code>.
      </p>

      <h2 id="env-vars">All Environment Variables</h2>

      <h3 id="application">Application</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>APP_ENV</code>
            </td>
            <td>
              <code>local</code>
            </td>
            <td>
              <code>local</code> / <code>production</code> / <code>prod</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>APP_PORT</code>
            </td>
            <td>
              <code>8080</code>
            </td>
            <td>HTTP server port</td>
          </tr>
          <tr>
            <td>
              <code>JWT_SECRET</code>
            </td>
            <td>(insecure default)</td>
            <td>
              Must be changed in production
            </td>
          </tr>
          <tr>
            <td>
              <code>MAX_BODY_BYTES</code>
            </td>
            <td>
              <code>4194304</code> (4 MB)
            </td>
            <td>Max JSON request body size</td>
          </tr>
        </tbody>
      </table>

      <Callout type="caution" title="Production safety">
        The server refuses to start in production if <code>JWT_SECRET</code> is
        the default value.
      </Callout>

      <h3 id="database">Database</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>DB_DRIVER</code>
            </td>
            <td>
              <code>sqlite</code>
            </td>
            <td>
              <code>sqlite</code> / <code>postgres</code> / <code>mysql</code> /{" "}
              <code>sqlserver</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>DATABASE_DSN</code>
            </td>
            <td>
              <code>kashvi.db</code>
            </td>
            <td>Full connection DSN</td>
          </tr>
        </tbody>
      </table>

      <p>DSN examples:</p>
      <CodeBlock title=".env">
        {`# SQLite (dev)
DATABASE_DSN=kashvi.db

# PostgreSQL
DATABASE_DSN=host=localhost user=postgres password=secret dbname=kashvi port=5432 sslmode=disable

# MySQL
DATABASE_DSN=root:secret@tcp(127.0.0.1:3306)/kashvi?charset=utf8mb4&parseTime=True&loc=Local`}
      </CodeBlock>

      <h3 id="redis">Redis</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>REDIS_ADDR</code>
            </td>
            <td>
              <code>localhost:6379</code>
            </td>
            <td>Redis host:port</td>
          </tr>
          <tr>
            <td>
              <code>REDIS_PASSWORD</code>
            </td>
            <td>(empty)</td>
            <td>Redis auth password</td>
          </tr>
        </tbody>
      </table>

      <Callout type="note" title="Non-fatal dependency">
        Redis is non-fatal — the server starts with a warning if Redis is
        unavailable and degrades gracefully (sessions won&apos;t persist, cache
        misses).
      </Callout>

      <h3 id="storage-vars">Storage</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>STORAGE_DISK</code>
            </td>
            <td>
              <code>local</code>
            </td>
            <td>
              <code>local</code> or <code>s3</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>STORAGE_LOCAL_ROOT</code>
            </td>
            <td>
              <code>storage</code>
            </td>
            <td>Root directory for local disk</td>
          </tr>
          <tr>
            <td>
              <code>STORAGE_URL</code>
            </td>
            <td>
              <code>http://localhost:8080/storage</code>
            </td>
            <td>Public URL for local files</td>
          </tr>
        </tbody>
      </table>

      <h2 id="reading-config">Reading Config in Code</h2>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/config"

port   := config.AppPort()      // "8080"
env    := config.AppEnv()       // "local"
secret := config.JWTSecret()
bucket := config.StorageS3Bucket()

// Generic getter with a default:
val := config.Get("MY_CUSTOM_VAR", "default-value")`}
      </CodeBlock>

      <h2 id="app-json-format">
        <code>config/app.json</code> Format
      </h2>
      <CodeBlock>
        {`{
  "app_env":      "local",
  "app_port":     "8080",
  "jwt_secret":   "change-me",
  "db_driver":    "sqlite",
  "database_dsn": "kashvi.db",
  "redis_addr":   "localhost:6379"
}`}
      </CodeBlock>
      <p>
        Keys in <code>app.json</code> map 1:1 to env variable names (lowercase,
        underscores).
      </p>
    </article>
  );
}

