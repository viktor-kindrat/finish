import React, { useState, useRef } from 'react';

const PhoneInput = ({ boxClassSelector, inputClassSelector, setPhoneNumber }) => {
    const [values, setValues] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);

    const normalizeInput = (value) => {
        if (!value) return value;
        let currentValue = value.replace(/[^\d]/g, '');
        const cvLength = currentValue.length;
        if (cvLength >= 12) currentValue = currentValue.slice(0, 12);
        let formattedValue = '+';
        if (cvLength < 5) {
            formattedValue += currentValue;
        } else if (cvLength < 6) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2)})`;
        } else if (cvLength < 9) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5)}`;
        } else if (cvLength < 11) {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8)}`;
        } else {
            formattedValue += `${currentValue.slice(0, 2)} (${currentValue.slice(2, 5)}) ${currentValue.slice(5, 8)}-${currentValue.slice(8, 10)}-${currentValue.slice(10)}`;
        }
        return formattedValue;
    };

    const handleInputChange = (index, value) => {
        if (value.length <= (index === 0 || index === 3 ? 2 : 3)) {
            const newValues = [...values];
            newValues[index] = value;
            setValues(newValues);
            setPhoneNumber(normalizeInput(newValues.join("")))

            if (value.length === (index === 0 || index === 3 ? 2 : 3)) {
                if (index < 4) {
                    inputRefs.current[index + 1].focus();
                }
            }
        }
    };

    const handleInputKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (index === 3 && values[3] === '') {
                inputRefs.current[2].focus();
            } else if (index === 2 && values[2] === '') {
                inputRefs.current[1].focus();
            } else if (index === 1 && values[1] === '') {
                inputRefs.current[0].focus();
            } else if (index === 4 && values[4] === '') {
                inputRefs.current[3].focus();
            }
        }
    };

    return (
        <div className={boxClassSelector}>
            +
            {values.map((value, index) => (
                <span key={index}>
                    {index === 1 ? "(" : ""}<input
                        inputMode="numeric"
                        key={index}
                        className={inputClassSelector}
                        type="text"
                        maxLength={(index === 0 || index === 3 || index === 4) ? 2 : 3}
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleInputKeyDown(index, e)}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        placeholder={(index === 0 || index === 3 || index === 4) ? "__" : "___"}
                    />{index === 1 ? ")" : ""} {index !== values.length - 1 ? "-" : ""}
                </span>
            ))}
        </div>
    );
};

export default PhoneInput;
