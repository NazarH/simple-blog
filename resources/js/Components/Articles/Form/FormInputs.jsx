export default function FormInputs({formData, setFormData, errors})
{
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return(
        <>
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control"
                value={formData.title}
                onChange={handleInputChange}
            />
            {errors.title && <div className="error">{errors.title}</div>}

            <textarea
                name="text"
                className="form-control"
                placeholder="Write comment here"
                resize="none"
                id="editor"
            />
            {errors.text && <div className="error">{errors.text}</div>}
        </>
    )
}
