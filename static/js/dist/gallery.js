/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/src/ejsImageGallery.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/src/ejsImageGallery.js":
/*!******************************************!*\
  !*** ./static/js/src/ejsImageGallery.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ImageGallery; });\n/**\n * ImageGallery block element for EditorJS\n */\nclass ImageGallery {\n\n    constructor ({data}) {\n        this.data = data;\n        this.wrapper = undefined;\n        this.cssClassnames = {\n            wrapper: 'ejs-img-gallery',\n            imageList: 'ejs-img-gallery__list',\n            imageListItem: 'ejs-img-gallery__list-item',\n            thumb: 'ejs-img-gallery__thumb',\n            deleteIcon: 'ejs-img-gallery__delete-icon',\n            urlIp: 'ejs-img-gallery__url-ip'\n        }\n    }\n\n    static get toolbox() {\n        return {\n            title: 'Image Gallery',\n            icon: '<svg width=\"17\" height=\"15\" viewBox=\"0 0 336 276\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z\"/></svg>'\n        };\n    }\n\n    render() {\n        this.wrapper = document.createElement('div');\n        this.wrapper.classList = this.cssClassnames.wrapper;\n\n        const images = document.createElement('ul');\n        images.classList = this.cssClassnames.imageList;\n\n        const self = this;\n        if (this.data && this.data.images) {\n            // fill block with saved data\n            this.data.images.forEach((img) => {\n                const li = self._createThumbnailListItem(img.url);\n                images.appendChild(li);\n            });\n        }\n\n        const input = document.createElement('input');\n        input.classList = this.cssClassnames.urlIp;\n        input.placeholder = 'Image URL';\n\n        const button = document.createElement('button');\n        button.type = 'button';\n        button.innerHTML = 'Add to Gallery';\n        button.addEventListener('click', self._addImg.bind(self));\n\n        this.wrapper.appendChild(images);\n        this.wrapper.appendChild(input);\n        this.wrapper.appendChild(button);\n\n        return this.wrapper;\n    }\n\n    save(blockContent) {\n        const imgs = blockContent.querySelectorAll(`.${this.cssClassnames.thumb}`);\n\n        const imageUrls = [];\n        imgs.forEach((img) => {\n            imageUrls.push({ url: img.getAttribute('src') })\n        })\n\n        return {\n            images: imageUrls\n        };\n    }\n\n    _addImg(ev) {\n        const addButton = ev.currentTarget;\n        const wrapper = addButton.parentElement;\n        const input = wrapper.querySelector(`.${this.cssClassnames.urlIp}`);\n\n        if (!input || !input.value) {\n            return;\n        }\n\n        // temporarily disable input and button\n        input.setAttribute('disabled', true);\n        addButton.setAttribute('disabled', true);\n\n        const self = this;\n        this._isValidImageUrl(input.value)\n            .then((imgSrc) => {\n                const li = self._createThumbnailListItem(imgSrc);\n\n                const ul = wrapper.querySelector(`.${self.cssClassnames.imageList}`);\n                ul.appendChild(li);\n\n                // clear input\n                input.value = '';\n            })\n            .catch((err) => {\n                alert(err);\n            })\n            .finally(() => {\n                // re-enable input and button\n                input.removeAttribute('disabled');\n                addButton.removeAttribute('disabled');\n            });\n    }\n\n    _isValidImageUrl(url) {\n        // check if image can load\n        return new Promise((resolve, reject) => {\n            const img = new Image();\n            img.src = url;\n            img.onload = () => resolve(url);\n            img.onerror = () => reject(`Could not fetch URL: ${url}`);\n        });\n    }\n\n    _createThumbnailListItem(thumbSrc) {\n        // thumb\n        const img = document.createElement('img');\n        img.classList = this.cssClassnames.thumb;\n        img.setAttribute('src', thumbSrc);\n\n        // delete-icon\n        const del = document.createElement('span');\n        del.classList = this.cssClassnames.deleteIcon;\n        del.innerHTML = '&times;';\n        del.addEventListener('click', this._deleteImg);\n\n        // list-item\n        const li = document.createElement('li');\n        li.classList = this.cssClassnames.imageListItem;\n        li.appendChild(del);\n        li.appendChild(img);\n\n        // attach drag-and-drop events (for reordering)\n        li.addEventListener('dragstart', (ev) => {\n            let dt = ev.dataTransfer;\n            dt.setData('imgSrc', thumbSrc);\n        });\n\n        li.addEventListener('drop', (ev) => {\n            let dt = ev.dataTransfer;\n\n            const draggedImgSrc = dt.getData('imgSrc');\n            const draggedLi = this.wrapper.querySelector(`.${this.cssClassnames.thumb}[src=\"${draggedImgSrc}\"]`).parentElement;\n\n            const allListItems = [...draggedLi.parentElement.children];\n            const draggedLiIndex = allListItems.indexOf(draggedLi);\n            const droppedLiIndex = allListItems.indexOf(ev.currentTarget);\n            \n            if (droppedLiIndex > draggedLiIndex) {\n                // insert after the dropped element\n                draggedLi.parentElement.insertBefore(draggedLi, ev.currentTarget.nextSibling);\n            } \n            if (droppedLiIndex < draggedLiIndex) {\n                // insert before the dropped element\n                draggedLi.parentElement.insertBefore(draggedLi, ev.currentTarget);\n            }\n        })\n\n        return li;\n    }\n\n    _deleteImg(ev) {\n        const del = ev.currentTarget;\n        del.parentElement.remove();\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./static/js/src/ejsImageGallery.js?");

/***/ })

/******/ });