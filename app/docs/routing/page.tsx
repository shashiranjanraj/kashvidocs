import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Routing",
  description: "Register routes, groups, middleware, and URL generation.",
};

export default function RoutingPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="routing">Routing</h1>
      <p>
        Routes are registered in <code>app/routes/api.go</code>.
      </p>

      <h2 id="basic-routes">Basic Routes</h2>
      <CodeBlock>
        {`func RegisterAPI(r *router.Router) {
    r.Get("/ping", "ping", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("pong"))
    })

    r.Post("/users",      "users.store",   handler)
    r.Put("/users/{id}",  "users.update",  handler)
    r.Patch("/users/{id}","users.patch",   handler)
    r.Delete("/users/{id}","users.destroy",handler)
}`}
      </CodeBlock>

      <h2 id="ctx-context">Using <code>ctx.Context</code> (recommended)</h2>
      <CodeBlock>
        {`import appctx "github.com/shashiranjanraj/kashvi/pkg/ctx"

r.Get("/users/{id}", "users.show", appctx.Wrap(func(c *appctx.Context) {
    id := c.Param("id")
    c.Success(map[string]any{"id": id})
}))`}
      </CodeBlock>

      <h2 id="route-groups">Route Groups</h2>
      <p>
        Groups let you share a path prefix and/or middleware across multiple routes:
      </p>
      <CodeBlock>
        {`// All routes under /api with rate limiting
api := r.Group("/api", middleware.RateLimit(120, time.Minute))

api.Get("/users", "users.index", appctx.Wrap(ctrl.Index))
api.Post("/users", "users.store", appctx.Wrap(ctrl.Store))

// Nested group: /api/admin with auth guard
admin := api.Group("/admin", middleware.AuthMiddleware, middleware.RequireRole("admin"))
admin.Get("/stats", "admin.stats", appctx.Wrap(adminCtrl.Stats))`}
      </CodeBlock>

      <h2 id="url-parameters">URL Parameters</h2>
      <CodeBlock>
        {`// Define: /articles/{slug}/comments/{id}
r.Get("/articles/{slug}/comments/{id}", "comments.show", appctx.Wrap(func(c *appctx.Context) {
    slug := c.Param("slug")
    id   := c.Param("id")
    // ...
}))`}
      </CodeBlock>

      <h2 id="named-routes">Named Routes &amp; URL Generation</h2>
      <p>
        Every route takes a name as the second argument. Names let you generate URLs safely:
      </p>
      <CodeBlock>
        {`// Registration
r.Get("/users/{id}", "users.show", handler)

// URL generation (anywhere in your code)
url, err := myRouter.URL("users.show", map[string]string{"id": "42"})
// url = "/users/42"`}
      </CodeBlock>

      <h2 id="mounting-third-party">Mounting Third-Party Handlers</h2>
      <CodeBlock>
        {`// Prometheus metrics (already wired by framework)
r.HandleFunc("/metrics", metrics.Handler())

// Any http.Handler
r.Mount("/storage", http.FileServer(http.Dir("storage")))`}
      </CodeBlock>

      <h2 id="listing-all-routes">Listing All Routes</h2>
      <CodeBlock>{`kashvi route:list`}</CodeBlock>
      <CodeBlock>
        {`METHOD   PATH                    NAME
------   ----                    ----
DELETE   /api/users/{id}         users.destroy
GET      /api/health             health
GET      /api/users              users.index
GET      /api/users/{id}         users.show
POST     /api/login              auth.login
POST     /api/register           auth.register
POST     /api/users              users.store
PUT      /api/users/{id}         users.update`}
      </CodeBlock>

      <h2 id="per-route-middleware">Per-Route Middleware</h2>
      <p>Middleware can be applied to individual routes as variadic arguments:</p>
      <CodeBlock>
        {`api.Get("/admin/report", "admin.report",
    appctx.Wrap(adminCtrl.Report),
    middleware.AuthMiddleware,
    middleware.RequireRole("admin"),
)`}
      </CodeBlock>
    </article>
  );
}

