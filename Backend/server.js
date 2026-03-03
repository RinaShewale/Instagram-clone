require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")

connectToDb()
app.get("/", (req, res) => {
    res.send("Server is running ");
});

app.listen(3000, () => {
    console.log("server is running on port 3000");

})