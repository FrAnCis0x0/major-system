import { RefObject, useEffect, useRef, useState } from 'react'
import Button from "./components/Button"
import { Display } from './components/Display';
import { Mnemonic } from './model/Mnemonic';
import { listType } from './types/mnemonicType';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './store/reducer';
import { changeAnswer, gotoNextWord, gotoPrevWord, setAnswerList, setCurrentList, setCurrentWord, setRef } from './store/actions';


function App() {
  const mnemonic: Mnemonic = new Mnemonic();
  //create reducer to handle state
  // const [state, dispatch] = useReducer(reducer, initialState);
  const {
    // time: { timerId, timer },
    // word: { currWord, typedWord, activeWordRef },
    app: {currentList, answerList, currentWord},
} = useSelector((state: State) => state);

  const dispatch = useDispatch();
    const [showPallet, setShowPallet] = useState(false);

    const activeWord = useRef<HTMLDivElement>(null);




    useEffect(() => {
      dispatch(setRef(activeWord));
      document.onkeydown = (e) => {
          if (e.ctrlKey && e.key === "k") {
              setShowPallet((s:boolean) => !s);
              e.preventDefault();
          } else if (
              e.key.length === 1 ||
              e.key === "Backspace" ||
              e.key === "Tab"
          ) {
              // recordTest(e.key, e.ctrlKey);
              console.log(e.key);
              e.preventDefault();
          }
      };
      return () => {
          document.onkeydown = null;
      };
        
    }, [dispatch]);
 
  useEffect(() => {
    // Set current list to the word list
    const tempList = mnemonic.getWordList();
    const initialAnswerList = tempList.map((item: listType) => ({
      ...item,
      answer: ""
    }));
    //set list to the word list
    dispatch(setCurrentList(tempList));

    // Set answer list to the initial answer list
    dispatch(setAnswerList(initialAnswerList));
    // Set current word to the first word in the list
    dispatch(setCurrentWord(tempList[0]));
    
    
  }, []);

  


  // Set current word answer to the answer list
  useEffect(() =>{
    dispatch(changeAnswer(currentWord.answer));
  },[currentWord]);





  return (
      
    <div className='App '>
      <header>
        <p className=''>Header</p>
      </header>
      <nav>
        <h1 className=''>Mnemonic</h1>
      </nav>
      <main>
        <Display wordList={currentList} answerList={answerList} activeWordRef={activeWord} currentWord={currentWord} />
        <h1>CurrentWord: {currentWord.word}</h1>
        <Button OnBtnClick={() => {dispatch(gotoNextWord())}} name="Next Word"/>
        <Button OnBtnClick={() => {dispatch(gotoPrevWord())}} name="Prev Word"/>
        {/* <KeyboardListener /> */}
      </main>
      <footer>
        <p className=''>Footer</p>
      </footer>
      
    </div>
  )
}

export default App
