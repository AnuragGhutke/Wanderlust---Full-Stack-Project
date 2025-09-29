const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingCtrl.js');
const wrapAsync = require('../utils/wrapAsync.js');

const { isLoggedIn, isOwner, validateListing } = require('../utils/middlewares.js');

const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage })//destination

router.route('/')
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn('You must be logged in to create a listing!'),
        upload.single('image'),
        validateListing,
        wrapAsync(listingController.saveListing));

router.get('/new',
    isLoggedIn(),
    wrapAsync(listingController.renderNewForm));

router.route('/:id')
    .get(
        wrapAsync(listingController.showListing))
    .patch(
        isLoggedIn('You must be logged in to update a listing!'),
        isOwner,
        upload.single('image'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn('You must be logged in to delete a listing!'),
        isOwner,
        wrapAsync(listingController.deleteListing));

//Edit listing
router.get('/:id/edit',
    isLoggedIn('You must be logged in to edit a listing!'),
    isOwner,
    wrapAsync(listingController.editListing));

module.exports = router;