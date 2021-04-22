import { useState, useEffect, useRef } from "react";

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

export const useElementOnScreen = (options, callback) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    if (isVisible) {
      callback();
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
