const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");

connectToMongo();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());

//Routes

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`V-Connect Server is running on port:${port}`);
});
