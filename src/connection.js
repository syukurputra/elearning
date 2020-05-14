const mongoose = require("mongoose")

// const db = process.env.MONGODB_URL;
const db = "mongodb+srv://syukur:syukur123@cluster0-y2qoe.gcp.mongodb.net/elearning?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log("Connection establishe successfully"))