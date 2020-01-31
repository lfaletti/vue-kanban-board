import axios from 'axios';
import TokenAuth from '../auth/tokenauth';
import { mapper } from './mapper';

const auth = new TokenAuth();
const BASE_URL = 'http://localhost:3333';
const REL_URL = '/api/board/items'


export const boardApiActions = {
    getItems(context) {
        const url = `${BASE_URL}${REL_URL}`;        
        return axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }})
        .then(response => {            
            var items = mapper.parseIncomingData(response.data);            
            context.commit('setItems', items);                                
            resolve();

        }).catch(err => err || 'Unable to retrieve data');              
    },
    updateItem(modifiedItem, context) {        
        const url = `${BASE_URL}${REL_URL}`;                
        return axios.patch(url, modifiedItem, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }})
        .then(response => {                    
            if (response.status !== 200){                
                context.store.dispatch('getItemsAction'); // errored, refresh ui
            }
        }).catch(err => err || 'Unable to update individual item');

    },
    postItem(newItem, context) {
        const url = `${BASE_URL}${REL_URL}`;
        return axios.post(url, newItem, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }})
        .then(response => {                        
            var item = mapper.parseNewItem(response.data);                                              
            context.commit('addItem', item);                    
            resolve();            

        }).catch(err => err || 'Unable to retrieve data');
    },
    deleteItem(id, context) {
        const url = `${BASE_URL}${REL_URL}`+"/"+id;        
        return axios.delete(url, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }} )
        .then(response => {            
            if (response.status === 200){                
                context.commit("removeItem", id);
            }
        });
    }
};



