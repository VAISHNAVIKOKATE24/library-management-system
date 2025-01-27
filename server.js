const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(bookRoutes);
app.use(userRoutes);
app.use(borrowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
