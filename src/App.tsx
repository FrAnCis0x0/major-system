import { useState, useEffect } from 'react'
import Button from "./components/Button"
import KeyboardListener from './components/KeyboardListener';
import { Display } from './components/Display';
import { Mnemonic } from './model/Mnemonic';
import { listType } from './types/mnemonicType';

function App() {
  const mnemonic: Mnemonic = new Mnemonic();
  const [currentList, setCurrentList] = useState<listType[]>([]);
  const [answerList, setAnswerList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<listType>( {id: "", word: "", anwser: "", index: 0});
  useEffect(() => {
    // Set current list to the word list
    const tempList = mnemonic.getWordList();
    setCurrentList(tempList);
    // Set current word to the first word in the list
    setCurrentWord(tempList[0]);
  }, [setCurrentList]);



  return (
      //change app bg color to slate-400
    
      
    <div className='App bg-slate-400 flex '>
      <header>
        <p className='text-center text-red-950'>Header</p>
      </header>
      <nav>
        <h1 className='text-4xl text-center text-white'>Mnemonic</h1>
      </nav>
      <main>
        <Display itemList={currentList} answerList={answerList}/>
        <h1>CurrentWord: {currentWord.word}</h1>
        <Button OnBtnClick={() => {setCurrentWord(currentList[1]); setAnswerList(answerList => [...answerList, currentWord.anwser])}} count={0}/>
        <KeyboardListener />
      </main>
      <footer>
        <p className='text-center text-white'>Footer</p>
      </footer>
      
    </div>
  )
}

export default App
