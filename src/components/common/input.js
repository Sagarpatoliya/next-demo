import React from 'react';

export default function Input({
    type = 'text',        // default type is 'text'
    placeholder = '',     // default placeholder is empty
    value = '',           // default value
    onChange,             // function to handle input change
    icon: Icon,           // icon component passed as a prop
    className = '',       // custom classnames
    ...props              // additional props
}) {
    return (
        <div className={`relative w-full ${className}`}>
            {Icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`bg-gray-50 border border-gray-400  text-gray-900 text-sm rounded-lg duration-300 focus:ring-gray-500 focus:outline-none  focus:border-gray-500  block w-full pl-10 p-2.5  ${className}`}
                placeholder={placeholder}
                {...props} // Additional props like id, name, etc.
            />
        </div>
    );
}
