import { forwardRef, useEffect, useRef , useState } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false,placeholder, values, setValues, ...props }, ref) {
    const input = ref ? ref : useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            placeholder={placeholder}
            ref={input}
            value={values}
            onChange={(event) => {
                setValues(event.target.value)
            }}
        />
    );
});
