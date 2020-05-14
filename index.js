const express = require('express');
const app = express();

var PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use(require('./src/controllers/authController'))

const mongoose = require("mongoose")

// const db = process.env.MONGODB_URL;
const db = "mongodb+srv://syukur:syukur123@cluster0-y2qoe.gcp.mongodb.net/elearning?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log("Connection establishe successfully"));

app.get('/', (req, res) => res.send('<h2> Welcome in elearning </h2>'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));