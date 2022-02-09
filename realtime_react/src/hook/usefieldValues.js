import { useCallback, useEffect, useState } from "react";

function useFieldValues(initialValues) {
  const [fieldValues, setFieldValues] = useState(initialValues);

  const handleFieldChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: (files && Array.from(files)) || value,
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
