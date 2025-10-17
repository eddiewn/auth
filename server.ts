import express from "express"
import cors from "cors";
import pg from "pg"

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',        
    database: 'AuthDB',       
    password: 'eddiewn13', 
    port: 5432,     
});

  const res = await pool.query('SELECT NOW() AS now');
  console.log('Postgres connected — server time:', res.rows[0].now);


const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello")
});

app.post("/users", (req, res) => {
    try {
        pool.query('INSERT INTO users(username, password) VALUES ("Chunguns", "Bigsson")')
    } catch (error) {
        console.log("Error posting user", error)
    }
})

app.get("/test", (req, res) => {
    res.json({message: "Hello"})
});

app.listen(PORT, () => {
    console.log("Im listening to", PORT)
});
