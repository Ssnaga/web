import React, {Component} from 'react';
import axios from 'axios';
import Auth from './Auth';
import './shop.css';
class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products :[]
        };
    }

    componentWillMount(){
        axios.get('/products',{headers: {
            Authorization: "Bearer " + Auth.getToken()
         }}).then((response) => {
            console.log(response.data);
            this.setState({
                products: response.data
            })
        });
    }

    render(){
        let products = this.state.products.map((product)=>{
            return(
                <div class="tableau">
                <tr class="tab">
                    <td class="tab1">{product.titre}</td>
                    <td class="tab2">{product.image}</td>
                    <td class="tab3">{product.price}</td>
                </tr>
                </div>
            )
        });
        return(<tbody> {products} </tbody>);
        
    }
}

export default Shop;