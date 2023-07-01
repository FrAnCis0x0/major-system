import { Mnemonic } from "../model/Mnemonic";
import { setAnswerList, setCurrentList, setCurrentWord, setTimerId, timerSet } from "../store/actions";
import { store } from "../store/store";
import { listType } from "../types/mnemonicType";
import "../styles/Display.scss"

export const resetTest = async () => {
    const { dispatch, getState } = store;
    const {
        time: { timerId },
        preferences: { timeLimit, type },
    } = getState();

    const mnemonic = new Mnemonic();

    document
        .querySelectorAll(".wrong, .right")
        .forEach((el) => el.classList.remove("wrong", "right"));
    if (timerId) {
        clearInterval(timerId);
        dispatch(setTimerId(null));
    }
         const tempList = mnemonic.getList(type, timeLimit);
        const initialAnswerList = tempList.map((item: listType) => ({
        ...item,
        answer: ""
        }));
        //set list to the word list
        dispatch(setCurrentList(tempList));

        // Set answer list to the initial answer list
        dispatch(setAnswerList(initialAnswerList));
        // Set current word to the first word in the list
        dispatch(setCurrentWord(initialAnswerList[0]));
    dispatch(timerSet(timeLimit));
   
};
