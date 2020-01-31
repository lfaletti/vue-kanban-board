// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

//  // Your web app's Firebase configuration
//  const firebaseConfig = {
//   apiKey: "AIzaSyCUxkbZqnGvYxWk_x379Xis90De2hT3nbE",
//   authDomain: "kanban-board-943f5.firebaseapp.com",
//   databaseURL: "https://kanban-board-943f5.firebaseio.com",
//   projectId: "kanban-board-943f5",
//   storageBucket: "kanban-board-943f5.appspot.com",
//   messagingSenderId: "631174273949",
//   appId: "1:631174273949:web:2438572871958ca25ead74",
//   measurementId: "G-V3LQ3BBNC8"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {    
    //store.dispatch('getItemsAction');
  }
});