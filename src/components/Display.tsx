import { listType } from '../types/mnemonicType';


export const Display = ({itemList, answerList}: {itemList: listType[]; answerList: string[]}) =>{
    
    
    return (
        <div className='display'>
            {itemList.map((item) => (  <div key={item.id} className="word"><span > {item.word}</span> <span>{item.anwser} </span> </div>))}
        </div>
    );
}

