const express = require('express');
const app = express();

var PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

// app.use(require('./src/controllers/authController'))
app.use(require('./src/routes/routes'))

const mongoose = require("mongoose")

const db = "mongodb+srv://syukur:syukur123@pasarsegar-ew3pq.mongodb.net/pasarsegar?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log("Connection establishe successfully"));

app.get('/', (req, res) => res.send('<h2> Welcome in elearning </h2>'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));