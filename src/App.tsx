import { useEffect, useReducer } from 'react'
import Button from "./components/Button"
import KeyboardListener from './components/KeyboardListener';
import { Display } from './components/Display';
import { Mnemonic } from './model/Mnemonic';
import { listType } from './types/mnemonicType';

interface AppState {
  currentList: listType[];
  answerList: listType[];
  currentWord: listType;
}

const initialState = {
  currentList: [],
  answerList: [],
  currentWord: {}
}

const ACTION = {
  SET_CURRENT_LIST: 'SET_CURRENT_LIST',
  SET_ANSWER_LIST: 'SET_ANSWER_LIST',
  SET_CURRENT_WORD: 'SET_CURRENT_WORD',
  CHANGE_ANSWER: 'CHANGE_ANSWER',
  GOTO_NEXT_WORD: 'GOTO_NEXT_WORD',
  GOTO_PREV_WORD: 'GOTO_PREV_WORD'

}

function reducer(state: AppState, action: any) {
  switch (action.type) {
    case ACTION.SET_CURRENT_LIST:
      return { ...state, currentList: action.payload }

    case ACTION.SET_ANSWER_LIST:
      return { ...state, answerList: action.payload }

    case ACTION.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload }

    case ACTION.GOTO_NEXT_WORD:
      const nextIndex = state.currentWord.index + 1;
      const nextWordIndex = nextIndex >= state.currentList.length ? state.currentList.length-1 : nextIndex;
      return { ...state, currentWord: state.currentList[nextWordIndex] };

    case ACTION.GOTO_PREV_WORD:
      const prevIndex = state.currentWord.index - 1;
      const prevWordIndex = prevIndex <= 0 ? 0 : prevIndex;
      return { ...state, currentWord: state.currentList[prevWordIndex] };

    case ACTION.CHANGE_ANSWER:
      return { ...state, answerList: state.answerList.map((item: listType) => (item.id === state.currentWord.id)? {...item, answer: action.payload}: item) }      
      
    default:
      return state
  }
}
    


function App() {
  const mnemonic: Mnemonic = new Mnemonic();
  //create reducer to handle state
  const [state, dispatch] = useReducer(reducer, initialState);
  
 
  useEffect(() => {
    // Set current list to the word list
    const tempList = mnemonic.getWordList();
    dispatch({type: ACTION.SET_CURRENT_LIST, payload: tempList});
    const initialAnswerList = tempList.map((item: listType) => ({
      ...item,
      answer: ""
    }));
    dispatch({ type: ACTION.SET_ANSWER_LIST, payload: initialAnswerList });
    // Set current word to the first word in the list
    dispatch({type: ACTION.SET_CURRENT_WORD, payload: tempList[0]});
    //`${state.currentWord.answer}` is returning undefined
    //how can I fix it
    
  }, []);

  


  const gotoNextWord = () => {
    dispatch({type: ACTION.GOTO_NEXT_WORD});
  }
  const gotoPrevWord = () => {
    dispatch({type: ACTION.GOTO_PREV_WORD});
    // dispatch({type: ACTION.CHANGE_ANSWER, payload: "prev"});
  }
  useEffect(() =>{
    dispatch({type: ACTION.CHANGE_ANSWER, payload: state.currentWord.answer});
  },[state.currentWord]);

  return (
      //change app bg color to slate-400
    
      
    <div className='App '>
      <header>
        <p className=''>Header</p>
      </header>
      <nav>
        <h1 className=''>Mnemonic</h1>
      </nav>
      <main>
        <Display itemList={state.currentList} answerList={state.answerList}/>
        <h1>CurrentWord: {state.currentWord.word}</h1>
        <Button OnBtnClick={gotoNextWord} name="Next Word"/>
        <Button OnBtnClick={gotoPrevWord} name="Prev Word"/>
        <KeyboardListener />
      </main>
      <footer>
        <p className=''>Footer</p>
      </footer>
      
    </div>
  )
}

export default App
