import React, { Component } from 'react'
import './LoginComponent.css';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            errors : {
                err_email: '',
                err_password: ''
            }
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value} = event.target
        let error = this.state.errors
        let validEmailRegex = /\S+@\S+\.\S+/

        switch(name){
            case 'email': error.err_email = validEmailRegex.test(value) ? '' : 'Email is not valid!'
                        break
            case 'password': error.err_password = value.length < 8 ? 'Password must be 8 characters long!'  : ''
                        break
            default : break                         
        }

        this.setState({
          [name]: value,
          errors : error 
        });
    }

    validatForm = (errors) =>{
        let valid = true
        Object.values(errors).forEach( (val) => val.length > 0 && (valid = false))
        return valid
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            email : this.state.email,
            password : this.state.password 
        }
        if(!this.validatForm(this.state.errors)){
            alert('User cannot login!!')
        }
        else{
            axios.post('/api/user/login', data)
            .then(response => {
                if(response.data.loginSuccess) { 
                    let userData = {
                        name: response.data.name,
                        email: response.data.email
                    }
                    this.props.history.replace({ pathname: '/home', state: {userData: userData}})
                }    
                else{ alert(response.data.message)}
            })
            .catch(error => alert(error.message))
        }

    }

    render(){
        return(
            <div>
                <div className='loginDiv'>
                    <div className='loginCard'>
                        <div className='loginimage'>
                            <div className='imageOverlay'>
                                <h1>Tryforfree</h1>
                            </div>
                        </div>
                        <div className='loginContent'>
                            <h4>Meeting Scheduler</h4>
                            <h5>Welcome back!</h5>
                            <form onSubmit = {this.handleSubmit}>
                                <label>Email Address</label>
                                <input type='text' id="email" name="email" placeholder="Email address"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                                <label>Password</label>
                                <input type='password' id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}/>
                                <button type="submit" className='loginButton' disabled={!this.state.email || !this.state.password}>Login</button>
                            </form>
                            <span className='error-message'>{this.state.errors.err_email}</span>
                            <span className='error-message'>{this.state.errors.err_password}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login