const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://syukur:syukur123@cluster0-y2qoe.gcp.mongodb.net/elearning?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log("Connection establishe successfully"))