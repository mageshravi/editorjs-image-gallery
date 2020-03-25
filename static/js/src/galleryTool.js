/**
 * ImageGallery block element for EditorJS
 */
class ImageGallery {

    constructor ({data}) {
        this.data = data;
        this.wrapper = undefined;
        this.cssClassnames = {
            wrapper: 'm-img-gallery',
            imageList: 'm-img-gallery__list',
            imageListItem: 'm-img-gallery__list-item',
            thumb: 'm-img-gallery__thumb',
            deleteIcon: 'm-img-gallery__delete-icon',
            urlIp: 'm-img-gallery__url-ip'
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
                const li = self._createThumbnailListItem(img.url);
                images.appendChild(li);
            });
        }

        const input = document.createElement('input');
        input.classList = this.cssClassnames.urlIp;
        input.placeholder = 'Image URL';

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
            imageUrls.push({ url: img.getAttribute('src') })
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

        const self = this;
        this._isValidImageUrl(input.value)
            .then((imgSrc) => {
                const li = self._createThumbnailListItem(imgSrc);

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

    _isValidImageUrl(url) {
        // check if url starts with http or https
        const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(url)
        if (!isValidUrl) {
            return false;
        }

        // check if image can load
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(url);
            img.onerror = () => reject(`Could not fetch URL: ${url}`);
        });
    }

    _createThumbnailListItem(thumbSrc) {
        // thumb
        const img = document.createElement('img');
        img.classList = this.cssClassnames.thumb;
        img.setAttribute('src', thumbSrc);

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
