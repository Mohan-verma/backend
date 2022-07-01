
const express = require('express')
const multer = require('multer')
require('./src/db/conn')
const User = require('./src/models/userSchema')
const PORT = process.env.PORT || 3000;
const path = require('path')


app = express();
app.use(express.json())

//multer storage

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage });


var multipleimages = upload.fields([{ name: "front" }, { name: "back" }, { name: "selfie" }])

//routes started 

// default page
app.get("/", (req, res) => {
    res.send("HELLO THIS IS SERVER")
})
// app.get("/users", (req, res) => {
//     User.find()
//         .then(users => res.json(users))
// })




//post users


app.post("/users", async (req, res) => {
    console.log(req.files)

    console.log(req.body)
    // if (req.files) {
    //     console.log("this is files", req.files)

    //     console.log("files uploaded")
    // }

    try {
        // console.log(req.files)//(req.files["front", "back", "selfie"])
        const user = new User(req.files)
        const createuser = await user.save();
        res.status(201).send("USER NUMBER REGISTERED")

    }
    catch (e) {
        res.status(400).send(e)
    }

})

//get users


app.get('/users', async (req, res) => {
    try {
        const usersdata = await User.find();
        res.send(usersdata)
    }
    catch (e) {
        res.send(e)
    }
})

// get by idd 
app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const userdata = await User.findById({ _id: _id })
        res.send(userdata)

    }
    catch (e) {
        res.send(e)
    }
})



// delete
app.delete('/users/:id', async (req, res) => {
    try {

        const deleteuser = await User.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(deleteuser)


    }
    catch (e) {
        res.send(e)
    }
})
app.listen(PORT, () => {
    console.log(`you are listening to ${PORT}`)
})