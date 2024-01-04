const express = require('express')
const router = new express.Router()
const cors = require('cors')
const Note = require('../models/note')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/', cors(), auth, async(req, res) => {
  try {
    Note.find({}).sort({createdAt: 'desc'}).exec((err, notes) => { 
      if(err) throw new Error("Error in finding notes");

      console.log(notes);
      res.status(200).send(notes);
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e)
  }
})

router.get('/search', cors(), auth, async(req, res) => {
  try {
    const result = await Note.aggregate([
      {
        $search: {
          index: "search-text",
          text: {
            query: req.query.q,
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ])
    res.status(200).json(result);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.get('/:id', cors(), auth, async(req, res) => {
    try {
      const note = Note.findOne({_id: req.params.id});
      if(!note){
        throw new Error('Unable to find the note');
      }
      res.status(200).send(note);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  })

router.post('/', cors(), auth ,async(req, res) => {
  try {
		console.log(req.user._id);
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id
    })
    await note.save();
    res.status(200).send(note)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/:id', cors(), auth, async(req, res) => {
  try {
    const note = await Note.findOneAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        description: req.body.description,
        owner: req.user._id
      }, {new: true}
    )

    if(!note){
      throw new Error('Unable to update note');
    }
    res.status(200).send(note);
  } catch (e) {
    console.log(e);
    res.status(500).send(e)
  }
})

router.delete('/:id', cors(), auth, async(req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.data.id);
    if(!note){
      res.status(404).send('note not found');
    }
    res.send(note);
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post('/:id/share', cors(), auth, async(req, res) => {
	try {
		const user = await User.findOne({email: req.body.sharedWith})
		if(!user){
			console.log(`user "${req.body.sharedWith}" not found`);
			throw new Error('Unable to share note')
		}

		const note = await Note.findOneAndUpdate({_id: req.params.id}, {
				$addToSet: {
					sharedWith: user._id
				}
			}, {new: true}
	  )

		res.send('Shared Successfully');
	} catch (e) {
		res.status(500).send(e)
	}
})

module.exports = router;