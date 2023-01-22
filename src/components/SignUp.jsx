import { Component } from "react";
import { connect } from "react-redux";
import { setUser, setDemoUser } from "../store/actions/userActions";
import signUp from "../assets/imgs/sign-up.svg";

class _SignUp extends Component {

    state = {
        firstName: '',
        lastName: ''
    }

    signUpUser = (ev) => {
        ev.preventDefault()
        const { firstName, lastName } = this.state
        if (!firstName || !lastName) {
            alert('You must fill all the fileds')
            return
        }
        this.props.setUser({ firstName, lastName })
    }

    logAsDemoUser = () => {
        this.props.setDemoUser()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }
    render() {
        const { firstName, lastName } = this.state
        return (
            <div className='sign-up'>
                <div className="sign-up-modal">
                    <form onSubmit={(ev) => this.signUpUser(ev)}>
                        <h1>Sign up</h1>
                        <section>
                            <div>
                                <input value={firstName} onChange={this.handleChange} type="text" name="firstName" placeholder='First name' />
                                <input value={lastName} onChange={this.handleChange} type="text" name="lastName" placeholder='Last name' />
                            </div>
                            <button type="submit">Sign Up</button>
                            <button onClick={this.logAsDemoUser} type="button">
                                <p>Log in as a Demo user</p>
                                <p>(recommended for full features experience)</p>
                            </button>
                        </section>
                    </form>
                    <img src={signUp} alt="" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    setUser,
    setDemoUser
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)
