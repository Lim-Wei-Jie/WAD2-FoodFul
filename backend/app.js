require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// use express
const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and let passport use session
app.use(passport.initialize());
app.use(passport.session());


// Connect to mongoDB Atlas
const mongoURI = 'mongodb+srv://admin-weijie:' + process.env.CLUSTER_PASSWORD + '@usercluster.kcnff.mongodb.net/userDB'
mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB Connected')
})
.catch(err => console.log(err))

// ================ User Account ==================

// User Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    inventory: Array,
})

// Passport plugin - set up schema to use passportLocalMongoose
userSchema.plugin(passportLocalMongoose);

// Model
const User = mongoose.model("User", userSchema);

// Create local login strategy
passport.use(User.createStrategy());

// Serializing and deserializing users
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById( _id, (err, user) => {
    if(err){
        done(null, false, {error:err});
    } else {
        done(null, user);
    }
  });
});


// Registration Route
app.post("/api/register", (req, res) => {
    
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.email
    })

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            // console.log(err);
            return res.status(500).send({error: err})
        }

        // passport.authenticate("local")(req, res, () => {
        //     res.status(200).send({result: 'success' })
        // })

        const authenticate = User.authenticate();
        authenticate(req.body.email, req.body.password, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.status(200).send({result: 'success' })
            }
        })
    })
})

var email = 'test@email.com' // hardcode 1st
// Login Route
app.post('/api/login', (req, res) => {
    // passport.authenticate('local', (err, user, info) => {
    //     if (err) {
    //       return next(err); // will generate a 500 error
    //     }
    //     // Generate a JSON response reflecting authentication status
    //     if (!user) {
    //       return res.status(401).send({ error: 'Authentication failed' });
    //     }
    //     req.login(user, (err) => {
    //       if (err) {
    //         return next(err);
    //       }
    //       return res.status(202).send({ error: 'Authentication succeeded' });    
    //     });
    // });

    const authenticate = User.authenticate();
    authenticate(req.body.email, req.body.password, (err, result) => {
        if (result == false) {
            res.status(500).send('Login Fail')
        } else {
            email = req.body.email
            res.status(200).send({result: result })
        }
    })
})

// Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        req.logOut()
        res.status(200).send('Log Out successful')
    })
})


// ================ Inventory CRUD ==================

// Upload items route (create)
app.post("/api/upload", (req, res) => {
    // use the email to find the user to insert data into inventory
    const inventory = req.body
    const filter = {username: email}

    User.updateOne(filter, {$push: {inventory: inventory}}, {upsert:true}, function() {
        res.status(200).send('Added to inventory successfully')
    })
})

// Retrieve data route (read)
app.post("/api/read", (req, res) => {
    // use the email to find the user to get existing inventory data
    const filter = {username: email}

    User.find(filter, function(err, found) {
        if (err) {
            res.status(500).send(err)
        } else {
            let inventory = found[0].inventory
            res.status(200).send({inventory: inventory})
        }
    })
})

// Edit data route (update)
app.post("/api/edit", (req, res) => {
    // use the email to find the user to edit existing inventory data
    const itemId = req.body.id
    const editItem = req.body
    
    User.updateOne(
        {username: email, 'inventory.id': itemId},
        {$set: {'inventory.$': editItem}},
        function(err, success) {
            if (success) {
                res.status(200).send('Updated ' + req.body.name)
            } else {
                res.status(500).send(err)
            }
        }
    )
})

// Delete data route (delete)
app.post("/api/delete", (req, res) => {
    // use the email to find the user to delete existing inventory data
    const obj = req.body
    const itemId = Number(Object.keys(obj)[0])
    
    User.updateOne(
        {username: email},
        {$pull: {inventory: {id: itemId}}},
        function(err, success) {
            if (success) {
                res.status(200).send('Item Deleted')
            } else {
                res.status(500).send(err)
            }
        }
    )
})

// start server
app.listen(3000, function() {
    console.log("Server started on port 3000");
})