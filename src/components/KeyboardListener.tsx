import React, { useState, useRef } from 'react';

const KeyboardListener: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
 
  //focus on input on click
  const focusOnClick = () => {  
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.focus();
    }
  };

  return (
    <>
      <p>Press any key to see the event</p>
      <p>You pressed: {value}</p>
      <button onClick={focusOnClick}>Click to focus</button>
      <input value={value}  ref={inputRef} onChange={(e) =>{setValue( e.target.value);} }/>
    </>
  );

};

export default KeyboardListener;
