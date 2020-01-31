<template>
  <div>
      <h3>Loading....</h3>
  </div>
</template>

<script>

import TokenAuth from '../auth/TokenAuth'

export default {
  name: '',
  mounted() {
    this.$nextTick(() => {
   new TokenAuth().handleAuthentication();
    });
  },
};

</script>