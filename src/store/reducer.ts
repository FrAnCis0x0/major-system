import { RefObject } from "react";
import { AnyAction, combineReducers } from "redux";
import {
    TIMER_DECREMENT,
    TIMERID_SET,
    TIMER_SET,
    SET_THEME,
    SET_TIME,
    SET_REF,
    SET_TYPE,
    //====================================================
    SET_CURRENT_LIST,
    SET_ANSWER_LIST,
    SET_CURRENT_WORD,
    CHANGE_ANSWER,
    GOTO_NEXT_WORD,
    GOTO_PREV_WORD,
    CHANGE_IS_CORRECT,
    COUNT_CORRECT,
    RESET_CORRECT
    //====================================================

} from "./actions";
import { listType } from "../types/mnemonicType";

export interface State {
    preferences: {
        theme: string;
        timeLimit: number;
        type: string;
    };
  
    time: {
        timer: number;
        timerId: NodeJS.Timeout | null;
    };
    app: {
        currentList: listType[];
        answerList: listType[];
        currentWord: listType;
        answer: string;
        activeWordRef: RefObject<HTMLDivElement> | null;
        countCorrect: number;
    };
}

export const initialState: State = {
    preferences: {
        theme: "",
        timeLimit: 0,
        type: "",
    },
    
    time: {
        timer: 1,
        timerId: null,
    },
    app: {
        currentList: [],
        answerList: [],
        currentWord: {
            id: "",
            answer: "",
            word: "",
            index: 0,
            isCorrect: false
        },
        answer: "",
        activeWordRef: null,
        countCorrect: 0
    },
};

const timerReducer = (
    state = initialState.time,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case TIMER_DECREMENT:
            return { ...state, timer: state.timer - 1 };
        case TIMER_SET:
            return { ...state, timer: payload };
        case TIMERID_SET:
            return { ...state, timerId: payload };
        default:
            return state;
    }
};


const preferenceReducer = (
    state = initialState.preferences,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case SET_THEME:
            return { ...state, theme: payload };
        case SET_TIME:
            return {
                ...state,
                timeLimit: payload,
            };
        case SET_TYPE:
            return {
                ...state,
                type: payload,
            };
        default:
            return state;
    }
};


//===============================================
//App states
//===============================================

const appReducer = (state = initialState.app, {type, payload}: AnyAction) => {
    switch (type) {
        case SET_CURRENT_LIST:
            return { ...state, currentList: payload }
    
        case SET_ANSWER_LIST:
            return { ...state, answerList: payload }
    
        case SET_CURRENT_WORD:
            return { ...state, currentWord: payload }
    
        case GOTO_NEXT_WORD:
            const nextIndex = state.currentWord.index + 1;
            const nextWordIndex = nextIndex >= state.currentList.length ? state.currentList.length-1 : nextIndex;
            return { ...state, currentWord: state.answerList[nextWordIndex] };
    
        case GOTO_PREV_WORD:
            const prevIndex = state.currentWord.index - 1;
            const prevWordIndex = prevIndex <= 0 ? 0 : prevIndex;
            return { ...state, currentWord: state.answerList[prevWordIndex] };
    
        case CHANGE_ANSWER:
            return { ...state, answerList: state.answerList.map((item: listType) => (item.id === state.currentWord.id)? {...item, answer: payload}: item) }   
        case CHANGE_IS_CORRECT:
            return { ...state, answerList: state.answerList.map((item: listType) => (item.id === state.currentWord.id)? {...item, isCorrect: payload}: item) }

            
        case SET_REF:
            return {
                ...state,
                activeWordRef: payload,
            }; 
        case COUNT_CORRECT:

            //increase countCorrect
            const countCorrect = state.countCorrect + 1;
            return { ...state, countCorrect: countCorrect }
        case RESET_CORRECT:
            return { ...state, countCorrect: 0 };


      default:
        return state
    }
  }

export default combineReducers({
    time: timerReducer,
    preferences: preferenceReducer,
    app: appReducer,
});
