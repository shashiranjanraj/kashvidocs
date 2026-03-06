import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Validation",
  description: "Struct tags, rules, error messages, and nullable fields.",
};

const rules = [
  { rule: "required", tag: 'validate:"required"', desc: "Field must be non-zero" },
  { rule: "email", tag: 'validate:"email"', desc: "Valid email address" },
  { rule: "min", tag: 'validate:"min=3"', desc: "String min length / numeric min value" },
  { rule: "max", tag: 'validate:"max=100"', desc: "String max length / numeric max value" },
  { rule: "between", tag: 'validate:"between=1,10"', desc: "Numeric between two values (inclusive)" },
  { rule: "in", tag: 'validate:"in=a,b,c"', desc: "Value must be one of the listed options" },
  { rule: "not_in", tag: 'validate:"not_in=bad,worse"', desc: "Value must NOT be in the list" },
  { rule: "confirmed", tag: 'validate:"confirmed=password"', desc: "Must match another field's value" },
  { rule: "url", tag: 'validate:"url"', desc: "Valid HTTP/HTTPS URL" },
  { rule: "alpha", tag: 'validate:"alpha"', desc: "Letters only" },
  { rule: "alpha_num", tag: 'validate:"alpha_num"', desc: "Letters and numbers only" },
  { rule: "alpha_dash", tag: 'validate:"alpha_dash"', desc: "Letters, numbers, -, _" },
  { rule: "numeric", tag: 'validate:"numeric"', desc: "Any number (int or float)" },
  { rule: "integer", tag: 'validate:"integer"', desc: "Must be an integer" },
  { rule: "boolean", tag: 'validate:"boolean"', desc: "true or false" },
  { rule: "ip", tag: 'validate:"ip"', desc: "Valid IPv4 or IPv6 address" },
  { rule: "uuid", tag: 'validate:"uuid"', desc: "Valid UUID" },
  { rule: "date", tag: 'validate:"date"', desc: "Valid date in YYYY-MM-DD format" },
  { rule: "date_format", tag: 'validate:"date_format=2006-01-02"', desc: "Custom Go time layout" },
  { rule: "starts_with", tag: 'validate:"starts_with=https"', desc: "String prefix check" },
  { rule: "ends_with", tag: 'validate:"ends_with=.go"', desc: "String suffix check" },
  { rule: "contains", tag: 'validate:"contains=@"', desc: "Substring check" },
  { rule: "regex", tag: 'validate:"regex=^[A-Z]+"', desc: "Custom regex pattern" },
  { rule: "json", tag: 'validate:"json"', desc: "Valid JSON string" },
  { rule: "len", tag: 'validate:"len=6"', desc: "Exact string length" },
  { rule: "same", tag: 'validate:"same=other_field"', desc: "Alias for confirmed" },
  { rule: "different", tag: 'validate:"different=old_password"', desc: "Must differ from field" },
  { rule: "nullable", tag: 'validate:"nullable,email"', desc: "Skip other rules if field is empty/nil" },
] as const;

export default function ValidationPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="validation">Validation</h1>
      <p>
        Kashvi&apos;s validation engine lives in <code>pkg/validate</code>. It has{" "}
        <strong>zero external dependencies</strong> and supports 28 rules via
        struct tags.
      </p>

      <h2 id="struct-tags">Struct Tags</h2>
      <p>Add a <code>validate</code> tag to any field:</p>
      <CodeBlock>
        {`type RegisterInput struct {
    Name            string  \`json:"name"             validate:"required,min=2,max=100"\`
    Email           string  \`json:"email"            validate:"required,email"\`
    Age             int     \`json:"age"              validate:"required,min=18,max=120"\`
    Role            string  \`json:"role"             validate:"in=admin,user,editor"\`
    Password        string  \`json:"password"         validate:"required,min=8"\`
    PasswordConfirm string  \`json:"password_confirm" validate:"confirmed=password"\`
    Website         *string \`json:"website"          validate:"nullable,url"\`
}`}
      </CodeBlock>

      <h2 id="all-validation-rules">All Validation Rules</h2>
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Example Tag</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r) => (
            <tr key={r.rule}>
              <td>
                <code>{r.rule}</code>
              </td>
              <td>
                <code>{r.tag}</code>
              </td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="using-validation">Using Validation Directly</h2>

      <h3 id="bindjson">In a handler with <code>BindJSON</code></h3>
      <CodeBlock>
        {`func (ctrl *UserController) Register(c *appctx.Context) {
    var input RegisterInput
    if !c.BindJSON(&input) {
        return // 422 already sent
    }
    // input is valid here
}`}
      </CodeBlock>

      <h3 id="manual-validation">Manual validation</h3>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/pkg/validate"

errs := validate.Struct(&input)
if validate.HasErrors(errs) {
    // errs = map[string]string{"email": "The email field must be a valid email address."}
}`}
      </CodeBlock>

      <h2 id="error-messages">Error Messages</h2>
      <p>
        Errors are returned as <code>map[string]string</code> where the key is
        the JSON field name:
      </p>
      <CodeBlock>
        {`{
  "status": 422,
  "message": "Validation failed",
  "errors": {
    "email": "The email field must be a valid email address.",
    "password": "The password field must be at least 8 characters.",
    "password_confirm": "The password_confirm field must match password."
  }
}`}
      </CodeBlock>

      <h2 id="nullable-fields">Nullable Fields</h2>
      <p>
        Use <code>nullable</code> to skip all other rules when the field is
        empty/nil:
      </p>
      <CodeBlock>
        {`type UpdateInput struct {
    // These are all optional — only validated if provided
    Bio     *string \`json:"bio"     validate:"nullable,max=500"\`
    Website *string \`json:"website" validate:"nullable,url"\`
    Age     *int    \`json:"age"     validate:"nullable,min=18"\`
}`}
      </CodeBlock>

      <h2 id="combining-rules">Combining Rules</h2>
      <p>
        Rules are comma-separated and evaluated in order. All failures are
        collected (not short-circuit):
      </p>
      <CodeBlock>{`validate:"required,min=8,max=64,alpha_num"`}</CodeBlock>
    </article>
  );
}

