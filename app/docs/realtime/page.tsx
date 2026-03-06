import type { Metadata } from "next";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "WebSocket & SSE",
  description: "Realtime features with WebSockets and Server-Sent Events.",
};

export default function RealtimePage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="websocket-sse">WebSocket &amp; SSE</h1>

      <h2 id="websocket">WebSocket (<code>pkg/ws</code>)</h2>
      <p>
        Kashvi&apos;s WebSocket support uses the{" "}
        <a href="https://github.com/gorilla/websocket" target="_blank" rel="noreferrer">
          gorilla/websocket
        </a>{" "}
        library with a Hub/Client pattern for broadcasting to multiple connected clients.
      </p>

      <h3 id="hub">1. Create and start a Hub</h3>
      <CodeBlock>
        {`// In your package (e.g. app/hubs/chat.go):
package hubs

import "github.com/shashiranjanraj/kashvi/pkg/ws"

var Chat = ws.NewHub()

func init() {
    go Chat.Run() // starts the event loop
}`}
      </CodeBlock>

      <h3 id="ws-route">2. Register the WebSocket route</h3>
      <CodeBlock>
        {`import (
    "github.com/shashiranjanraj/kashvi/app/hubs"
    appctx "github.com/shashiranjanraj/kashvi/pkg/ctx"
    "github.com/shashiranjanraj/kashvi/pkg/ws"
)

r.Get("/ws/chat", "ws.chat", appctx.Wrap(func(c *appctx.Context) {
    ws.Upgrade(c.W, c.R, hubs.Chat)
}))`}
      </CodeBlock>

      <h3 id="inbound">3. Handle inbound messages</h3>
      <CodeBlock>
        {`hubs.Chat.OnMessage = func(hub *ws.Hub, msg ws.Message) {
    // Echo back to all clients
    hub.Broadcast <- msg.Data

    // Or respond only to the sender
    msg.Client.Send([]byte(\`{"type":"ack"}\`))
}`}
      </CodeBlock>

      <h3 id="broadcast">4. Broadcast from anywhere</h3>
      <CodeBlock>
        {`// From a controller, job, or anywhere:
hubs.Chat.Broadcast <- []byte(\`{"type":"update","data":"live score changed"}\`)

// Check connected clients
count := hubs.Chat.ClientCount()`}
      </CodeBlock>

      <h3 id="ws-features">Features</h3>
      <ul>
        <li>
          <strong>Ping/Pong keepalive</strong> — automatically sends WebSocket{" "}
          <code>ping</code> frames every 54s
        </li>
        <li>
          <strong>Client buffer</strong> — each client has a 256-message send
          buffer; slow clients are disconnected
        </li>
        <li>
          <strong>Origin check</strong> — configurable (allow-all by default)
        </li>
      </ul>
      <CodeBlock>
        {`ws.SetCheckOrigin(func(r *http.Request) bool {
    return r.Header.Get("Origin") == "https://myapp.com"
})`}
      </CodeBlock>

      <h3 id="ws-js-client">WebSocket JavaScript client</h3>
      <CodeBlock>
        {`const socket = new WebSocket("ws://localhost:8080/ws/chat");

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("received:", data);
};

socket.send(JSON.stringify({ type: "message", text: "Hello!" }));`}
      </CodeBlock>

      <h2 id="sse">Server-Sent Events (<code>pkg/sse</code>)</h2>
      <p>
        SSE is a one-way push from server to browser over a regular HTTP
        connection. Great for live feeds, notifications, dashboards.
      </p>

      <h3 id="sse-route">Route handler</h3>
      <CodeBlock>
        {`r.Get("/events/feed", "sse.feed", appctx.Wrap(func(c *appctx.Context) {
    stream := sse.New(c.W, c.R)
    if stream == nil {
        return // client doesn't support SSE
    }

    ticker := time.NewTicker(time.Second)
    defer ticker.Stop()

    for {
        select {
        case t := <-ticker.C:
            stream.Send("tick", map[string]any{
                "time":  t.Format(time.RFC3339),
                "count": hubs.Chat.ClientCount(),
            })
        }

        if stream.IsClosed() {
            break // client disconnected
        }
    }
}))`}
      </CodeBlock>

      <h3 id="sse-methods">SSE Methods</h3>
      <CodeBlock>
        {`stream := sse.New(w, r)

// Named event with JSON data
stream.Send("update", map[string]any{"id": 1, "status": "done"})

// Plain data line
stream.SendRaw("hello world")

// Keepalive heartbeat (comment line)
stream.Comment("heartbeat")

// Check if client disconnected
if stream.IsClosed() { return }`}
      </CodeBlock>

      <h3 id="sse-js-client">JavaScript client</h3>
      <CodeBlock>
        {`const es = new EventSource("/events/feed");

es.addEventListener("tick", (event) => {
    const data = JSON.parse(event.data);
    console.log("tick:", data.time);
});

es.addEventListener("update", (event) => {
    const data = JSON.parse(event.data);
    console.log("update:", data);
});`}
      </CodeBlock>

      <h2 id="ws-vs-sse">WebSocket vs SSE</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>WebSocket</th>
            <th>SSE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Direction</td>
            <td>Bidirectional</td>
            <td>Server → Client only</td>
          </tr>
          <tr>
            <td>Protocol</td>
            <td>Custom (ws://)</td>
            <td>HTTP</td>
          </tr>
          <tr>
            <td>Reconnect</td>
            <td>Manual</td>
            <td>Automatic</td>
          </tr>
          <tr>
            <td>Use case</td>
            <td>Chat, games, live collab</td>
            <td>Notifications, feeds, dashboards</td>
          </tr>
          <tr>
            <td>Browser support</td>
            <td>All</td>
            <td>All (IE11+)</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

