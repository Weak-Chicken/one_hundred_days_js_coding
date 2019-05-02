<template>
  <div class="articlePage">
    <Article v-bind:articlePage="articlePage"/>
  </div>
</template>

<script>
import axios from 'axios';
import Article from '@/components/Article';

export default {
  name: 'articlepage',

  data() {
    return {
      articlePage:[],
    }
  },

  components: {
    Article,
  },

  created() {
    axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.topicId}`)
      .then(res => this.articlePage = res.data.data)
      .catch(err => console.log(err));
  }

}
</script>

<style scoped>
  .article {
    background: white;
    width: 60%;
    margin: 1.5rem auto;
    padding: 1rem 1rem;
  }
</style>
