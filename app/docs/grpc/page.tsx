import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "gRPC Server",
  description: "Run Kashvi gRPC alongside HTTP with interceptors and reflection.",
};

export default function GrpcPage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="grpc-server">gRPC Server</h1>
      <p>
        Kashvi includes a production-ready gRPC server that runs{" "}
        <strong>alongside</strong> the HTTP server on a separate port. It ships
        with a health-check service, server reflection, and pre-wired Prometheus
        metrics.
      </p>

      <h2 id="grpc-config">Configuration</h2>
      <CodeBlock title=".env">{`GRPC_PORT=9090    # default: 9090`}</CodeBlock>

      <h2 id="grpc-auto-start">What starts automatically</h2>
      <p>
        When you run <code>kashvi run</code>, both servers boot:
      </p>
      <CodeBlock>
        {`🚀 Kashvi HTTP  on :8080  [env: local]  [workers: 8]
🔌 Kashvi gRPC  on :9090`}
      </CodeBlock>
      <p>
        At shutdown (<code>Ctrl+C</code>), the gRPC server drains in-flight RPCs
        before exiting.
      </p>

      <h2 id="grpc-interceptors">Built-in interceptors (applied automatically)</h2>
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Interceptor</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Recovery</td>
            <td>Catches panics → returns INTERNAL instead of crashing</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Logging</td>
            <td>Logs every RPC: method, duration_ms, code</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Prometheus</td>
            <td>
              <code>grpc_server_handled_total</code>,{" "}
              <code>grpc_server_handling_seconds</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2 id="grpc-services">Built-in services</h2>
      <h3 id="grpc-health">Health (grpc.health.v1.Health)</h3>
      <p>Always returns <code>SERVING</code>. Test with:</p>
      <CodeBlock>
        {`# brew install grpcurl
grpcurl -plaintext localhost:9090 grpc.health.v1.Health/Check
# → { "status": "SERVING" }`}
      </CodeBlock>

      <h3 id="grpc-reflection">Server Reflection</h3>
      <p>
        Enabled automatically — <code>grpcurl</code> works without proto files:
      </p>
      <CodeBlock>
        {`grpcurl -plaintext localhost:9090 list
# → grpc.health.v1.Health`}
      </CodeBlock>

      <h2 id="grpc-register-service">Registering your own service</h2>
      <CodeBlock>
        {`// pkg/grpc/server.go  — add after reflection.Register(srv)
mypb.RegisterUserServiceServer(srv, &UserServiceImpl{})`}
      </CodeBlock>
      <p>
        Or call <code>grpc.Start()</code> manually and register before the
        goroutine runs:
      </p>
      <CodeBlock>
        {`grpcSrv, lis, _ := kashvigrpc.Start(config.GRPCPort())
mypb.RegisterUserServiceServer(grpcSrv, &UserServiceImpl{})`}
      </CodeBlock>

      <h2 id="grpc-standalone">Standalone gRPC server (CLI)</h2>
      <p>Run the gRPC server without the HTTP server:</p>
      <CodeBlock>{`kashvi grpc:serve`}</CodeBlock>

      <h2 id="grpc-custom-interceptor">Adding a custom interceptor</h2>
      <p>Edit <code>pkg/grpc/server.go</code> — add to <code>chainUnary(...)</code>:</p>
      <CodeBlock>
        {`grpc.NewServer(
    grpc.UnaryInterceptor(
        chainUnary(
            recoveryInterceptor,
            loggingInterceptor,
            metricsInterceptor,
            myAuthInterceptor,  // ← add here
        ),
    ),
)`}
      </CodeBlock>

      <h2 id="grpc-metrics">Prometheus metrics</h2>
      <p>
        gRPC metrics are available on the existing <code>/metrics</code>{" "}
        endpoint alongside HTTP metrics:
      </p>
      <CodeBlock>
        {`grpc_server_handled_total{grpc_method="/grpc.health.v1.Health/Check", grpc_code="OK"} 7
grpc_server_handling_seconds_bucket{grpc_method="...", le="0.01"} 7`}
      </CodeBlock>
    </article>
  );
}

