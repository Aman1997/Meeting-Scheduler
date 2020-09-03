import React, { Component } from 'react';
import './SignInComponent.css';
import axios from 'axios';

class Signin extends Component{
    constructor(props){
        super(props);

        this.state ={
            email : '',
            username : '',
            password: '',
            errors :{
                err_email: '',
                err_username: '',
                err_password: ''
            }
        }
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
            case 'username': error.err_username = value.length < 1 ? 'UserName cannot be blank' : ''
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

    validateForm = (errors) =>{
        let valid = true
        Object.values(errors).forEach( (val) => val.length > 0 && (valid = false))
        return valid
    }

    handleSubmit(event){
        event.preventDefault();

        let data ={
            name : this.state.username,
            email : this.state.email,
            password: this.state.password
        }  
        if(!this.validatForm(this.state.errors)){
            alert('User cannot be registered!!')
        }
        else{
            axios.post('/api/user/register', data)
            .then(response =>  {
                if(response.data.success){
                    let userData = {
                        name: response.data.name,
                        email: response.data.email
                    }
                    this.props.history.replace({ pathname: '/home', state: {userData: userData}})
                }
                else{
                    console.log(response.data.err.message)
                }
            })
            .catch(error => console.error(error.message))  
        }
    }
    render(){
        return(
            <div>
                <div className='signinDiv'>
                    <div className='signinCard'>
                        <div className='image'>
                            <div className='imageOverlay'>
                                <h1>Tryforfree</h1>
                            </div>
                        </div>
                        <div className='signinContent'>
                            <h4>Meeting Scheduler</h4>
                            <h5>Create Account</h5>
                            <form onSubmit = {this.handleSubmit}>
                                <label>Name</label>
                                <input type='text' id="username" name="username" placeholder="Name"
                                value={this.state.name}
                                onChange={this.handleChange}/>
                                <label>Email Address</label>
                                <input type='text' id="email" name="email" placeholder="Email address"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                                <label>Password</label>
                                <input type='password' id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}/>
                                <button type="submit" className='signinButton' 
                                disabled = {!this.state.email || !this.state.password || !this.state.username}>Sign up</button>
                            </form>
                            <span className='error-message'>{this.state.errors.err_email}</span>
                            <span className='error-message'>{this.state.errors.err_username}</span>
                            <span className='error-message'>{this.state.errors.err_password}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signin;