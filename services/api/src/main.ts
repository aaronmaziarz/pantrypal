import { createServer } from "node:http";

import { getHealthResponse } from "./health.js";

const server = createServer((_request, response) => {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(getHealthResponse()));
});

if (process.env.NODE_ENV !== "test") {
    const port = Number.parseInt(process.env.PORT ?? "8080", 10);
    server.listen(port);
}

export { server };
