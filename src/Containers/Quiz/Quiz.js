import React, {Component} from "react";
import styles from "./Quiz.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuez from "../../Components/FinishedQuez/FinishedQuez";
import axios from "../../Axios/axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class Quiz extends Component {
    state = {
        results: {}, 
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId){
            if (!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            
            const timeout = window.setTimeout(() =>{
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id]= 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    async componentDidMount() {
        try {
          const response = await axios.get(`/quizes/${this.props.params.id}.json`)
          const quiz = response.data
    
          this.setState({
            quiz,
            loading: false
          })
        } catch (e) {
          console.log(e)
        }
      }
    render() {
        return(
            <div className="Quiz">
                
                <div className="QuizWrapper">
                    <h1>Answer the questions</h1>

                    {
                        this.state.loading
                        ? <Loader />
                        :
                            this.state.isFinished ? 
                            <FinishedQuez
                                results={this.state.results}
                                quiz={this.state.quiz} 
                                onRetry={this.retryHandler}
                            />
                             : 
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                   
                </div>
            </div>
        )
    }
}

export default withParams(Quiz)