import React, { useState, useEffect, useRef } from 'react';

const KeyboardListener: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent ) => {
      // Handle the keydown event here
      console.log("Key pressed:", event.key);
      //set value of input to key pressed
      setValue(value => value + event.key);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  //check if mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle the keydown event here
    setValue(event.target.value);
  };

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
      
      {!isMobile ? <div placeholder={"hell"} contentEditable  ref={inputRef} /> : 
       <input className="" style={{"opacity":"0", "cursor": "transparent"}} ref={inputRef} onChange={handleOnChange}/>}
    </>
  );

};

export default KeyboardListener;
