const express = require("express");
const path = require("path");

const app = express();

app.use("/page",express.static(path.resolve(__dirname, ".", "page")));

app.use("/app",express.static(path.resolve(__dirname, ".", "app")));

app.use("/images",express.static(path.resolve(__dirname, ".", "images")));



app.get("/*" , (req,res) => {
    res.sendFile(path.resolve(__dirname,".","index.html"));
});


app.listen(process.env.PORT || 5050, () => console.log("Server running..."));
