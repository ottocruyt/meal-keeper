const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// connect to db
connectDB();

// init middleware

app.use(express.json({ extended: false }));

// routes
app.use("/api/selectedmeals", require("./routes/selectedmeals"));
app.use("/api/ingredients", require("./routes/ingredients"));
app.use("/api/units", require("./routes/units"));
app.use("/api/meals", require("./routes/meals"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  // serve static assets in production
  app.use(express.static(path.join(__dirname, "client", "build")));
  // if none of the routes above apply, return the client index
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
