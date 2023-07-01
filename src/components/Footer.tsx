import { useSelector } from "react-redux";
import { State } from "../store/reducer";
import "../styles/Footer.scss";



export default function Footer() {
    const { timerId } = useSelector((state: State) => state.time);
    
    return (
        <div className={`bottom-area ${timerId ? "hidden" : ""}`}>
            <span className="hint">
                <kbd>Ctrl</kbd> + <kbd>k</kbd> to open command pallet
            </span>
            <span className="hint">
                <kbd>Tab</kbd> to restart test
            </span>
            <footer>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.github.com/FrAnCis0x0/major-system">
                    <span>&lt;/&gt;</span> github
                </a>
                
                <span>
                    created by{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.github.com/FrAnCis0x0">
                        @FrAnCis0x0
                    </a>
                </span>
                <span>
                    Inspired by{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/salmannotkhan/typing-test">
                        @salmannotkhan
                    </a>
                </span>

                
            </footer>
        </div>
    );
}
