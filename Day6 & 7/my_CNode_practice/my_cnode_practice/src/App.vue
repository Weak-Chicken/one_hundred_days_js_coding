<template>
  <div id="app">
    <cnodeheader/>
    <router-view/>
  </div>
</template>

<script>
import cnodeheader from '@/components/layout/CNodeHeader.vue'

export default {
  components: {
    cnodeheader,
  }
}
</script>

<!--Copied from [SD-Gaming](https://github.com/SD-Gaming/Vue2.0_CNode.bbs)-->
<style>
	html {
    background-color: #DDDDDD;
	}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
      font-size: 20px;
  }
  body,div,span,a,p,ul,li {
    margin: 0;
    padding: 0;
  }
</style>
