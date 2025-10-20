import express from "express";
import cors from "cors";
import pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "AuthDB",
    password: "eddiewn13",
    port: 5432,
});

(async () => {
    try {
        const res = await pool.query("SELECT NOW() AS now");
        console.log("Postgres connected — server time:", res.rows[0].now);
    } catch (err) {
        console.error("Error connecting to Postgres:", err);
    }
})();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.post("/users", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const check = await pool.query(`SELECT * FROM users WHERE username = $1`, [
            username,
        ]);

        if (check.rows.length > 0) {
            return res.status(400).json({error: "Username already exists."});
        }

        const text = "INSERT INTO users(username, password) VALUES ($1, $2)";
        const values = [username, password];
        await pool.query(text, values);

        res.json({message: `${username} inserted`});

    } catch (error) {
        console.log("Error posting user", error);
    }
});

app.get("/users", async (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;

        const query = `SELECT username FROM users WHERE username=$1 AND password=$2`
        const values = [username, password]

        const validate = await pool.query(query, values);
        if(validate.rows.length == 0) return res.status(401).json({error: "Wrong password or username"});

        res.status(200).json({message: `${username} Logged in!`})

    } catch (error) {
        console.log("Chungus error in getting users", error)
    }
})

app.listen(PORT, () => {
    console.log("Im listening to", PORT);
});
