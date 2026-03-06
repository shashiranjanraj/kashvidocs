import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "TestKit (JSON Scenarios)",
  description: "Scenario-driven API integration tests written entirely in JSON.",
};

export default function TestKitPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="testkit">TestKit — JSON-Scenario-Driven API Testing</h1>
      <p>
        <code>pkg/testkit</code> lets you write REST API integration tests{" "}
        <strong>entirely in JSON</strong>. One JSON file = one test case. No
        repeated Go boilerplate.
      </p>
      <p>
        It is powered by{" "}
        <a href="https://github.com/stretchr/testify" target="_blank" rel="noreferrer">
          testify
        </a>{" "}
        — <code>testify/assert</code> for assertions and <code>testify/mock</code>{" "}
        for mocking side-effects.
      </p>

      <h2 id="concept">Concept</h2>
      <CodeBlock>
        {`testdata/
  create_user.json          ← scenario (what to do & assert)
  create_user_req.json      ← request body
  create_user_res.json      ← expected response body
  health_check.json         ← another scenario`}
      </CodeBlock>
      <p>One Go test function runs all of them:</p>
      <CodeBlock>
        {`func TestAPI(t *testing.T) {
    handler := kernel.NewHTTPKernel().Handler()
    testkit.RunDir(t, handler, "testdata")
}`}
      </CodeBlock>

      <h2 id="data-driven-suites">Data-Driven Test Suites</h2>
      <p>
        To execute multiple APIs spanning different isolated environments and
        handler overrides, <code>RunSuite</code> provides a master configuration
        approach driven entirely through JSON.
      </p>
      <CodeBlock>
        {`func TestSuiteRun(t *testing.T) {
	// A map translating string identifiers in your config map into live Handler pointers
	handlers := map[string]http.HandlerFunc{
		"HandlerShipmentTracking":  api.ShipmentTrackingController,
		"HandlerBillingProcessing": api.BillingController,
	}

	// Loads and executes the testing Master Config definition JSON 
	testkit.RunSuite(t, "testdata/test_scenarios_master.json", handlers)
}`}
      </CodeBlock>

      <h3 id="master-config-schema">Master Configuration Schema</h3>
      <p>
        The master file defines arrayed routes mapping URLs to handlers and
        scenario sets.
      </p>
      <CodeBlock>
        {`[
  {
    "serviceName": "ShipmentTracking",
    "httpMethodType": "POST",
    "servicePath": "/api/v1/shipments/track",
    "filePath": "testdata/shipments",
    "scenariosFileName": "shipment_tracking_scenarios.json",
    "handlerName": "HandlerShipmentTracking"
  }
]`}
      </CodeBlock>

      <h2 id="scenario-schema">Scenario JSON schema</h2>
      <CodeBlock>
        {`{
  "name":             "Create User",
  "description":      "POST /api/v1/users returns 201",
  "requestMethod":    "POST",
  "requestUrl":       "/api/v1/users",
  "requestFileName":  "create_user_req.json",
  "responseFileName": "create_user_res.json",
  "expectedCode":     201,
  "isMockRequired":   true,
  "isDbMocked":       false,
  "headers": {
    "Authorization": "Bearer test-token"
  },
  "netUtilMockStep": [
    {
      "method":    "httprequest",
      "isMock":    true,
      "matchUrl":  "https://verify.external.com/",
      "returnData": { "statusCode": 200, "body": "eyJ2ZXJpZmllZCI6dHJ1ZX0=" }
    },
    {
      "method":    "sendmail",
      "isMock":    true,
      "returnData": { "body": "" }
    }
  ]
}`}
      </CodeBlock>

      <h3 id="field-reference">Field reference</h3>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>name</code>
            </td>
            <td>string</td>
            <td>Required. Test name (shown in <code>go test -v</code> output)</td>
          </tr>
          <tr>
            <td>
              <code>description</code>
            </td>
            <td>string</td>
            <td>Human-readable description</td>
          </tr>
          <tr>
            <td>
              <code>requestMethod</code>
            </td>
            <td>string</td>
            <td>HTTP method. Default: GET</td>
          </tr>
          <tr>
            <td>
              <code>requestUrl</code>
            </td>
            <td>string</td>
            <td>Required. URL path to call (e.g. <code>/api/v1/users</code>)</td>
          </tr>
          <tr>
            <td>
              <code>requestFileName</code>
            </td>
            <td>string</td>
            <td>Path to request body JSON file (relative to scenario dir)</td>
          </tr>
          <tr>
            <td>
              <code>responseFileName</code>
            </td>
            <td>string</td>
            <td>Path to expected response JSON file (relative to scenario dir)</td>
          </tr>
          <tr>
            <td>
              <code>expectedCode</code>
            </td>
            <td>int</td>
            <td>Required. Expected HTTP status code</td>
          </tr>
          <tr>
            <td>
              <code>isMockRequired</code>
            </td>
            <td>bool</td>
            <td>If true, any un-mocked outgoing call fails the test</td>
          </tr>
          <tr>
            <td>
              <code>isDbMocked</code>
            </td>
            <td>bool</td>
            <td>Informational flag — reserved for DB mock wiring</td>
          </tr>
          <tr>
            <td>
              <code>headers</code>
            </td>
            <td>object</td>
            <td>Extra request headers (e.g. auth tokens)</td>
          </tr>
          <tr>
            <td>
              <code>netUtilMockStep</code>
            </td>
            <td>array</td>
            <td>List of mock steps</td>
          </tr>
        </tbody>
      </table>

      <h2 id="mock-steps">Mock steps</h2>

      <h3 id="http-request-mock">
        HTTP request mock (<code>method: &quot;httprequest&quot;</code>)
      </h3>
      <p>
        Intercepts outgoing calls made via <code>pkg/http</code>. Matched by URL{" "}
        <strong>prefix</strong>.
      </p>
      <CodeBlock>
        {`{
  "method":   "httprequest",
  "isMock":   true,
  "matchUrl": "https://api.stripe.com/",
  "returnData": {
    "statusCode": 200,
    "body": "eyJpZCI6ImNoXzEyMyJ9"
  }
}`}
      </CodeBlock>
      <ul>
        <li>
          <code>matchUrl</code> — prefix match. Empty string matches any URL.
        </li>
        <li>
          <code>returnData.body</code> — base64-encoded response body.
        </li>
        <li>
          <code>returnData.statusCode</code> — defaults to 200.
        </li>
      </ul>

      <h3 id="function-mock">
        Function mock (<code>method: &quot;sendmail&quot;</code> /{" "}
        <code>&quot;sms&quot;</code> / <code>&quot;notification&quot;</code>)
      </h3>
      <p>Intercepts non-HTTP side-effects. Built-in methods:</p>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Intercepts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>sendmail</code>
            </td>
            <td>
              <code>pkg/mail</code> sends
            </td>
          </tr>
          <tr>
            <td>
              <code>sms</code>
            </td>
            <td>SMS/notification sends</td>
          </tr>
          <tr>
            <td>
              <code>notification</code>
            </td>
            <td>Push notification sends</td>
          </tr>
        </tbody>
      </table>
      <CodeBlock>{`{ "method": "sendmail", "isMock": true, "returnData": { "body": "" } }`}</CodeBlock>

      <h3 id="custom-function-mock">Custom function mock</h3>
      <p>Register your own mocker once in a test init:</p>
      <CodeBlock>
        {`func init() {
    testkit.RegisterMocker("payments", testkit.NewFuncMocker("payments"))
}`}
      </CodeBlock>
      <p>
        Then use in JSON:{" "}
        <code>&quot;method&quot;: &quot;payments&quot;</code>.
      </p>

      <h2 id="base64-encoding">Base64 encoding the body</h2>
      <CodeBlock>
        {`# Encode: {"verified":true}
echo -n '{"verified":true}' | base64
# → eyJ2ZXJpZmllZCI6dHJ1ZX0=`}
      </CodeBlock>

      <h2 id="runner-api">Runner API</h2>
      <CodeBlock>
        {`// Run a single scenario
testkit.Run(t, handler, "testdata/create_user.json")

// Run all *.json files in a directory as subtests
testkit.RunDir(t, handler, "testdata")

// Run array-based scenarios defined in a master configuration via dynamically mapped handlers
testkit.RunSuite(t, "testdata/test_scenarios.json", handlersMap)`}
      </CodeBlock>

      <h3 id="lifecycle">Lifecycle per scenario</h3>
      <ol>
        <li>Load scenario JSON</li>
        <li>Read request body from <code>requestFileName</code></li>
        <li>Install HTTP mock transport (<code>MockTransport</code>)</li>
        <li>Activate function mocks (<code>sendmail</code>, <code>sms</code>, …)</li>
        <li>Fire request against handler via <code>httptest</code></li>
        <li>Assert HTTP status code</li>
        <li>JSON deep-diff actual vs expected response</li>
        <li>Verify all <code>isMock: true</code> steps were called</li>
        <li>Reset all mocks</li>
      </ol>

      <h2 id="advanced-testify">Advanced: testify mock expectations</h2>
      <p>Access the underlying <code>testify/mock.Mock</code> for custom assertions:</p>
      <CodeBlock>
        {`func TestCreateUser(t *testing.T) {
    // Override the sendmail mocker
    mailer := testkit.NewFuncMocker("sendmail")
    mailer.Mock().On("Intercept", mock.Anything).Return(nil)
    testkit.RegisterMocker("sendmail", mailer)

    testkit.Run(t, handler, "testdata/create_user.json")

    // Assert it was called exactly once
    mailer.Mock().AssertNumberOfCalls(t, "Intercept", 1)
}`}
      </CodeBlock>

      <h2 id="assertions">Assertions</h2>
      <table>
        <thead>
          <tr>
            <th>Assertion</th>
            <th>Behaviour</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Status code</td>
            <td>
              <code>testify/assert.Equal</code> — prints expected vs actual
            </td>
          </tr>
          <tr>
            <td>Response body</td>
            <td>
              JSON normalised (key order / whitespace ignored),{" "}
              <code>testify/assert.Equal</code>
            </td>
          </tr>
          <tr>
            <td>HTTP mocks called</td>
            <td>
              Fails per un-triggered <code>isMock: true</code> httprequest step
            </td>
          </tr>
          <tr>
            <td>Func mocks called</td>
            <td>
              Fails per un-triggered <code>isMock: true</code> func step
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="debugging">Debugging</h2>
      <p>Print a scenario summary to stdout:</p>
      <CodeBlock>
        {`s, _ := testkit.LoadScenario("testdata/create_user.json")
testkit.DumpScenario(s)`}
      </CodeBlock>
      <p>Output:</p>
      <CodeBlock>
        {`Scenario: Create User
  POST /api/v1/users → 201
  requestFile:  create_user_req.json
  responseFile: create_user_res.json
  isMockRequired: true  isDbMocked: false
  mockStep[0]: method=httprequest  isMock=true  matchUrl="https://verify.external.com/"
  mockStep[1]: method=sendmail     isMock=true  matchUrl=""`}
      </CodeBlock>
    </article>
  );
}

