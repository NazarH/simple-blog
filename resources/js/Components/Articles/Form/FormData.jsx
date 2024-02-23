import { useState, useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function FormData()
{
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        tag_ids: [],
        rubric_ids: [],
    });

    useEffect(() => {
        ClassicEditor
            .create(document.querySelector('#editor'), {
                ckfinder: {
                    uploadUrl: window.location.origin + '/admin/articles/upload'
                },
                toolbar: {
                    items: [
                        'heading', '|',
                        'bold', 'italic', '|',
                        'blockQuote', 'link', 'imageUpload', '|',
                        'undo', 'redo'
                    ],
                },
            })
            .then(editor => {
                editor.model.document.on('change', () => {
                    const newData = editor.getData();
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        text: newData,
                    }));
                });
            });
    }, []);

    return{
        formData,
        setFormData
    }
}
