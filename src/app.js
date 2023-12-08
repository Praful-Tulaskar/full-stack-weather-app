const express = require('express');
const path = require('path');
const hbs = require('hbs');     //partials ko use krne k liye hbs ko require krna pdega
const app = express();
const port = process.env.PORT || 8000;  // Jab host krte tb kuch port milega usko get krne k liye process.env.PORT ka use hota h.

// Public static path
const staticPath = (path.join(__dirname, "../public"));
const templatePath = (path.join(__dirname, "../templates/views"));
const partialsPath = (path.join(__dirname, "../templates/partials"));

app.set('view engine', 'hbs');      // Es se hm express k hbs engine ko set kr rhe h
app.set('views', templatePath);     // views folder ka path abi change hua h esiliye uska new path btna h
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));    // Es line se hum public ko src se join kr skte h. i.e. static website to connect krne k kam aata h 


// Routing
app.get("", (req, res) => {
    res.render("index.hbs");
})
app.get("/about", (req, res) => {
    res.render("about.hbs");
})
app.get("/weather", (req, res) => {
    res.render("weather");
})

// * operator ka use above me se kuch b match nahi ho uske liye ye run hoga
app.get("*", (req, res) => {        
    res.render("404error", {
        errormsg: "Opps! Page Not Found"
    });
})
app.get("/about/*", (req, res) => {        // es ka mtlab about k bad kuch b likhne pr b error show krega.
    res.render("404error", {
        errormsg: "Opps! Page Not Found"
    });
})

app.listen(port, () => {
    console.log(`Listening to the port at ${port}`);
})