import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import RegistrationForm from "./auth/RegistrationForm";
import LoginForm from "./auth/LoginForm";
import Home from "./home/Home"
import MigForm from "./mig/MigForm"
import FluxForm from "./flux/FluxForm"
import StickForm from "./stick/StickForm"
import TigForm from "./tig/TigForm"

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
                <Route
                    exact
                    path="/MigForm"
                    render={props => {
                        return this.isAuthenticated()
                        ?(<MigForm {...props} />)
                        :(<Redirect to="/login"/>)
                    }}
                />
                <Route
                    exact
                    path="/FluxForm"
                    render={props => {
                        return this.isAuthenticated()
                        ?(<FluxForm {...props} />)
                        :(<Redirect to="/login"/>)
                    }}
                />
                <Route
                    exact
                    path="/StickForm"
                    render={props => {
                        return this.isAuthenticated()
                        ?(<StickForm {...props} />)
                        :(<Redirect to="/login"/>)
                    }}
                />
                <Route
                    exact
                    path="/TigForm"
                    render={props => {
                        return this.isAuthenticated()
                        ?(<TigForm {...props} />)
                        :(<Redirect to="/login"/>)
                    }}
                />
            </React.Fragment>
        )
    }
}

export default ApplicationViews