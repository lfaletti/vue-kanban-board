<template>
  <div id="app">      
    <div class="page-header" v-show="isLoggedIn()">
      <div class="btn top-menu pull-right" v-show="isLoggedIn()" @click="handleLogout()">      
        <button>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></button>      
    </div>
      <h1>Kanban Board</h1>
      <p class="lead">An example of a Kanban board, written in Vue.js</p>
    </div>
    <menu-bar v-show="isLoggedIn()"></menu-bar>

    <router-view/>
  </div>
</template>

<script>

import MenuBar from '@/components/MenuBar';
import TokenAuth from './auth/TokenAuth';
import { mapState } from 'vuex';

const auth = new TokenAuth();

export default {  
  name: 'App' ,
  components: {
        'menu-bar': MenuBar
    },  
  created: function () {
    
  },    
  methods: {        
        handleLogout() {
            auth.logout();
        },
        isLoggedIn() {
            return auth.isAuthenticated();
        },
    },  
};

</script>

<style>

.page-header h1 {
  font-weight: 300;
}

body {
  padding-top: 1rem;
}

.card {
  margin-bottom: 10px;
}

.card:last-child {
  margin-bottom: 25px;
}

.card-block {
  padding: 15px;
}

.card-title {
  margin-bottom: 0;
}

h5 {
  margin-bottom: 0;
}

.close-button {
  background: transparent;
  border: 0;
  margin: 0 0 0 20px;
  padding: 0;
  color: white;
  opacity: 0.3;
}

.close-button:hover {
  cursor: pointer;
}
</style>
