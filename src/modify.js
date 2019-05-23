import React, {Component} from 'react';
import Axios from 'axios';
import Auth from './Auth';

class Modify  extends Component {
    constructor(props) {
        super(props);
        this.state = {colone: '',modif:''};
           
        this.handleChange = this.handleChange.bind(this);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    ///////////////////////////////////////////////////
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

      handleSubmit(event) {
        event.preventDefault();
        const { colone , modif } = this.state;

        // Send a post request
        console.log({ colone , modif });
        Axios.post('/modifProduct', { colone , modif },{headers: { Authorization: "Bearer " + Auth.getToken()}}).then((result)=>{
            //access results
            console.log('passe')

            console.log(result);
        });
      }
    
      render() {
        return (
            <div class="test">
          <form onSubmit={this.handleSubmit}>
            <label>
                
              colone a changer:
              <input type="text" value={this.state.colone} onChange={this.handleChange} name="colone" required/>
            </label>
            <label>
              Modif:
              <input type="text" value={this.state.modif} onChange={this.handleChange} name="modif" required/>
            </label>
           
            <input type="submit" value="Submit" />
          </form>
          </div>
        );
      }
}

export default Modify;