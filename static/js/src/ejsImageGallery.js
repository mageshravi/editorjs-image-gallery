/**
 * ImageGallery block element for EditorJS
 */

class ImageGallery {

    constructor({ data }) {
        this.data = data;
        this.wrapper = undefined;
        this.cssClassnames = {
            wrapper: 'ejs-img-gallery',
            imageList: 'ejs-img-gallery__list',
            imageListItem: 'ejs-img-gallery__list-item',
            thumb: 'ejs-img-gallery__thumb',
            deleteIcon: 'ejs-img-gallery__delete-icon',
            urlIp: 'ejs-img-gallery__url-ip'
        }
    }

    static get toolbox() {
        return {
            title: 'Image Gallery',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList = this.cssClassnames.wrapper;

        const images = document.createElement('ul');
        images.classList = this.cssClassnames.imageList;

        const self = this;
        if (this.data && this.data.images) {
            // fill block with saved data
            this.data.images.forEach((img) => {
                const li = self._createThumbnailListItem(img.url, img.youtubeVideoId);
                images.appendChild(li);
            });
        }

        const input = document.createElement('input');
        input.classList = this.cssClassnames.urlIp;
        input.placeholder = 'Image/YouTube Video URL';

        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = 'Add to Gallery';
        button.addEventListener('click', self._addImg.bind(self));

        this.wrapper.appendChild(images);
        this.wrapper.appendChild(input);
        this.wrapper.appendChild(button);

        return this.wrapper;
    }

    save(blockContent) {
        const imgs = blockContent.querySelectorAll(`.${this.cssClassnames.thumb}`);

        const imageUrls = [];
        imgs.forEach((img) => {
            const itemData = {}
            if (img.dataset.videoId) {
                itemData.youtubeVideoId = img.dataset.videoId
            }

            itemData.url = img.getAttribute('src')
            imageUrls.push(itemData)
        })

        return {
            images: imageUrls
        };
    }

    _addImg(ev) {
        const addButton = ev.currentTarget;
        const wrapper = addButton.parentElement;
        const input = wrapper.querySelector(`.${this.cssClassnames.urlIp}`);

        if (!input || !input.value) {
            return;
        }

        // temporarily disable input and button
        input.setAttribute('disabled', true);
        addButton.setAttribute('disabled', true);

        const regexPattern = new RegExp('^(http|https)(:\/\/)(www\.)?((youtube\.com)|(youtu.be))\/', 'g')
        if (regexPattern.test(input.value.trim()) === true) {
            const self = this;
            const videoUrl = input.value.trim();

            this._parseVideoId(videoUrl)
                .then(youtubeVideoId => {
                    const videoThumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`
                    self._appendMedia(addButton, wrapper, videoThumbnailUrl, youtubeVideoId);
                })

            return
        }

        this._appendMedia(addButton, wrapper, input.value.trim())

    }

    _appendMedia(addButton, wrapper, url, youtubeVideoId) {
        const input = wrapper.querySelector(`.${this.cssClassnames.urlIp}`);
        const self = this;
        this._isValidImageUrl(url)
            .then((src) => {
                const li = self._createThumbnailListItem(src, youtubeVideoId);

                const ul = wrapper.querySelector(`.${self.cssClassnames.imageList}`);
                ul.appendChild(li);

                // clear input
                input.value = '';
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                // re-enable input and button
                input.removeAttribute('disabled');
                addButton.removeAttribute('disabled');
            });
    }

    _parseVideoId(url) {
        let videoId = null

        return new Promise((resolve, _) => {
            const a = document.createElement('a')
            a.href = url

            if (a.hostname === 'youtu.be') {
                videoId = a.pathname.substr(1, a.pathname.length)
                resolve(videoId)

                return
            }

            videoId = a.search.substr(3, a.search.length)
            resolve(videoId)
        })
    }

    _isValidImageUrl(url) {
        // check if image can load
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url);
            img.onerror = () => reject(`Could not fetch URL: ${url}`);
        });
    }

    _createThumbnailListItem(thumbSrc, youtubeVideoId) {
        // thumb
        const img = document.createElement('img');
        img.classList = this.cssClassnames.thumb;
        img.setAttribute('src', thumbSrc);

        if (youtubeVideoId) {
            img.setAttribute('data-video-id', youtubeVideoId)
        }

        // delete-icon
        const del = document.createElement('span');
        del.classList = this.cssClassnames.deleteIcon;
        del.innerHTML = '&times;';
        del.addEventListener('click', this._deleteImg);

        // list-item
        const li = document.createElement('li');
        li.classList = this.cssClassnames.imageListItem;
        li.appendChild(del);
        li.appendChild(img);

        // attach drag-and-drop events (for reordering)
        li.addEventListener('dragstart', (ev) => {
            let dt = ev.dataTransfer;
            dt.setData('imgSrc', thumbSrc);
        });

        li.addEventListener('drop', (ev) => {
            let dt = ev.dataTransfer;

            const draggedImgSrc = dt.getData('imgSrc');
            const draggedLi = this.wrapper.querySelector(`.${this.cssClassnames.thumb}[src="${draggedImgSrc}"]`).parentElement;

            const allListItems = [...draggedLi.parentElement.children];
            const draggedLiIndex = allListItems.indexOf(draggedLi);
            const droppedLiIndex = allListItems.indexOf(ev.currentTarget);

            if (droppedLiIndex > draggedLiIndex) {
                // insert after the dropped element
                draggedLi.parentElement.insertBefore(draggedLi, ev.currentTarget.nextSibling);
            }

            if (droppedLiIndex < draggedLiIndex) {
                // insert before the dropped element
                draggedLi.parentElement.insertBefore(draggedLi, ev.currentTarget);
            }
        })

        return li;
    }

    _deleteImg(ev) {
        const del = ev.currentTarget;
        del.parentElement.remove();
    }
}

export { ImageGallery as default }
