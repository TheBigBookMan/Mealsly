const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/route');
const { prisma } = require('./db/prisma');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Mealsly API running at http://localhost:${PORT}`);
});