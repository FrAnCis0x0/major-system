type ButtonProps = {
    OnBtnClick: () => void;
    name: string;
};



const Button = ({OnBtnClick , name}: ButtonProps) =>{
    return (
        <button className='button' onClick={OnBtnClick}>{name}</button>
    );
}

export default Button;
