import {
    appendTypedHistory,
    backtrackWord,
    changeAnswer,
    changeIsCorrect,
    gotoNextWord,
    setChar,
    setTypedWord,
} from "../store/actions";
import { store } from "../store/store";
import { resetTest } from "./resetTest";
import { startTimer } from "./startTimer";

const handleBackspace = (ctrlKey: boolean) => {
    const { dispatch, getState } = store;
    const {
        app: { answerList, currentWord }
    } = getState();
    const currentAnswer = answerList[currentWord.index].answer.slice(0, -1);
    dispatch(changeAnswer(currentAnswer));
    
    //delete whole word if ctrl+backspace
    if (ctrlKey) {
        dispatch(changeAnswer(""));
    }
}

export const recordTest = (key: string, ctrlKey: boolean) => {
    const { dispatch, getState } = store;
    const {
        time: { timer, timerId },
        // word: { typedWord, currWord, caretRef },
        preferences: { timeLimit },
        app: { answerList, activeWordRef,currentList, currentWord }
    } = getState();

    if (!timer) {
        if (key === "Tab") {
            resetTest();
        }
        return;
    }
    if (!timerId && key !== "Tab") startTimer();
    const currWordEl = activeWordRef?.current!;
    // currWordEl.scrollIntoView({ behavior: "smooth", block: "center" });

    
    let typdWord = answerList[currentWord.index].answer;
    if(key.length === 1){
        typdWord = answerList[currentWord.index].answer + key;
    }
    const isCorrect = currentList[currentWord.index].answer === typdWord;


    

    if(typdWord === ""){
        currWordEl.classList.remove("right", "wrong");
        activeWordRef.current.classList.add("current");

    }
    if(typdWord.length >= currentList[currentWord.index].answer.length){
        currWordEl.classList.add( isCorrect ? "right" : "wrong");
        //set isCorrect
        dispatch(changeIsCorrect(isCorrect));
        
        

    }

    switch (key) {
        case "Tab":
            if (timer !== timeLimit || timerId) {
                resetTest();
                document.getElementsByClassName("word")[0].scrollIntoView();
            }
            break;
        case "Enter":
            if(!isCorrect){
                dispatch(changeAnswer(""));
                
            }else{
                dispatch(gotoNextWord());
            }
            break;
        case "Backspace":
            handleBackspace(ctrlKey);
            break;
        default:
            dispatch(changeAnswer(typdWord));
            if(isCorrect){
                //goto next word
                dispatch(gotoNextWord());
            }
            break;
    }
};
