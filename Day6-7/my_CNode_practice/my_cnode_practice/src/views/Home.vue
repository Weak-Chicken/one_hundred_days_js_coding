<template>
  <div class="home">
    <Posts v-bind:posts="posts"/>
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue';
import axios from 'axios';

export default {
  name: 'home',

  components: {
    Posts
  },

  data() {
    return {
      posts: [],
    }
  },

  created() {
    axios.get('https://cnodejs.org/api/v1/topics/')
      .then(res => this.posts = res.data.data)
      .catch(err => console.log(err));
  },
}
</script>

<style scoped>

</style>
