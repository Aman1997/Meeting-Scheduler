import React, { Component } from 'react'
import './LoginComponent.css';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            email : this.state.email,
            password : this.state.password 
        }
    
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
                                <button type="submit" className='loginButton'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login