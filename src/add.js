import React, {Component} from 'react';
import Axios from 'axios';
import Auth from './Auth';

class Add  extends Component {
    constructor(props) {
        super(props);
        this.state = {titre: '',image:'',price:0};
           
        this.handleChange = this.handleChange.bind(this);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    ///////////////////////////////////////////////////
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

      handleSubmit(event) {
        event.preventDefault();
        const { titre, image, price } = this.state;

        // Send a post request
        
        Axios.post('/addproduct', { titre, image, price },{headers: { Authorization: "Bearer " + Auth.getToken()}}).then((result)=>{
            //access results
            console.log(result);
        });
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              titre:
              <input type="text" value={this.state.titre} onChange={this.handleChange} name="titre" required/>
            </label>
            <label>
              Image:
              <input type="text" value={this.state.image} onChange={this.handleChange} name="image" required/>
            </label>
            <label>
              price:
              <input type="number" value={this.state.price} onChange={this.handleChange} name="price" required/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default Add;