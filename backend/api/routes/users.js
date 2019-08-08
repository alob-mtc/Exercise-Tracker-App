const router = require('express').Router();
const User = require('../models/user.model');

router.get('/', (req, res) => { //get users from database
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async(req, res) => {    //add new user
    const username = req.body.username;
    const newUser = new User({username});
    const user = await User.find({username});
    if(user.length !== 0) return res.json({ dup: true });
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.json('Error: ' + err));
});

module.exports = router;