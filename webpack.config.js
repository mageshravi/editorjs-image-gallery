const path = require('path');

module.exports = {
    entry: {
        gallery: './static/js/src/ejsImageGallery.js',
        index: './static/js/src/index.js',
        withinForm: './static/js/src/withinForm.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/js/dist'),
    },
}
