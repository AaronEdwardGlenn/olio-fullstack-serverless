"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const PORT = 8000;
app.get("/", (req, res) => {
    res.send("Hello Typescript with Node.js!");
});
app.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map