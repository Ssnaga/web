import React, {Component} from 'react';
import axios from 'axios';
import Auth from './Auth';
import Login from './login';
import Signup from './signup';
import Shop from './shop';
import Add from './add';
import Remove from './remove';
import Modif from './modify';


class Homepage  extends Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.refreshPage = this.refreshPage.bind(this);
        this. refreshPageAndGoToLogin = this.refreshPageAndGoToLogin.bind(this);
    }

    toggle() {
		this.setState({
			shown: !this.state.shown
        });
        console.log(this.state.shown);

    }
    toggleModif() {
		this.setState({
			chaud: !this.state.chaud
        });
        console.log(this.state.chaud);

    }
    toggleRemove() {
		this.setState({
			rem: !this.state.rem
        });
        console.log(this.state.rem);

    }
    toggleAdd() {
		this.setState({
			add: !this.state.add
        });
        console.log(this.state.add);

    }

<<<<<<< HEAD
=======
    refreshPage(){
        this.forceUpdate();
    }
    
    refreshPageAndGoToLogin(){
        this.refreshPage();
        this.toggle();
    }

    componentWillMount(){
        console.log('Mount homepage')
        axios.post('/test',{},{headers: {
            Authorization: "Bearer " + Auth.getToken()
         }}).then((response) => {
            console.log(response.data);
        });
    }
>>>>>>> ad3d69427cc0246bc90bc63c2191bad916633570

    logout(){
        alert('logout');

        // Add this token to blacklist 
        console.log('zzzz')
        console.log(Auth.getToken());
        console.log(Auth.getUserId());

        Axios.post('/logout',{token:Auth.getToken()}).then((result)=>{
            console.log('tes')
            console.log(Auth.getToken());
            // access results
            console.log(result);
            this.refreshPage();

        })
        
        Auth.deauthenticateUser();

        this.refreshPage();
    }
    ///////////////////////////////////////
    
    add(){
        alert('add');
        const { titre, image, price } = this.state2;
        Axios.post('/addproduct', { titre, image, price },{headers: { Authorization: "Bearer " + Auth.getToken()}}).then((result)=>{
            //access results
            console.log(result);
        });
    }
    //////////////////////////////////////
    
    render() {
        var shown = {
			display: this.state.shown ? "none" : "block"
		};
		
		var hidden = {
            display: this.state.shown ? "block" : "none"
        };
        var modifOn = {
            display: this.state.chaud ? "block" : "none"
        };
        var modifOff = {
            display: this.state.chaud ? "block" : "none"
        };
        var removeOn = {
            display: this.state.rem ? "block" : "none"
        };
        var removeOff = {
            display: this.state.rem ? "block" : "none"
        };
        var addOn = {
            display: this.state.add ? "block" : "none"
        };
        var addOff = {
            display: this.state.add ? "block" : "none"
        };
        
        return (
            <div>
            {Auth.isUserAuthenticated() ? (
                <div>
                    <div id="logout">Logout <button onClick={this.logout.bind(this)}>LogOut</button></div>
                    <div class="tableau">
                <tr class="tab">
                    <td class="tab1">TITRE</td>
                    <td class="tab2">STATE</td>
                    <td class="tab3">ORDER OF PRORITY</td>
                </tr>
                </div>
                    <Shop/>
                 <div >Remove a Book<button onClick={this.toggleRemove.bind(this)}>Remove</button></div>
                 <div style={ removeOn }>
                <Remove/>
                 </div>
                 <div style={ removeOff }>
                 </div>
                 <div >Add a Book<button onClick={this.toggleAdd.bind(this)}>Add</button></div>
                 <div style={addOn }>
                <Add/>
                 </div>
                 <div style={ addOff }>
                 </div>
                 <div >modify a Book<button onClick={this.toggleModif.bind(this)}>modify</button></div>
                 <div style={ modifOn }>
                <Modif/>
                 </div>
                 <div style={ modifOff }>
                 </div>

                </div>
             ) : (

               <div id="login">

                 <div style={ shown }>
                    <Login refreshPage={this.refreshPage} /><br/>
                    <button onClick={this.toggle.bind(this)}>Register</button>
                 </div>
                 <div style={ hidden }>
                    <Signup refreshPage={this.refreshPage} />
                </div>
            
                  
               </div>
           )}
           </div>
        );
    }
}

export default Homepage;