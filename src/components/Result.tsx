import { useSelector } from "react-redux";
import "../styles/Result.scss";
import { State } from "../store/reducer";
import { resetTest } from "../helpers/resetTest";

export default function Result() {
    const time = parseInt(localStorage.getItem("time") || "300", 10);
    const app = useSelector((state: State) => state.app);
    
    return (
        <div className="result">
        <table>
            <tbody>
                
                <tr>
                    <th>Correct Words:</th>
                    <td>{`${app.countCorrect} / ${time}`}</td>
                </tr>
                
                <tr>
                    <td colSpan={2} align="center">
                        <button onClick={() => resetTest()}>Restart</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}
