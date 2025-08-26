const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URL, PORT } = require('./config');
const loginRoutes = require('./Route/userRoutes.js');
const serviceRequestRoutes = require('./Route/serviceRequestRoutes.js');
const adminRoutes = require('./Route/AdminRoutes.js');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/user", loginRoutes);
app.use("/api/requests", serviceRequestRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(MONGODB_URL)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  })
})
.catch((err) => {
  console.log('Error connecting to MongoDB', err);
});