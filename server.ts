import express from "express";
import cors from "cors";
import pg from "pg";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcrypt"

declare module "express-session" {
  interface SessionData {
    user?: {
      username: string;
    };
  }
}

const {Pool} = pg;
const PgSession = connectPgSimple(session);
const saltRounds = 10;

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

app.use(session({
    store: new PgSession({
        pool: pool, 
        tableName: "session",
        }),
    secret: "sigmaskibidi",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        // only for localhost
        secure: false,     
    }
}))

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);


app.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ loggedIn: false });
  }

  res.status(200).json({ loggedIn: true, user: req.session.user });
});

app.post("/register", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const check = await pool.query(`SELECT * FROM users WHERE username = $1`, [
            username,
        ]);

        if (check.rows.length > 0) {
            return res.status(400).json({error: "Username already exists."});
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) throw err;
                
                const query = "INSERT INTO users(username, password) VALUES ($1, $2)";
                const values = [username, hash];
                await pool.query(query, values);        
            });
        });
        res.json({message: `${username} inserted`});
    } catch (error) {
        console.log("Error posting user", error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const userProvidedUsername = req.body.username;
        const userProvidedPassword = req.body.password;

        const stored_hash = (await pool.query(`SELECT password FROM users WHERE username='${userProvidedUsername}'`)).rows[0].password;

        bcrypt.compare(userProvidedPassword, stored_hash, async function(err, result) {
            if (err) throw err;
            if (result === true) {
                const user = await (await pool.query(`SELECT username FROM users WHERE username='${userProvidedUsername}'`)).rows[0];
                req.session.user = { username: user.username }; 
                res.status(200).json({message: `${userProvidedUsername} Logged in!`})
            } else {
                return res.status(401).json({error: "Wrong password or username"})
            }
        });




    } catch (error) {
        console.log("Chungus error in getting users", error)
    }
})

app.listen(PORT, () => {
    console.log("Im listening to", PORT);
});
