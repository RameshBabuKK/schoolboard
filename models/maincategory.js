var mongoose = require('mongoose');

var MainCategorySchema = new mongoose.Schema ({
    id: Number,
    category: Array
}, {collection: 'maincategory'});

module.exports = mongoose.model('schoolmaincategory', MainCategorySchema);