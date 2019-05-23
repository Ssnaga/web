import React, {Component} from 'react';
import Axios from 'axios';
import Auth from './Auth';

class Remove  extends Component {
    constructor(props) {
        super(props);
        this.state = {titre: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
          this.setState({[event.target.name]: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const {titre} = this.state;
        // Send a post request
        console.log("c'est typart");

        Axios.post('/removeProduct',{titre},{headers: { Authorization: "Bearer " + Auth.getToken()}}).then((response)=>{
console.log(response);


        },
        (error)=>{
          console.log(error);
        });
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Titre:
              <input type="text" value={this.state.titre} onChange={this.handleChange} name="titre" required/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default Remove;