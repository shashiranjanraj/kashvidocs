import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Authentication",
  description: "JWT auth, password hashing, middleware, and RBAC.",
};

export default function AuthenticationPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="authentication">Authentication</h1>
      <p>
        Kashvi includes JWT-based authentication with bcrypt passwords and RBAC
        role guards via <code>pkg/auth</code>.
      </p>

      <h2 id="generating-tokens">Generating Tokens</h2>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/pkg/auth"

// Access token (24h)
token, err := auth.GenerateToken(user.ID, user.Role)

// Refresh token (7d)
refresh, err := auth.GenerateRefreshToken(user.ID, user.Role)`}
      </CodeBlock>

      <h2 id="validating-tokens">Validating Tokens</h2>
      <CodeBlock>
        {`claims, err := auth.ValidateToken(tokenString)
if err != nil {
    // expired, invalid signature, etc.
}

userID := claims.UserID   // uint
role   := claims.Role     // string`}
      </CodeBlock>
      <p>
        <code>ValidateToken</code> only accepts access tokens: a refresh token
        is rejected with <code>auth.ErrRefreshToken</code>, so it cannot be
        used to call protected routes. Tokens must be signed with HS256.
      </p>

      <h2 id="refreshing-tokens">Refreshing Tokens</h2>
      <p>
        Use <code>ValidateRefreshToken</code> to exchange a refresh token for a
        new access token. It rejects access tokens with{" "}
        <code>auth.ErrNotRefreshToken</code>.
      </p>
      <CodeBlock>
        {`claims, err := auth.ValidateRefreshToken(refreshToken)
if err != nil {
    ctx.Error(http.StatusUnauthorized, "Invalid refresh token")
    return
}

token, err := auth.GenerateToken(claims.UserID, claims.Role)`}
      </CodeBlock>

      <h2 id="password-hashing">Password Hashing</h2>
      <CodeBlock>
        {`// Hash on register
hash, err := auth.HashPassword("secret123")

// Verify on login
if !auth.CheckPassword(storedHash, "secret123") {
    // wrong password
}`}
      </CodeBlock>

      <h2 id="auth-middleware">Auth Middleware</h2>
      <p>Apply <code>middleware.AuthMiddleware</code> to protect routes:</p>
      <CodeBlock>
        {`protected := api.Group("", middleware.AuthMiddleware)
protected.Get("/profile", "auth.profile", appctx.Wrap(ctrl.Profile))`}
      </CodeBlock>
      <p>The middleware:</p>
      <ol>
        <li>
          Reads <code>Authorization: Bearer &lt;token&gt;</code> header
        </li>
        <li>Validates the JWT</li>
        <li>
          Stores <code>user_id</code> and <code>role</code> in the request context
        </li>
        <li>Returns 401 if missing or invalid</li>
      </ol>
      <p>Reading the authenticated user in a handler:</p>
      <CodeBlock>
        {`func (ctrl *AuthController) Profile(c *appctx.Context) {
    userID := c.GetUint("user_id")
    role   := c.GetString("role")

    var user models.User
    database.DB.First(&user, userID)
    c.Success(user)
}`}
      </CodeBlock>

      <h2 id="rbac">Role-Based Access Control (RBAC)</h2>

      <h3 id="require-specific-role">Require a specific role</h3>
      <CodeBlock>
        {`adminRoutes := api.Group("/admin",
    middleware.AuthMiddleware,
    middleware.RequireRole("admin"),
)
adminRoutes.Get("/users", "admin.users", appctx.Wrap(ctrl.AllUsers))`}
      </CodeBlock>

      <h3 id="require-any-role">Require any of multiple roles</h3>
      <CodeBlock>{`middleware.RequireRole("admin", "moderator")`}</CodeBlock>

      <h3 id="allow-guest">Allow guest access</h3>
      <CodeBlock>
        {`// Route accessible without auth
api.Get("/posts", "posts.index", appctx.Wrap(ctrl.Index))`}
      </CodeBlock>

      <h2 id="login-flow">Full Login Flow Example</h2>
      <CodeBlock>
        {`// POST /api/login
func (c *AuthController) Login(ctx *appctx.Context) {
    var input struct {
        Email    string \`json:"email"    validate:"required,email"\`
        Password string \`json:"password" validate:"required"\`
    }
    if !ctx.BindJSON(&input) {
        return
    }

    var user models.User
    if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
        ctx.Error(http.StatusUnauthorized, "Invalid credentials")
        return
    }

    if !auth.CheckPassword(user.Password, input.Password) {
        ctx.Error(http.StatusUnauthorized, "Invalid credentials")
        return
    }

    token, _   := auth.GenerateToken(user.ID, user.Role)
    refresh, _ := auth.GenerateRefreshToken(user.ID, user.Role)

    ctx.Success(map[string]any{
        "access_token":  token,
        "refresh_token": refresh,
        "user":          user,
    })
}`}
      </CodeBlock>

      <h2 id="jwt-configuration">JWT Configuration</h2>
      <table>
        <thead>
          <tr>
            <th>Env Var</th>
            <th>Default</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>JWT_SECRET</code>
            </td>
            <td>
              <em>insecure</em>
            </td>
            <td>
              Must change in production — server refuses to start otherwise.
            </td>
          </tr>
          <tr>
            <td>
              <code>JWT_TTL</code>
            </td>
            <td><code>24h</code></td>
            <td>Access-token lifetime</td>
          </tr>
          <tr>
            <td>
              <code>JWT_REFRESH_TTL</code>
            </td>
            <td><code>168h</code></td>
            <td>Refresh-token lifetime</td>
          </tr>
          <tr>
            <td>
              <code>JWT_ISSUER</code>
            </td>
            <td>(empty)</td>
            <td>When set, added as <code>iss</code> and required on validation</td>
          </tr>
          <tr>
            <td>
              <code>JWT_AUDIENCE</code>
            </td>
            <td>(empty)</td>
            <td>When set, added as <code>aud</code> and required on validation</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

