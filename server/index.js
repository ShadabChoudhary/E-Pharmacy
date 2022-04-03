const express = require("express");
const Connectdb = require("./Database/db.js");
const dotenv = require("dotenv");
// import DefaultData from "./defaultData.js";
const cors = require("cors");
const web = require("./routes/web.js");
const registerRoute = require("./routes/registerRoute.js");
const order = require("./routes/orderRoutes.js");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || "8000";

app.use(cors());

app.use(express.json());

app.use(cookieParser());

dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connectdb(username, password);

// DefaultData();

app.use("/api", web);
app.use("/api", registerRoute);
app.use("/api", order);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
