import { useState, useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useFormInput = (arrStates) => {
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tag_ids: [],
        rubric_ids: [],
    });

    useEffect(() => {
        setFormData({
            title: arrStates.article ? arrStates.article.title : '',
            text: arrStates.article ? arrStates.article.text : '',
            tag_ids: arrStates.tags && arrStates.tags.map((tag) => ({
                    value: tag.id,
                    label: tag.name
                })),
            rubric_ids: arrStates.rubrics && arrStates.rubrics.map((rubric) => ({
                    value: rubric.id,
                    label: rubric.name
                })),
        });

        const editor = ClassicEditor.create(document.querySelector('#editor'), {
            ckfinder: {
                uploadUrl: window.location.origin + '/admin/articles/upload',
            },
            toolbar: {
                items: [
                    'heading', '|',
                    'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|',
                    'blockQuote', 'code', 'link', 'imageUpload', '|',
                    'undo', 'redo',
                ],
            },

        }).then((editor) => {
            editor.model.document.on('change', () => {
                const newData = editor.getData();

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    text: newData,
                }));
            });

            editor.setData(arrStates.article && arrStates.article.text);

        }).catch((error) => {});

        return () => {
            if (editor) {
                const currentUrl = window.location.href;
                const regex = /\/admin\/articles\/edit\//;
                if (regex.test(currentUrl)) {
                    document.querySelector('.ck.ck-reset.ck-editor.ck-rounded-corners').remove();
                }
            }
        };
    }, [arrStates.article]);

    return {
        formData,
        setFormData
    };
};

export default useFormInput;
