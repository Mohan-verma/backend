const { response } = require('express');
const express = require('express')

require('./src/db/conn')
const User = require('./src/models/userSchema')
app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json())


app.get("/", (req, res) => {
    res.send("HELLO THIS IS SERVER")
})
// app.get("/users", (req, res) => {
//     User.find()
//         .then(users => res.json(users))
// })

app.post("/users", async (req, res) => {


    try {
        console.log(req.body)
        const user = new User(req.body)
        const createuser = await user.save();
        res.status(201).send("USER NUMBER REGISTERED")

    }
    catch (e) {
        res.status(400).send(e)
    }

})

app.get('/users', async (req, res) => {
    try {
        const usersdata = await User.find();
        res.send(usersdata)
    }
    catch (e) {
        res.send(e)
    }
})
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