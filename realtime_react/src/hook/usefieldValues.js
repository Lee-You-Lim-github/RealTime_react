import { useCallback, useEffect, useState } from "react";

function useFieldValues(initialValues) {
  const [fieldValues, setFieldValues] = useState(initialValues);

  const handleFieldChange = useCallback((e) => {
    console.log(e.target.value);

    const { type, name, value, files, checked } = e.target;

    let newValue;

    if (type === "file") {
      newValue = Array.from(files);
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: newValue,
      };
    });
  }, []);

  const clearFieldValues = useCallback(() => {
    setFieldValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    setFieldValues(initialValues);
  }, [initialValues]);

  return {
    fieldValues,
    handleFieldChange,
    clearFieldValues,
    setFieldValues,
  };
}

export default useFieldValues;
