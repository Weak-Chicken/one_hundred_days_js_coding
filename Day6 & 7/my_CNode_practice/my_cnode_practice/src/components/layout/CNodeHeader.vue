<template>
  <div id="cnodeHeader">
    <div id="nav" class="Header">
      <router-link to="/">
        <img src="@/assets/cnodejs_light.svg"/>
      </router-link>
      <span class="toRight"><router-link to="/about">About</router-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cnodeHeader',
}
</script>

<!--Copied from [SD-Gaming](https://github.com/SD-Gaming/Vue2.0_CNode.bbs)-->
<style scoped>
	.Header {
		background:#5a5555 ;
		height: 50px;
	}
	a {
		text-decoration: none;
		color: #cbc9c9;
	}
	img {
		max-width: 120px;
		margin-left: 50px;
		margin-top: 10px;
	}
	.toRight {
		float: right;
		margin-right: 50px;
		margin-top: 15px;
	}
</style>