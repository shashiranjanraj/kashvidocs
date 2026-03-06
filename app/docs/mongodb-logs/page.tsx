import type { Metadata } from "next";
import { Callout } from "../_components/Callout";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "MongoDB Log Storage",
  description: "Async log mirroring to MongoDB with batching and graceful flush.",
};

export default function MongoDbLogsPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="mongodb-log-storage">MongoDB Log Storage</h1>
      <p>
        Kashvi can mirror all application logs to <strong>MongoDB</strong> in
        addition to stdout. The integration is:
      </p>
      <ul>
        <li>
          <strong>Async</strong> — writes never block the request path
        </li>
        <li>
          <strong>Batched</strong> — up to 50 documents per <code>InsertMany</code>
        </li>
        <li>
          <strong>Graceful</strong> — remaining records are flushed before the
          server exits
        </li>
        <li>
          <strong>Optional</strong> — leave <code>MONGO_URI</code> blank to stay
          stdout-only (zero overhead)
        </li>
      </ul>

      <h2 id="mongo-config">Configuration</h2>
      <CodeBlock title=".env">
        {`MONGO_URI=mongodb://localhost:27017   # required to enable; leave blank to disable
MONGO_LOG_DB=kashvi_logs              # default: kashvi_logs
MONGO_LOG_COLLECTION=app_logs         # default: app_logs`}
      </CodeBlock>
      <p>With a MongoDB Atlas cluster:</p>
      <CodeBlock title=".env">
        {`MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true`}
      </CodeBlock>

      <h2 id="document-shape">Document shape</h2>
      <p>Each log record in MongoDB:</p>
      <CodeBlock>
        {`{
  "time":       "2026-02-25T12:00:00Z",
  "level":      "INFO",
  "msg":        "user registered",
  "request_id": "a1b2c3d4",
  "attrs": {
    "email": "user@example.com",
    "plan":  "pro"
  }
}`}
      </CodeBlock>
      <p>
        A <code>{`{time: -1}`}</code> index is created on startup for efficient
        querying.
      </p>

      <h2 id="querying-logs">Querying logs</h2>
      <CodeBlock>
        {`// mongosh — last 100 errors
db.app_logs.find({ level: "ERROR" }).sort({ time: -1 }).limit(100)

// All logs from a specific request
db.app_logs.find({ request_id: "a1b2c3d4" })

// Logs from the last hour
db.app_logs.find({ time: { $gt: new Date(Date.now() - 3600_000) } })`}
      </CodeBlock>

      <h2 id="ttl">TTL (auto-delete old logs)</h2>
      <p>Add a TTL index in MongoDB to keep only N days of logs:</p>
      <CodeBlock>
        {`db.app_logs.createIndex(
  { time: 1 },
  { expireAfterSeconds: 30 * 24 * 3600 }  // 30 days
)`}
      </CodeBlock>

      <h2 id="graceful-flush">Graceful flush on shutdown</h2>
      <p>
        <code>logger.CloseMongoHandler()</code> is called automatically during{" "}
        <code>kashvi run</code> shutdown. If you start the server manually, call
        it yourself:
      </p>
      <CodeBlock>{`defer logger.CloseMongoHandler()`}</CodeBlock>

      <h2 id="internal-design">Internal design</h2>
      <table>
        <thead>
          <tr>
            <th>Detail</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Channel buffer</td>
            <td>4096 records</td>
          </tr>
          <tr>
            <td>Batch size</td>
            <td>50 documents per InsertMany</td>
          </tr>
          <tr>
            <td>Flush ticker</td>
            <td>Every 2 seconds</td>
          </tr>
          <tr>
            <td>On queue full</td>
            <td>Record silently dropped — logging never blocks</td>
          </tr>
          <tr>
            <td>Connection pool</td>
            <td>Max 10 MongoDB connections</td>
          </tr>
          <tr>
            <td>Connect timeout</td>
            <td>5 seconds (falls back to stdout if unreachable)</td>
          </tr>
        </tbody>
      </table>

      <Callout type="note" title="Unreachable MongoDB">
        If MongoDB is unreachable at startup, Kashvi logs a warning to stdout
        and continues without MongoDB — it never fails to start.
      </Callout>
    </article>
  );
}

