import React from "react";
import Layout from "./Components/Layout/Layout";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Quiz from "./Containers/Quiz/Quiz";
import QuizList from "./Containers/QuizList/QuizList";
import Auth from "./Containers/Auth/Auth";
import QuizCreator from "./Containers/QuizCreator/QuizCreator";




class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/quiz-creator" element={<QuizCreator/>}/>
                    <Route path="/quiz/:id" element={<Quiz/>}/>
                    <Route path="/" element={<QuizList/>}/>
                </Routes>
            </Layout>
        )
    }
}

export default App;
