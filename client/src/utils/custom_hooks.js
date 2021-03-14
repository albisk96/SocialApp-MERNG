import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    delete errors[name];
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return { onChange, onSubmit, values, setErrors, errors };
};
