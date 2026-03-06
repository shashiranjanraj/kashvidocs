import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Context API",
  description: "Request binding, helpers, responses, and per-request store.",
};

export default function ContextApiPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="context-api">Context API</h1>
      <p>
        <code>pkg/ctx</code> provides a <code>gin.Context</code>-inspired request
        context for Kashvi handlers. Instead of{" "}
        <code>(http.ResponseWriter, *http.Request)</code>, your handler receives
        a single <code>*ctx.Context</code>.
      </p>

      <h2 id="handler-signature">Handler Signature</h2>
      <CodeBlock>
        {`import appctx "github.com/shashiranjanraj/kashvi/pkg/ctx"

func MyHandler(c *appctx.Context) {
    // use c for everything
}

// Register with ctx.Wrap():
r.Get("/path", "name", appctx.Wrap(MyHandler))`}
      </CodeBlock>

      <h2 id="reading-request">Reading the Request</h2>

      <h3 id="url-parameters">URL Parameters</h3>
      <CodeBlock>
        {`id   := c.Param("id")     // /users/{id}
slug := c.Param("slug")   // /posts/{slug}`}
      </CodeBlock>

      <h3 id="query-string">Query String</h3>
      <CodeBlock>
        {`page    := c.Query("page")                  // "" if absent
sort    := c.DefaultQuery("sort", "created_at")`}
      </CodeBlock>

      <h3 id="request-body-json">Request Body (JSON)</h3>
      <CodeBlock>
        {`// Automatic — decodes + validates, sends 422 on failure
var input struct {
    Name  string \`json:"name"  validate:"required,min=2"\`
    Email string \`json:"email" validate:"required,email"\`
}
if !c.BindJSON(&input) {
    return  // response already sent
}

// Manual — returns errors to handle yourself
errs, err := c.ShouldBindJSON(&input)
if err != nil { /* bad JSON */ }
if len(errs) > 0 { /* validation errors */ }`}
      </CodeBlock>

      <h3 id="form-data">Form Data</h3>
      <CodeBlock>{`name := c.PostForm("name")`}</CodeBlock>

      <h3 id="headers-cookies">Headers &amp; Cookies</h3>
      <CodeBlock>
        {`token  := c.Header("Authorization")
accept := c.Header("Accept")

val, err := c.Cookie("session_id")`}
      </CodeBlock>

      <h3 id="metadata">Metadata</h3>
      <CodeBlock>
        {`method := c.Method()     // "GET"
path   := c.Path()       // "/api/users/42"
full   := c.FullPath()   // "GET /api/users/42"
ip     := c.ClientIP()   // respects X-Forwarded-For
isXHR  := c.IsXHR()      // X-Requested-With: XMLHttpRequest
ctx    := c.Context()    // underlying context.Context`}
      </CodeBlock>

      <h3 id="raw-body">Raw Body</h3>
      <CodeBlock>{`bytes, err := c.Body()`}</CodeBlock>

      <h2 id="sending-responses">Sending Responses</h2>

      <h3 id="json">JSON</h3>
      <CodeBlock>
        {`c.JSON(200, map[string]any{"key": "value"})

// Pre-wrapped envelopes:
c.Success(data)         // 200 {"status":200,"data":{...}}
c.Created(data)         // 201 {"status":201,"data":{...}}
c.Error(400, "Bad req") // 4xx {"status":400,"message":"..."}
c.ValidationError(errs) // 422 {"status":422,"message":"Validation failed","errors":{...}}

// Shortcuts:
c.Unauthorized()        // 401
c.Unauthorized("Token expired")
c.Forbidden()           // 403
c.NotFound()            // 404
c.NotFound("Post not found")`}
      </CodeBlock>

      <h3 id="other-response-types">Other response types</h3>
      <CodeBlock>
        {`c.String(200, "Hello, %s!", name)
c.Status(204)               // status only, no body
c.Redirect(302, "/login")
c.File("/path/to/file.pdf")`}
      </CodeBlock>

      <h3 id="headers-and-cookies">Headers &amp; Cookies</h3>
      <CodeBlock>
        {`c.SetHeader("X-Request-Id", "abc123")
c.SetCookie("token", value, 3600, "/", "", true, true)`}
      </CodeBlock>

      <h2 id="per-request-store">Per-Request Store</h2>
      <p>
        Pass values between middleware and handlers via the request-scoped store:
      </p>
      <CodeBlock>
        {`// In middleware (e.g. AuthMiddleware):
c.Set("user_id", claims.UserID)
c.Set("role", claims.Role)

// In handler:
userID := c.GetUint("user_id")
role   := c.GetString("role")

// Generic (any type):
val, ok := c.Get("key")
val      = c.MustGet("key") // panics if missing`}
      </CodeBlock>

      <h2 id="abort">Abort</h2>
      <CodeBlock>
        {`func AdminOnly(c *appctx.Context) {
    if c.GetString("role") != "admin" {
        c.Abort(403, "Admin access required")
        return
    }
    // continue
}`}
      </CodeBlock>

      <h2 id="validate-without-binding">Validate Without Binding</h2>
      <CodeBlock>
        {`type Input struct {
    Age int \`json:"age" validate:"required,min=18"\`
}
var input Input
// ... populate input ...
errs := c.Validate(&input)
if len(errs) > 0 {
    c.ValidationError(errs)
    return
}`}
      </CodeBlock>

      <h2 id="pool-efficiency">Pool Efficiency</h2>
      <p>
        <code>pkg/ctx</code> uses <code>sync.Pool</code> internally —{" "}
        <code>Context</code> objects are recycled between requests, resulting in
        zero allocations per request.
      </p>
    </article>
  );
}

