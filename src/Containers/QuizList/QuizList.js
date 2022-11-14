import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./QuizList.css"
import axios from "../../Axios/axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";
import Line from "../../Components/UI/Line/Line";
import Ops from "../../Components/img/carieli1.png"
import Button from "../../Components/UI/Button/Button";

class QuizList extends React.Component {
    state = {
        quizes: [],
        loading: true
    }
    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            const Sia = Object.keys(response.data)
            Sia.forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №  - ${index + 1}`
                })
            })
            //console.log(response)
            this.setState({
                quizes,
                loading: false,
            })
        } catch (e) {
            this.setState({loading: false})
            console.log(e)
        }
    }
    renderQuizes() {
        //console.log(this.state.quizes) 
        return this.state.quizes.map((quiz) => {
            return (
                <li 
                    key={quiz.id}
                >
                <NavLink 
                    to={'/quiz/' + quiz.id}
                >
                    {quiz.name}
                </NavLink>
                </li>
            )
        })
    }
    deleteTest() { 
    }
    render() {
        return (
            <div className="QuizList">
                <div>
                    <h1>List of tests</h1>
                    <Line/>
                        <div className="testbox">
                            {
                                (this.state.loading) ?
                                <Loader/>
                                :
                                (this.state.quizes.length === 0) ?
                                <div className="emptyList">
                                    <h2>List is empty</h2>
                                    <img src={Ops} className="Ops"/>
                                    <Link to="/quiz-creator">
                                        <Button 
                                            type='usual'
                                        >
                                            Create list of tests</Button>
                                    </Link>
                                </div>
                                : 
                                <React.Fragment>
                                    <ul>
                                        {this.renderQuizes()}
                                    </ul>
                                </React.Fragment>
                            }
                        </div>
                </div>
            </div>
        )
    }
}


export default QuizList