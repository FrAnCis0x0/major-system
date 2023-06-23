type ButtonProps = {
    OnBtnClick: () => void;
    count: number;
};



const Button = ({OnBtnClick , count}: ButtonProps) =>{
    return (
        <button className='button' onClick={OnBtnClick}>Count: {count}</button>
    );
}

export default Button;
