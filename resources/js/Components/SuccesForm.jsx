import React, { useEffect } from 'react';

const SuccessForm = ({setIsSuccess, isSuccess}) => {

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        }
    }, [isSuccess]);

    return (
        <div>
            {
                isSuccess
                    && <div className="success">Form Has Been Sent Successfully</div>
            }
        </div>
    );
};

export default SuccessForm;

