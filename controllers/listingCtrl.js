const Listing = require('../models/Listing.js');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}

module.exports.renderNewForm = async (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
            },
        })
        .populate('owner');

    if (!listing) {
        req.flash('error', 'listing you requested for does not exists')
        return res.redirect('/listings')

    }
    res.render('listings/show.ejs', { listing });
}

module.exports.saveListing = async (req, res) => {

    if (!req.file) {
        req.flash('error', 'You must upload an image!');
        return res.redirect('/listings/new');
    }

    const { listing } = req.body;

    const newListing = new Listing(listing);
    newListing.owner = req.user._id;


    newListing.image = {
        url: req.file.path,
        filename: req.file.filename
    };

    await newListing.save();
    req.flash('success', 'new listing created !');
    res.redirect('/listings');
}



module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'listing you requested for does not exists')
        return res.redirect('/listings')

    }

    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace('/upload', '/upload/w_250');

    res.render('listings/edit.ejs', { listing, originalImgUrl });
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }

    // Update text fields from req.body.listing
    const { listing: updatedData } = req.body;
    Object.assign(listing, updatedData);

    // Update image if a new file is uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/listings/${id}`);
}


module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    let deltdListing = await Listing.findByIdAndDelete(id);
    console.log(deltdListing);
    req.flash('success', 'Listing Deleted');
    res.redirect('/listings');

}