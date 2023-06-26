import { RefObject, useEffect } from "react";
import { listType } from '../types/mnemonicType';

export const Display = ({wordList, answerList, activeWordRef, currentWord, }: {wordList: listType[]; answerList: listType[]; activeWordRef: RefObject<HTMLDivElement> | null; currentWord: {id: string};}) =>{
    
    //set focus to display element
    useEffect(() => {
        
        if (activeWordRef && activeWordRef.current) {
            activeWordRef.current.focus();
            // console.log(activeWordRef?.current?.children[0].textContent);

        }
    }, [currentWord, activeWordRef]);
    // console.log(currentWord);

    return (
        <div className='display'>
            {wordList.map((item) =>{ 
                const isCurrentWord = item.id === currentWord.id;
                return( 
                <div key={item.id} ref={(isCurrentWord)?activeWordRef: null} className={`word ${isCurrentWord? "correct": ""}`}><span > {item.word}</span>
                 {answerList.map((answer)=> (answer.id === item.id)? 
                 <span className='' key={answer.index}>{answer.answer}</span>: "" )}  </div>)})}
        </div>
    );
}

