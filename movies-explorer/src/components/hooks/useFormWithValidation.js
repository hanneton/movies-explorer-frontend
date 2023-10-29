import { useState } from "react";
export default function useFormWithValidation({
    initialValues,
    initialErrors,
    initialIsValid
}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(initialIsValid);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        isValid,
        setIsValid,
        handleChange
    }
}
