const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');

// TODO add in verifyfirebase middleware
// TODO need to break up api into controllers/model/service and add in the include flags where applicable

// * /
// Get all tags
router.get('/', tagController.getAllTags);
// Post create a tag
router.post('/', tagController.createTag);

module.exports = router;