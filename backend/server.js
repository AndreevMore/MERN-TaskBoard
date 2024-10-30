const express = require("express");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

// Routing
app.use("/tasks", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send("Something went wrong!");
});

const startApp = async () => {
  // Mongo DB connect
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Server start
startApp();
