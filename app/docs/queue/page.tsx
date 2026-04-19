import type { Metadata } from "next";
import { Callout } from "../_components/Callout";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Queue & Jobs",
  description: "Background job processing with retry, backoff, and drivers.",
};

export default function QueuePage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="queue-jobs">Queue &amp; Jobs</h1>
      <p>
        Kashvi&apos;s queue system (<code>pkg/queue</code>) supports background
        job processing with retry, backoff, and persistent failure tracking.
      </p>

      <h2 id="defining-a-job">Defining a Job</h2>
      <CodeBlock>
        {`// app/jobs/welcome_email_job.go
package jobs

type WelcomeEmailJob struct {
    UserID uint   \`json:"user_id"\`
    Email  string \`json:"email"\`
}

func (j WelcomeEmailJob) Handle() error {
    // send email...
    return mailer.Send(j.Email, "Welcome!", "welcome.html")
}`}
      </CodeBlock>
      <p>Register the job type at boot (so it can be deserialized):</p>
      <CodeBlock>
        {`// In main.go init() or a jobs/register.go file:
queue.Register("jobs.WelcomeEmailJob", func() queue.Job {
    return &jobs.WelcomeEmailJob{}
})`}
      </CodeBlock>

      <h2 id="dispatching-jobs">Dispatching Jobs</h2>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/pkg/queue"

// Immediate
queue.Dispatch(jobs.WelcomeEmailJob{UserID: user.ID, Email: user.Email})

// After a delay (5 minutes)
queue.DispatchAfter(
  jobs.WelcomeEmailJob{UserID: user.ID, Email: user.Email},
  5*time.Minute,
)`}
      </CodeBlock>

      <h2 id="queue-drivers">Queue Drivers</h2>

      <h3 id="in-memory">In-Memory (default — dev only)</h3>
      <p>Jobs are lost on restart. Good for development and testing.</p>
      <CodeBlock>
        {`// Default — no configuration needed
queue.Dispatch(myJob)`}
      </CodeBlock>

      <h3 id="redis-driver">Redis Driver (production)</h3>
      <p>Jobs survive restarts. Delayed jobs use Redis sorted sets.</p>
      <CodeBlock>
        {`// In server.go or a boot function, after cache.Connect():
import (
    "github.com/shashiranjanraj/kashvi/pkg/cache"
    "github.com/shashiranjanraj/kashvi/pkg/queue"
)

queue.SetDriver(queue.NewRedisDriver(cache.RDB))`}
      </CodeBlock>
      <p>Redis keys used:</p>
      <ul>
        <li>
          <code>kashvi:queue:jobs</code> — immediate job list (LPUSH/BRPOP)
        </li>
        <li>
          <code>kashvi:queue:delayed</code> — delayed job sorted set (score = Unix timestamp)
        </li>
      </ul>

      <h2 id="starting-workers">Starting Workers</h2>
      <Callout type="note" title="CLI command availability">
        The <code>kashvi queue:work</code> subcommand is registered on the CLI binary when it is built and run from the{" "}
        <strong>Kashvi framework repository</strong>. In a normal application project, call{" "}
        <code>queue.StartWorkers(ctx, n)</code> from your code (or a dedicated <code>main</code> package).
      </Callout>
      <CodeBlock>
        {`# Framework dev / clone only:
kashvi queue:work --workers=5

# Application code (any project):
queue.StartWorkers(ctx, 5)`}
      </CodeBlock>

      <h2 id="retry-backoff">Retry &amp; Backoff</h2>
      <p>Failed jobs are automatically retried with linear backoff:</p>
      <ul>
        <li>Attempt 1 → wait 1s → Attempt 2 → wait 2s → Attempt 3</li>
      </ul>
      <CodeBlock>
        {`// Change retry limit (default: 3)
queue.SetMaxRetry(5)`}
      </CodeBlock>

      <h2 id="failed-jobs">Failed Jobs</h2>
      <p>After all retries are exhausted, the job is recorded in:</p>
      <ol>
        <li>
          In-memory — available via <code>queue.FailedJobs()</code>
        </li>
        <li>
          Database — <code>kashvi_failed_jobs</code> table (if <code>queue.UseDB()</code> is called)
        </li>
      </ol>
      <p>The database persistence is wired automatically at server boot.</p>

      <h3 id="failed-jobs-table">Table structure</h3>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>id</code>
            </td>
            <td>uint</td>
            <td>Auto-increment PK</td>
          </tr>
          <tr>
            <td>
              <code>job_type</code>
            </td>
            <td>string</td>
            <td>Go type name</td>
          </tr>
          <tr>
            <td>
              <code>payload</code>
            </td>
            <td>text</td>
            <td>JSON-encoded job data</td>
          </tr>
          <tr>
            <td>
              <code>error</code>
            </td>
            <td>text</td>
            <td>Last error message</td>
          </tr>
          <tr>
            <td>
              <code>attempts</code>
            </td>
            <td>int</td>
            <td>Number of attempts made</td>
          </tr>
          <tr>
            <td>
              <code>failed_at</code>
            </td>
            <td>timestamp</td>
            <td>When it failed</td>
          </tr>
        </tbody>
      </table>

      <h3 id="querying-failures">Querying failures</h3>
      <CodeBlock>
        {`// In memory
failed := queue.FailedJobs()
for _, f := range failed {
    fmt.Printf("%T failed after %d attempts: %v\n", f.Job, f.Attempts, f.Err)
}

// From DB
var records []queue.FailedJobRecord
database.DB.Order("failed_at desc").Find(&records)`}
      </CodeBlock>

      <h2 id="order-processing-example">Full Example — Order Processing</h2>
      <CodeBlock>
        {`type ProcessOrderJob struct {
    OrderID uint \`json:"order_id"\`
}

func (j ProcessOrderJob) Handle() error {
    var order models.Order
    if err := database.DB.First(&order, j.OrderID).Error; err != nil {
        return err // will be retried
    }
    // charge card, update inventory, send confirmation...
    return nil
}

// In your controller:
func (c *OrderController) Store(ctx *appctx.Context) {
    // ... create order ...
    queue.Dispatch(ProcessOrderJob{OrderID: order.ID})
    ctx.Created(order)
}`}
      </CodeBlock>
    </article>
  );
}

