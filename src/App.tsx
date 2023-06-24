import { useState, useEffect, useReducer } from 'react'
import Button from "./components/Button"
import KeyboardListener from './components/KeyboardListener';
import { Display } from './components/Display';
import { Mnemonic } from './model/Mnemonic';
import { listType } from './types/mnemonicType';



const initialState = {
  currentList: [],
  answerList: [],
  currentWord: {id: "", word: "", anwser: "", index: 0}
}

const ACTION = {
  SET_CURRENT_LIST: 'SET_CURRENT_LIST',
  SET_ANSWER_LIST: 'SET_ANSWER_LIST',
  SET_CURRENT_WORD: 'SET_CURRENT_WORD'

}

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTION.SET_CURRENT_LIST:
      return { ...state, currentList: action.payload }
    case ACTION.SET_ANSWER_LIST:
      return { ...state, answerList: action.payload }
    case ACTION.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload }
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
    dispatch({type: ACTION.SET_ANSWER_LIST, payload: tempList.map((item: listType) => ({...item, answer: ""}))});
    // Set current word to the first word in the list
    dispatch({type: ACTION.SET_CURRENT_WORD, payload: tempList[0]});
  }, []);



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
        <Button OnBtnClick={() => {dispatch( {type: ACTION.SET_CURRENT_WORD, payload: state.currentList[1]})}} count={0}/>
        <KeyboardListener />
      </main>
      <footer>
        <p className=''>Footer</p>
      </footer>
      
    </div>
  )
}

export default App
