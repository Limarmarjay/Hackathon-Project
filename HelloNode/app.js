// Code to link buttons

var express = require('express');
var dotenv = require("dotenv");
var cors = require("cors");
var bodyParser = require("body-parser")
var createClient = require("@supabase/supabase-js").createClient;
var server = express();
dotenv.config();
var PORT = 3000;

server.use(cors());
server.use(bodyParser.json());
server.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
server.get("/", (req, res) => 
    {
        res.send("Server is ready");
    });

server.listen(PORT, () => 
    {
        createClient();
        console.log('Server started at ${PORT}'); 
    });

// For Sign up
server.post("/Sign up", async(req, res) => 
    {
        const {username, password} = req.body;
        const {data: existingUser} = await supabase
        .from("users").select("*")
        .eq("username", username)
        .single();
    });

    if (existingUser) 
        {
            return res.status(400).json({error: "Account Already Exists!!"});
        }
    else 
    {
        const {username, password} = await supabase.auth.from("users").insert([{username, password}]);
    }

// For login
server.post("/Log in", async(req, res) =>
    {
        const {username, password} = req.body;
        const {data: existingUser} = await supabase.from("users").select("*").eq("username", username).single();

        if (!user) 
            {
                return res.status(400),jsin({error:"User Not Found!!"});
            }
        else 
        {
            const {username, password} = await supabase.auth.from("users").insert([{username, password}]);
        }



    });

// For Logout
server.post("/log out", (req, res) =>
    {
        req.session.user = null;
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });

// To add user
async function addNewUser(username, password) 
{
    const {data, error} = await supabase.auth.signup({username, password});

    if (error)
        {
            console.error("error", error.message);
        }
    else 
    {
        console.log("This user is registered", user);
    }
}



