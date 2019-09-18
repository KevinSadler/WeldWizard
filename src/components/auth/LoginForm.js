import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"
// import "bootstrap/dist/css/bootstrap.min.css"
import "./LoginForm.css"


class LoginForm extends Component {

    state = {
        username: "",
        password: "",
        activeUserId: 0,
    }

    componentDidMount() {
        console.log(this.state);
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
      }

    handleLogin = () => {
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
    handleLoginVersion1 = evt => {
        evt.preventDefault()
        UserManager.getAll()
            .then(users => {
                const currentUser = users.find(user => {
                    return user.username === this.state.username && user.password === this.state.password
                })
                if (currentUser !== undefined) {
                    this.setState({activeUserId: currentUser.id})
                    this.handleLogin()
                }
                else {
                    window.alert("Invalid Login Credentials")
                }
            }
            )
    }

    render() {
        return (
            <>
                <form>
                    <fieldset className="loginFormFieldet">
                        <div className="formgrid">
                            <input
                                type="username"
                                required
                                onChange={this.handleFieldChange}
                                id="username"
                                placeholder="Username"
                            />
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleLoginVersion1}

                            >Login</button>
                        </div>
                        <div>
                            <Link to={`/register`}><button>Sign up for free!</button></Link>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}
export default LoginForm
