# editorjs-image-gallery
Image Gallery Plugin for EditorJS

## Getting started

### Examples

```bash
# clone the repository
git clone git@github.com:mageshravi/editorjs-image-gallery.git

cd editorjs-image-gallery

# install npm packages
npm i

# build css
npm run build:css

# compile js
npx webpack --mode development

# open in browser
firefox index.html
firefox within_form.html
```

### Using in your project

Requirements:

- editorjs
- webpack
- node-sass

See examples on how webpack and node-sass are used.

Copy the following files into your project.

```
static/css/src/_ejs-img-gallery.scss
static/js/src/ejsImageGallery.js
```

In your entrypoint javascript file, use as shown below.

```javascript
// you should have editorjs installed via npm
import ImageGallery from './ejsImageGallery';

const editor = new EditorJS({
    holder: 'codex-editor',
    tools: {
        gallery: ImageGallery
    }
});
```
