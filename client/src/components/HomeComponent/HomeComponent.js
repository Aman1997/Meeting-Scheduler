import React, { Component } from 'react';
import './HomeComponent.css';
import { withRouter } from 'react-router';
import axios from 'axios';


class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            emailWith: '',
            date: '',
            from: '',
            to: '',
            meetings : {}
        }    

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchMeetingsData = this.fetchMeetingsData.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.fetchMeetingsData()
    }

    fetchMeetingsData(){
        console.log('Fetching for '+this.props.location.state.userData.email)
        axios.get('/api/user/getAllMeetings')
            .then((response) => {this.setState({meetings : response.data.meetingsData})
            console.log(this.state.meetings)})
            .catch(err => console.log(err))
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
        event.preventDefault()
        let dataToSubmit = {
            email: this.props.location.state.userData.email,
            emailWith: this.state.emailWith,
            date: this.state.date,
            from: this.state.from,
            to: this.state.to
        }
        axios.post('/api/user/bookMeeting', dataToSubmit)
             .then(response => {this.setState({meetings : response.data})})
             .then(this.setState({
                emailWith: '',
                date: '',
                from: '',
                to: '',
             }))
             .then(alert("Meeting has been booked"))
             .then(this.fetchMeetingsData())
             .catch(err => console.log(err))
    }

    logout() {
        axios.get('/api/user/logout')
            .then((response) => {
                if(response.data.logoutSuccess){
                    alert('You have logged out sucessfully!!');
                    this.props.history.push('/');
                }
            })   
            .catch(err => console.log(err))
    
    }

    render(){
        return(
            <div className='home'>
                <span className='profile'>Welcome ,{this.props.location.state.userData.name}&nbsp;&nbsp;&nbsp;<span className='fa fa-sign-out' onClick = {this.logout}></span></span>
                <div className='appointment'>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' name='emailWith' id='emailWith' value={this.state.emailWith}
                        onChange={this.handleChange}/>
                        <input type="date" name="date" id="date"value={this.state.date}
                        onChange={this.handleChange}/>
                        <label>To :</label><input type='number' name='from' id='from' placeholder='0000hrs'
                        value={this.state.from}
                        onChange={this.handleChange}/>
                        <label>from :</label><input type='number' name='to' id='to'placeholder='0000hrs'
                        value={this.state.to}
                        onChange={this.handleChange}/>
                        <button type='submit' className='bookAppointment'>Book meeting</button>
                    </form>
                    <div className="booked-meetings">
                        <h3>Booked meetings</h3>
                        <table>
                            <thead>
                                <th>With</th>
                                <th>Date</th>
                                <th>Time</th>
                            </thead>
                            {Object.keys(this.state.meetings).map((meeting,index) => (
                                <tr key = {index}>
                                    <td>{this.state.meetings[meeting].emailWith}</td>
                                    <td>{this.state.meetings[meeting].date}</td>
                                    <td>{this.state.meetings[meeting].from} - {this.state.meetings[meeting].to}</td>
                                </tr>
                            ))}
                        </table>   
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Home);