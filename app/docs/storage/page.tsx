import type { Metadata } from "next";
import { Callout } from "../_components/Callout";
import { CodeBlock } from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Storage",
  description: "Unified local and S3-compatible storage API.",
};

export default function StoragePage() {
  return (
    <article data-doc="true" className="docs-content">
      <h1 id="storage">Storage</h1>
      <p>
        <code>pkg/storage</code> provides a unified file-storage API inspired by
        Laravel&apos;s Storage facade. Switch between local disk and S3-compatible
        storage with a single env variable.
      </p>

      <h2 id="storage-config">Configuration</h2>
      <CodeBlock title=".env">{`STORAGE_DISK=local      # default driver: "local" or "s3"`}</CodeBlock>

      <h2 id="default-disk">Using the Default Disk</h2>
      <CodeBlock>
        {`import "github.com/shashiranjanraj/kashvi/pkg/storage"

// Write
storage.Put("avatars/user-1.jpg", imageBytes)
storage.PutStream("uploads/file.pdf", r.Body)

// Read
data, err := storage.Get("avatars/user-1.jpg")
stream, err := storage.GetStream("uploads/file.pdf")
defer stream.Close()

// Metadata
exists  := storage.Exists("avatars/user-1.jpg")
missing := storage.Missing("avatars/user-1.jpg")
size, _ := storage.Size("avatars/user-1.jpg")
modTime, _ := storage.LastModified("avatars/user-1.jpg")

// Public URL
url := storage.URL("avatars/user-1.jpg")

// Delete
storage.Delete("avatars/user-1.jpg")

// Copy / Move
storage.Copy("tmp/upload.jpg", "images/final.jpg")
storage.Move("tmp/upload.jpg", "archive/old.jpg")

// Directories
files, _ := storage.Files("avatars")          // non-recursive
all, _   := storage.AllFiles("avatars")       // recursive
dirs, _  := storage.Directories("uploads")
storage.MakeDirectory("exports")
storage.DeleteDirectory("tmp")`}
      </CodeBlock>

      <h2 id="specific-disk">Using a Specific Disk</h2>
      <CodeBlock>
        {`// Use S3 explicitly
storage.Use("s3").Put("backups/db.sql.gz", data)

// Use local disk explicitly
storage.Use("local").Get("cache/data.json")`}
      </CodeBlock>
      <Callout type="note" title="Why Use() and not Disk()?">
        Method name is <code>Use()</code> (not <code>Disk()</code>) to avoid
        conflict with the <code>Disk</code> interface type.
      </Callout>

      <h2 id="upload-handler">File Upload Handler</h2>
      <CodeBlock>
        {`func (c *UploadController) Store(ctx *appctx.Context) {
    ctx.R.ParseMultipartForm(10 << 20) // 10MB max

    file, header, err := ctx.R.FormFile("file")
    if err != nil {
        ctx.Error(400, "No file uploaded")
        return
    }
    defer file.Close()

    path := fmt.Sprintf("uploads/%d_%s", time.Now().Unix(), header.Filename)
    if err := storage.PutStream(path, file); err != nil {
        ctx.Error(500, "Upload failed")
        return
    }

    ctx.Created(map[string]any{
        "path": path,
        "url":  storage.URL(path),
    })
}`}
      </CodeBlock>

      <h2 id="local-disk">Local Disk</h2>
      <p>
        Files are stored relative to <code>STORAGE_LOCAL_ROOT</code> (default:{" "}
        <code>./storage</code>). Public access: <code>GET /storage/{`{path}`}</code>{" "}
        is automatically mounted when <code>STORAGE_DISK=local</code>.
      </p>
      <CodeBlock title=".env">
        {`STORAGE_LOCAL_ROOT=storage
STORAGE_URL=http://localhost:8080/storage`}
      </CodeBlock>

      <h2 id="s3-aws">S3 / AWS</h2>
      <CodeBlock title=".env">
        {`STORAGE_DISK=s3
S3_BUCKET=my-bucket
S3_REGION=us-east-1
S3_KEY=AKIAIOSFODNN7EXAMPLE
S3_SECRET=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
S3_URL=https://my-bucket.s3.us-east-1.amazonaws.com`}
      </CodeBlock>

      <h2 id="minio">MinIO (self-hosted S3)</h2>
      <p>Run locally with Docker:</p>
      <CodeBlock>
        {`docker run -p 9000:9000 -p 9001:9001 \\
  -e MINIO_ROOT_USER=minioadmin \\
  -e MINIO_ROOT_PASSWORD=minioadmin \\
  minio/minio server /data --console-address ":9001"`}
      </CodeBlock>
      <CodeBlock title=".env">
        {`STORAGE_DISK=s3
S3_BUCKET=my-bucket
S3_KEY=minioadmin
S3_SECRET=minioadmin
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1`}
      </CodeBlock>
      <p>Create the bucket at <code>http://localhost:9001</code> (MinIO console UI).</p>

      <h2 id="r2-spaces">Cloudflare R2 / DigitalOcean Spaces</h2>
      <p>Same as MinIO — just set <code>S3_ENDPOINT</code> to your provider&apos;s endpoint URL.</p>
      <CodeBlock title=".env">
        {`# Cloudflare R2
S3_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com

# DigitalOcean Spaces
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com`}
      </CodeBlock>

      <h2 id="custom-driver">Custom Driver</h2>
      <p>Implement the <code>Disk</code> interface and register it:</p>
      <CodeBlock>
        {`type MyDriver struct{}
func (d *MyDriver) Put(path string, content []byte) error { ... }
// ... implement all 16 Disk interface methods

// Register at boot:
storage.RegisterDisk("mydriver", &MyDriver{})

// Use:
storage.Use("mydriver").Put("file.txt", data)`}
      </CodeBlock>
    </article>
  );
}

