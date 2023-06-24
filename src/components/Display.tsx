import { listType } from '../types/mnemonicType';

export const Display = ({itemList, answerList}: {itemList: listType[]; answerList: listType[]}) =>{
    
    
    return (
        <div className='display'>
            {itemList.map((item) => (  <div key={item.id} className="word"><span > {item.word}</span> {answerList.map((answer)=> (answer.id === item.id)? <span className=' text-red-500' key={answer.index}>{answer.answer}</span>: "" )}  </div>))}
        </div>
    );
}

