import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"
import "bootstrap/dist/css/bootstrap.min.css"


class RegistrationForm extends Component {

    state = {
        username: "",
        usernameConfirm: "",
        password: "",
        passwordConfirm: "",
        activeUserId: 0
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleLogin = (user) => {
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                activeUserId: this.state.activeUserId
            })
        )
        this.props.history.push("/");
    }

    /*  Local method for validation, set loadingStatus, create user object, invoke the UserManager post method, and redirect home page
    */
    handleRegister = evt => {
        evt.preventDefault();
        if (this.state.username === "" || this.state.password === "") {
            window.alert("Please fill out registration form!")
            this.setState({ loadingStatus: false })
                ;
        } else {
            if (this.state.username === this.state.usernameConfirm && this.state.password === this.state.passwordConfirm) {
                this.setState({ loadingStatus: true });
                const user = {
                    username: this.state.username,
                    password: this.state.password
                };
                UserManager.getAll()
                    .then(users => {
                        const existingUser = users.find(user => {
                            return user.username === this.state.username
                        })
                        if (existingUser === undefined) {
                            // Create the user and redirect user to her/his home
                            UserManager.post(user)
                                .then(user => {
                                    this.setState({

                                        activeUserId: user.id,
                                        loadingStatus: false
                                    }
                                    )


                                    this.handleLogin(user)

                                })
                        }
                        else {
                            window.alert("User already exists!")
                            this.setState({ loadingStatus: false })
                        }
                    }
                    )
            }
        }

    };

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="username"
                                required
                                onChange={this.handleFieldChange}
                                id="username"
                                placeholder="Enter your username"
                            />
                            <label htmlFor="username">Email</label>
                            <input
                                type="username"
                                required
                                onChange={this.handleFieldChange}
                                id="usernameConfirm"
                                placeholder="Confirm your username"
                            />
                            <label htmlFor="usernameConfirm">Confirm Email</label>
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="create password"
                            />
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="passwordConfirm"
                                placeholder="confirm password"
                            />
                            <label htmlFor="passwordConfirm">confirm password</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleRegister}
                            >Register</button>
                        </div>

                        < div >
                            <Link to={`/login`}><button>Already have an account?</button></Link>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}
export default RegistrationForm
