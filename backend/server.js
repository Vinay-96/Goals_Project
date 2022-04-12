const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(
  `/api/goals`,
  createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true })
);
app.use(
  `/api/users`,
  createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true })
);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to Production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
