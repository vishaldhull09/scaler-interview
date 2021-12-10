const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

mongoose.connect("mongodb+srv://vishal09:renault123@cluster0.napoz.mongodb.net/interview-management?retryWrites=true&w=majority", (error) => {
    if (error) console.log("Error connecting to database");
    else console.log("Connected to database");
});