import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageGallery from './ejsImageGallery';

const editor = new EditorJS({
    holder: 'codex-editor',
    tools: {
        heading: Header,
        list: {
            class: List,
            inlineToolbar: true,
        },
        gallery: ImageGallery,
    },
});

const ipTextarea = document.querySelector('#codex-editor-input');
const loadBtn = document.querySelector('#load');

loadBtn.addEventListener('click', () => {
    const data = JSON.parse(ipTextarea.value)

    if (!data) {
        return
    }

    editor.render(data)
        .then(() => {
            console.log('Data loaded successfully');
        })
        .catch((err) => {
            console.err('Error loading data:', err);
        })
})

const textarea = document.querySelector('#codex-editor-textarea');
const myBtn = document.querySelector('#my-btn');

myBtn.addEventListener('click', () => {
    editor.save()
        .then((outputData) => {
            textarea.value = JSON.stringify(outputData);
        })
        .catch((err) => {
            console.error(err);
        });
});
