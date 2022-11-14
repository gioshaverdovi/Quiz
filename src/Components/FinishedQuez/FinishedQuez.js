import React from "react";
import Styles from "./FinishedQuez.css";
import { FcApproval, FcCancel } from "react-icons/fc";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";


const FinishedQuez = props => {
    const rightCount = Object.keys(props.results).reduce((jami, key) => {
        if (props.results[key] === 'success') {
            jami ++
        }
        return jami
    }, 0)
    return (
        <div className="FinishedQuez">
            <ul>
                {props.quiz.map((quizItem, index) => {
                   // console.log(props);
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            {props.results[index + 1] === 'success'  ? 
                                < FcApproval className="icon"/>
                                :
                                 < FcCancel className="icon"/>}
                        </li>
                    )
                })}
            </ul>
            <p>სწორად უპასუხეთ {props.quiz.length} დან {rightCount} კითხვას </p>
            <div>
                <Button onClick={props.onRetry} type='primary'>გამეორება</Button>
                <Link to="/">
                    <Button  type='success'>გადადი ტესტების სიაში</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuez