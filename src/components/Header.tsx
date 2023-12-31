import { resetTest } from "../helpers/resetTest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAnswerList,
    setCurrentList,
    setCurrentWord,
    setTheme,
    setTime,
    setType,
    timerSet,
} from "../store/actions";
import { State } from "../store/reducer";
import "../styles/Header.scss";
import "../styles/AnimatedTheme.scss";
import { Mnemonic } from "../model/Mnemonic";
import { listType } from "../types/mnemonicType";

export interface Options {
    time: number[];
    theme: string[];
    type: string[];
}

interface AnimationProps {
    top: number;
    left: number;
    theme: string;
}

export const options: Options = {
    time: [300, 600, 900, 1200, 1800],
    theme: [
        "default",
        "mkbhd",
        "mocha",
        "coral",
        "ocean",
        "azure",
        "forest",
        "rose-milk",
        "amethyst",
        "amber",
        "terminal",
        "vscode",
        "mountain",
        "pink-sky",
        "red-season",
    ],
    type: ["numbers", "words"],
};

export default function Header() {
   
    const pref = useSelector((state: State) => state.preferences);
    const time = useSelector((state: State) => state.time);


    const [animationProps, setAnimationProps] =
        useState<AnimationProps | null>();
    const dispatch = useDispatch();
    const mnemonic = new Mnemonic();


    useEffect(() => {
        const theme = localStorage.getItem("theme") || "default";
        const type = localStorage.getItem("type") || "words";
        const time = parseInt(localStorage.getItem("time") || "300", 10);
        
        //================================================================================================
        const tempList = mnemonic.getList(type, time);
        const initialAnswerList = tempList.map((item: listType) => ({
        ...item,
        answer: ""
        }));
        //set list to the word list
        dispatch(setCurrentList(tempList));

        // Set answer list to the initial answer list
        dispatch(setAnswerList(initialAnswerList));
        // Set current word to the first word in the list
        dispatch(setCurrentWord(initialAnswerList[0]));
        //================================================================================================

        dispatch(timerSet(time));
        dispatch(setType(type));
        dispatch(setTime(time));
        dispatch(setTheme(theme));
        
    }, [dispatch]);

    // Set Theme
    useEffect(() => {
        if (pref.theme) {
            document.querySelector(".theme")?.childNodes.forEach((el) => {
                if (el instanceof HTMLButtonElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`button[value="${pref.theme}"]`)
                ?.classList.add("selected");
            document.body.children[0].classList.remove(...options.theme);
            document.body.children[0].classList.add(pref.theme);
            localStorage.setItem("theme", pref.theme);
        }
    }, [dispatch, pref.theme]);

    // Set Time
    useEffect(() => {
        if (pref.timeLimit !== 0) {
            document.querySelector(".time")?.childNodes.forEach((el) => {
                if (el instanceof HTMLButtonElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`button[value="${pref.timeLimit}"]`)
                ?.classList.add("selected");
            dispatch(setTime(pref.timeLimit));
            localStorage.setItem("time", `${pref.timeLimit}`);
            resetTest();
        }
    }, [dispatch, pref.timeLimit]);

    // Set Type
    useEffect(() => {
        if (pref.type !== "") {
            document.querySelector(".type")?.childNodes.forEach((el) => {
                if (el instanceof HTMLButtonElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`button[value="${pref.type}"]`)
                ?.classList.add("selected");
            dispatch(setType(pref.type));
            localStorage.setItem("type", pref.type);
            resetTest();
        }
    }, [dispatch, pref.type]);

    const handleOptions = ({ target, clientX, clientY }: React.MouseEvent) => {
        if (target instanceof HTMLButtonElement && target.dataset.option) {
            if (target.value === pref.theme || +target.value === pref.timeLimit) {
                target.blur();
                return;
            }
            switch (target.dataset.option) {
                case "theme":
                    setTimeout(() => {
                        dispatch(setTheme(target.value));
                    }, 750);
                    setAnimationProps({
                        top: clientY,
                        left: clientX,
                        theme: target.value,
                    });
                    break;
                case "time":
                    dispatch(setTime(+target.value));
                    break;
                case "type":
                    dispatch(setType(target.value));
                    break;
            }
            target.blur();
        }
    };

    function hideHeader():string | undefined {
        const container = document.getElementById(".brand");
        container?.scrollIntoView({ behavior: "smooth", block: "center" });
        return "hidden";
    }

    return (
        <header className={time.timerId ? hideHeader() : undefined}>
            
            <div className="buttons">
                {Object.entries(options).map(([option, choices]) => (
                    <div key={option} className={option}>
                        {option.toUpperCase()}:
                        {choices.map((choice: string) => (
                            <button
                                className="mini"
                                key={choice}
                                data-option={option}
                                value={choice}
                                onClick={(e) => handleOptions(e)}>
                                {choice}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            {animationProps ? (
                <div
                    className={`animated-theme ${animationProps.theme}`}
                    style={{
                        top: animationProps.top,
                        left: animationProps.left,
                    }}
                    onAnimationEnd={() => setAnimationProps(null)}></div>
            ) : null}
        </header>
    );
}
