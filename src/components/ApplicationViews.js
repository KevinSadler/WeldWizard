import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import RegistrationForm from "./auth/RegistrationForm";
import LoginForm from "./auth/LoginForm";
import Home from "./home/Home"

class ApplicationViews extends Component {

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials" !== null)

    render() {
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <Home {...props} />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                <Route
                    exact
                    path="/register"
                    render={props => {
                        return <RegistrationForm {...props} loadData={this.loadData} />;
                    }}
                />
                <Route
                    exact
                    path="/login"
                    render={props => {
                        return <LoginForm {...props} loadData={this.loadData} />;
                    }}
                />
            </React.Fragment>
        )
    }
}

export default ApplicationViews