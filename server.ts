import express from "express"
import cors from "cors";

const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello")
});

app.get("/test", (req, res) => {
    res.json({message: "Hello"})
});

app.listen(PORT, () => {
    console.log("Im listening to", PORT)
});
