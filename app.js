const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");    
const https = require ("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req ,res ) {
        res.sendFile(__dirname + "/signup.html");
        console.log(res.statusCode);
});

app.post("/" , function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.emailAdd;

    var data = {
     members: [
         {
             email_address: email,
             status: "subscribed",
             merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName
             }
         }
     ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/cf99cd953a";

    const options = {
        method : "POST",
        auth : "srikanth:1e417e8ecf8c46118933f5b10618e19a-us7"
    }

    const request = https.request(url, options, function(response) {
        
        if ( response.statusCode === 200) {
            res.send("succesfully submitted");
        } else {
            res.send("unsuccessfully submitted");
        }



        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});

   




app.listen(3000, function() {
    console.log("server is running on port 3000");
});
    
//api key
//1e417e8ecf8c46118933f5b10618e19a-us7

//list id 
//cf99cd953a