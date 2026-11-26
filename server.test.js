const { test } = require("node:test");
const assert = require("node:assert/strict");
const { handleRequest } = require("./server");

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    writeHead(statusCode, headers = {}) {
      this.statusCode = statusCode;
      this.headers = headers;
      return this;
    },
    end(body) {
      this.body = body;
      return this;
    }
  };
}

async function request(url) {
  const response = createResponse();
  await handleRequest({ url, headers: { host: "localhost" } }, response);
  return response;
}

test("serves the homepage and static assets with the right content types", async () => {
  const home = await request("/");
  assert.equal(home.statusCode, 200);
  assert.match(home.headers["Content-Type"], /text\/html/);
  assert.match(home.body.toString(), /Know the company/);

  const stylesheet = await request("/styles.css");
  assert.equal(stylesheet.statusCode, 200);
  assert.match(stylesheet.headers["Content-Type"], /text\/css/);

  const script = await request("/app.js");
  assert.equal(script.statusCode, 200);
  assert.match(script.body.toString(), /No verified company or IPO records/);
});

test("rejects unknown paths and attempts to leave the project directory", async () => {
  const missing = await request("/missing");
  assert.equal(missing.statusCode, 404);

  const traversal = await request("/%2e%2e%2fpackage.json");
  assert.equal(traversal.statusCode, 403);

  const malformed = await request("/%E0%A4%A");
  assert.equal(malformed.statusCode, 400);
});
