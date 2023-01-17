import { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../store/actions/userActions";

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
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value })
    }
    render() {
        const { firstName, lastName } = this.state
        return (
            <div className='sign-up'>
                <div>
                    Sign up
                    <form onSubmit={(ev) => this.signUpUser(ev)}>
                        <input value={firstName} onChange={this.handleChange} type="text" name="firstName" placeholder='First name' />
                        <input value={lastName} onChange={this.handleChange} type="text" name="lastName" placeholder='Last name' />
                        <button>gg</button>
                    </form>
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
    setUser
}

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp)
