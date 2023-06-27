import { RefObject, useEffect } from "react";
import { listType } from '../types/mnemonicType';
import { useSelector } from "react-redux";
import { State } from "../store/reducer";

export const Display = ({activeWordRef}:{activeWordRef:RefObject<HTMLDivElement> | null }) =>{
    const app = useSelector((state: State) => state.app);

    
    const isEmptyOrLessThanExpected = (item: listType) => {
        return app.answerList[item.index].answer === "" || app.answerList[item.index].answer.length < app.currentList[item.index].answer.length;
    }
    return (
        <div className='display'>
            {app.currentList.map((item) =>{ 
                const isCurrentWord = item.id === app.currentWord.id;
               
                return( 
                <div key={item.id} ref={(isCurrentWord)?activeWordRef: null} className={`word ${ app.answerList[item.index].isCorrect ? "right": 
                `${isEmptyOrLessThanExpected(item) && isCurrentWord? "current" : 
                `${ isEmptyOrLessThanExpected(item)? "": "wrong"}`}`}`}><span > {item.word}</span>
                 {app.answerList.map((answer)=> (answer.id === item.id)? 
                 <span className='' key={answer.index}>{answer.answer}</span>: "" )}  </div>)})}
        </div>
    );
}

