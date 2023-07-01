import { useEffect, useRef, useState } from 'react'
import { Display } from './components/Display';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './store/reducer';
import { changeAnswer, setRef, setTimerId } from './store/actions';
import { recordTest } from './helpers/recordTest';
import "./styles/themes.scss";
import Header from './components/Header';
import CommandPallet from "./components/CommandPallet";
import Footer from './components/Footer';

function App() {
  

const app = useSelector((state: State) => state.app);
const time = useSelector((state: State) => state.time);

  const dispatch = useDispatch();
    const [showPallet, setShowPallet] = useState(false);

    const activeWord = useRef<HTMLDivElement>(null);




    useEffect(() => {
      dispatch(setRef(activeWord));
      document.onkeydown = (e) => {
          if (e.ctrlKey && e.key === "k") {
              setShowPallet((s:boolean) => !s);
              console.log("ctrl + k");
              e.preventDefault();
          } else if (
              e.key.length === 1 ||
              e.key === "Backspace" ||
              e.key === "Tab"||
              e.key == "Enter"
            
          ) {
              recordTest(e.key, e.ctrlKey);
              e.preventDefault();
          }
      };
      return () => {
          document.onkeydown = null;
      };
        
    }, [dispatch]);


  useEffect(() => {
    if (!time.timer && time.timerId) {
        clearInterval(time.timerId);
        dispatch(setTimerId(null));
    }
}, [dispatch, time.timer, time.timerId]);


  useEffect(() =>{
    dispatch(changeAnswer(app.currentWord.answer));
  },[app.currentWord]);





  return (
      
    <>
        <h1 className='brand'>Major System</h1>
        <Header/>
        <Display activeWordRef={activeWord}/>
        {showPallet && <CommandPallet setShowPallet={setShowPallet} />}
        <Footer/>
    </>
  )
}

export default App
