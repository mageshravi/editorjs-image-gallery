import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageGallery from './galleryTool';

const editor = new EditorJS({
    holder: 'codex-editor',
    tools: {
        heading: Header,
        gallery: ImageGallery
    },
    data: {
        "time": 1584459478133,
        "blocks": [
            {
                "type": "heading",
                "data": {
                    "text": "Hello, World",
                    "level": 1
                }
            },
            {
                "type": "paragraph",
                "data": {
                    "text": "Placeimg.com<br>"
                }
            },
            {
                "type": "gallery",
                "data": {
                    "images": [
                        {
                            "url": "https://placeimg.com/148/148/animals"
                        },
                        {
                            "url": "https://placeimg.com/148/148/arch"
                        },
                        {
                            "url": "https://placeimg.com/148/148/nature"
                        },
                        {
                            "url": "https://placeimg.com/148/148/tech"
                        },
                    ]
                }
            }
        ],
        "version": "2.17.0"
    }
});

const textarea = document.querySelector('#codex-editor-textarea');
const myForm = document.querySelector('#my-form');

// do NOT use addEventListener('submit')
// use 'onsubmit' so that this will be the only event handler
myForm.onsubmit = () => {
    editor.save()
        .then((outputData) => {
            textarea.value = JSON.stringify(outputData);
        })
        .catch((err) => {
            console.error(err);
        });

    if (myForm.querySelector('input[type=text]').value == 'fail') {
        return false;
    }

    return true;
}
