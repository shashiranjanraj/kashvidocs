import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Worker Pool",
  description: "Bounded goroutine pool for controlled concurrency.",
};

export default function WorkerPoolPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="worker-pool">Worker Pool</h1>
      <p>
        <code>pkg/workerpool</code> provides a <strong>bounded goroutine pool</strong>{" "}
        that limits concurrent goroutine creation under high load.
      </p>

      <h2 id="why-use-a-pool">Why use a pool?</h2>
      <table>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Problem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>go doWork()</code> for every request
            </td>
            <td>Goroutines spike unboundedly under load — OOM risk</td>
          </tr>
          <tr>
            <td>Worker pool</td>
            <td>Hard ceiling on concurrency — predictable memory</td>
          </tr>
        </tbody>
      </table>

      <h2 id="pool-config">Configuration</h2>
      <CodeBlock title=".env">
        {`WORKER_POOL_SIZE=50   # default: 50`}
      </CodeBlock>

      <h2 id="basic-usage">Basic usage</h2>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/pkg/workerpool"

// Create a pool (use config.WorkerPoolSize() for env-driven size)
pool := workerpool.New(config.WorkerPoolSize())
defer pool.Shutdown()

// Non-blocking submit
err := pool.Submit(func() {
    processImage(imageData)
})
if errors.Is(err, workerpool.ErrPoolFull) {
    // Pool is busy — return 429, push to queue, etc.
    c.JSON(http.StatusTooManyRequests, map[string]string{"error": "server busy"})
    return
}`}
      </CodeBlock>

      <h2 id="blocking-submit">Blocking submit</h2>
      <p>When you want to wait until a slot is available:</p>
      <CodeBlock>
        {`err := pool.SubmitWait(func() {
    sendReportEmail(userID)
})
if errors.Is(err, workerpool.ErrPoolClosed) {
    // Pool was shut down
}`}
      </CodeBlock>

      <h2 id="shutdown">Shutdown</h2>
      <p>
        <code>Shutdown()</code> stops accepting new tasks, waits for all in-flight tasks to complete,
        then releases all worker goroutines. Safe to call multiple times.
      </p>
      <CodeBlock>{`pool.Shutdown()`}</CodeBlock>

      <h2 id="errors">Error reference</h2>
      <table>
        <thead>
          <tr>
            <th>Error</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>workerpool.ErrPoolFull</code>
            </td>
            <td>All workers are busy and the queue buffer is full</td>
          </tr>
          <tr>
            <td>
              <code>workerpool.ErrPoolClosed</code>
            </td>
            <td>
              <code>Shutdown()</code> has been called
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="panic-safety">Panic safety</h2>
      <p>
        Workers recover from panics automatically — a bad task never kills the pool or unexpectedly terminates
        a goroutine. The next task runs as normal.
      </p>

      <h2 id="sizing-guide">Sizing guide</h2>
      <table>
        <thead>
          <tr>
            <th>Use case</th>
            <th>Recommended size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image processing</td>
            <td>
              <code>runtime.NumCPU()</code>
            </td>
          </tr>
          <tr>
            <td>Network I/O (external APIs)</td>
            <td>50–200</td>
          </tr>
          <tr>
            <td>DB queries</td>
            <td>20–50 (limited by DB connection pool)</td>
          </tr>
          <tr>
            <td>Mixed workloads</td>
            <td>
              <code>WORKER_POOL_SIZE=50</code> (default)
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="buffer-size">Buffer size</h2>
      <p>
        The internal task queue buffer is <code>2 × size</code>. This absorbs short bursts without returning{" "}
        <code>ErrPoolFull</code>.
      </p>

      <h2 id="integration">Integration with HTTP handlers</h2>
      <p>
        A good pattern: create one shared pool at app startup and use it across handlers.
      </p>
      <CodeBlock>
        {`// internal/kernel/http.go
var Pool = workerpool.New(config.WorkerPoolSize())

// In a handler
func GenerateReport(c *ctx.Context) {
    err := kernel.Pool.Submit(func() {
        report := buildReport(c.ParamInt("id"))
        cache.Set("report:"+id, report, time.Hour)
    })
    if errors.Is(err, workerpool.ErrPoolFull) {
        c.JSON(http.StatusTooManyRequests, map[string]string{"error": "too many requests"})
        return
    }
    c.JSON(http.StatusAccepted, map[string]string{"status": "processing"})
}`}
      </CodeBlock>
    </article>
  );
}

