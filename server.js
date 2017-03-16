const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//process stores i env varibables as key value pairs
const port = process.env.PORT || 3000;

var app = express();


//express.static is going to take the absoulte path to the file that we want to serve up
//__dirname gives us the path to the folder node-web-server then we concatnate /public to give it access to the public folder
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//app.use is how we register middleware 
//Order matters in middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + req.method + req.url
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
//will let us set up a handler for an http get request
//this is our root route
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Hey there my friend'
    });
});

//this is our about route
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

//this out bad route
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'this is a horrible request',
    });
});


app.listen(port, () => {
    console.log(`server is up on port 3000 ${port}`);
});