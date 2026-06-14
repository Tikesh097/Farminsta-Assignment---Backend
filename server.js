const app = require('./app');
const connectDB = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

//Connect to the database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
