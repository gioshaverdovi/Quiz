import React, {Component} from "react";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import styles from "./QuizCreator.css"
import { createControl, validate, validateForm } from "../../Form/FormFramework";
import Select from "../../Components/UI/Select/Select";
import axios from "../../Axios/axios-quiz";
import { Link } from "react-router-dom";
import Line from "../../Components/UI/Line/Line";

function createOptionControl(number) {
    return createControl({
        label: `Possible answer ${number}`,
        id: number,
        errorMessage: 'You must enter a pre-response!'
    }, {required: true})
}
function createFormControls() {
    return {
        question: createControl({
            label: 'Enter a question!',
            errorMessage: 'Question required!'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}
class QuizCreator extends React.Component {
    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    submitHandler = event => {
        event.preventDefault()
    }
    addQuestionHandler = event => {
        event.preventDefault()
        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1
        const {question, option1, option2, option3, option4} = this.state.formControls
        const quiestionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        quiz.push(quiestionItem)
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }
    createQuizHandler = async event => {
        event.preventDefault()
        try {
           await  axios.post('/quizes.json', this.state.quiz)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e)
        }
    }
    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <Line/> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        console.log(event.target.value)
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
    render() {
        const select = <Select
            label="Choose the correct answer!"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler} 
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className="QuizCreator">
                <div>
                    <h1>Create test</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderInputs() }
                        { select }
                        <Button
                            type="success"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Add question
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >Create test
                        </Button>

                        <Link to="/">
                            <Button  
                                type='usual'
                                disabled={this.state.quiz.length > 0}
                            >
                                Go to test list</Button>
                        </Link>
                    </form>
                </div>
            </div>
            
        )
    }
}


export default QuizCreator