const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const templateRoutes = require("./routes/templatesRoute");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();
const app = express();

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",").map((origin) =>
  origin.trim(),
);
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("<h1> Hello, World! </h1>");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Database connection
connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
