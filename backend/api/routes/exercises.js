const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.get('/', (req, res) => {
    Exercise.find()
    .then(ex => res.json(ex))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
    .then(ex => res.json(ex))
    .catch(err => res.status(400).json('Error: ', + err));
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) =>{
    Exercise.findByIdAndUpdate(req.params.id,
        {
            $set: {
                username: req.body.username,
                description: req.body.description,
                duration: req.body.duration,
                date: req.body.date
            }
        }, {useFindAndModify: false})
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;