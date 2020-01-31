import Vue from 'vue';
import Vuex from 'vuex';
import localStoragePlugin from './plugins/localStorage';
import { boardApiActions } from './services/api-access';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [localStoragePlugin],
    state: {
        items: {
            todo: [],
            inProgress: [],
            done: []
        },
        nextId: 1,
    },
    actions: {
      getItemsAction : (context) => boardApiActions.getItems(context),
      postItemAction : (context, newItem) => boardApiActions.postItem(newItem, context),
      deleteItemAction : (context, id) => boardApiActions.deleteItem(id, context),
      updateItemAction : (context, updateItemData) => boardApiActions.updateItem(updateItemData, context)       
    },
    mutations: {
        addItem(state, item) {
          state.items.todo.push(item);
        },
        updateItem (state, updateItemData) {                    
          state.items[updateItemData.laneId] = updateItemData.laneItems;                 
        },
        removeItem(state, id) {
            [state.items.todo, state.items.inProgress, state.items.done].forEach(
              array => {                
                const indexInArray = array.findIndex(i => i.id === id);                
                if (indexInArray > -1) {
                  array.splice(indexInArray, 1);
                }
              }
            );
          },
        setItems (state, items) {
            //Vue.set(state, 'items', items);
            state.items = items;
          },
        },   
    }
);