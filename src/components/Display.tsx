import { RefObject, useEffect } from "react";
import { listType } from '../types/mnemonicType';
import { useSelector } from "react-redux";
import { State } from "../store/reducer";
import "../styles/Display.scss";

export const Display = ({activeWordRef}:{activeWordRef:RefObject<HTMLDivElement> | null }) =>{
    const app = useSelector((state: State) => state.app);
    const time = useSelector((state: State) => state.time);

    useEffect(() => {
        if (activeWordRef && activeWordRef.current) {

            activeWordRef.current.style.scrollMarginTop = "5px";
            activeWordRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            

        }
    }, [activeWordRef?.current?.children[1].innerHTML, app.currentWord]);

    
    const isEmptyOrLessThanExpected = (item: listType) => {
        return app.answerList[item.index].answer === "" || app.answerList[item.index].answer.length < app.currentList[item.index].answer.length;
    }
    return (
        <div className="display">
            <div className="timer">{time.timer}</div>
            <div className='box'>
                {app.currentList.map((item) =>{ 
                    const isCurrentWord = item.id === app.currentWord.id;
                
                    return( 
                    <div key={item.id} ref={(isCurrentWord)?activeWordRef: null} className={`word ${ app.answerList[item.index].isCorrect ? "right": 
                    `${isEmptyOrLessThanExpected(item) && isCurrentWord? "current" : 
                    `${ isEmptyOrLessThanExpected(item)? "": "wrong"}`}`}`}><span > {item.word}</span>
                    {app.answerList.map((answer)=> (answer.id === item.id)? 
                    <span className='' key={answer.index}>{answer.answer}</span>: "" )}  </div>)})}
            </div>
        </div>

    );
}

