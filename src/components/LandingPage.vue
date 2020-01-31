
<template>
      <div class="row">
        <div class="col-md-12">          
          <h1 class="text-white"> Welcome to the Kanban Board</h1>
          <p v-show="!isAuthenticated()">Please <button class="btn btn-primary" @click="login()">login</button> to start collaborating</p>
        </div>
      </div>                   

</template>

<script>
import TokenAuth from '../auth/tokenauth'

export default {
    name: 'LandingPage',
    methods: 
    {
        isAuthenticated: () => (new TokenAuth()).isAuthenticated(),
        login: () => new TokenAuth().login(),
    }
        
}
</script>

<style>


</style>