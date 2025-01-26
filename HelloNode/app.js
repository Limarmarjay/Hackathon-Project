// Code to link buttons

var express = require('express');
var dotenv = require("dotenv");
var cors = require("cors");
var bodyParser = require("body-parser")
var createClient = require("@supabase/supabase-js").createClient;
var server = express();
dotenv.config();

server.use(cors());
server.use(bodyParser.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
server.get("/", (req, res) => 
    {
        res.send("Server is ready");
    });

var PORT = 3000;
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