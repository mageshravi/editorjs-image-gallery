const path = require('path');

module.exports = {
    entry: {
        gallery: './static/js/src/galleryTool.js',
        index: './static/js/src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/js/dist'),
    },
}
