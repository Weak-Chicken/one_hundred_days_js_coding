<template>
  <div class="articlePage">
    <Article v-bind:articlePage="articlePage"/>
    <Reply :replies="articlePage.replies"/>
  </div>
</template>

<script>
import axios from 'axios';
import Article from '@/components/Article.vue';
import Reply from '@/components/Reply.vue';

export default {
  name: 'articlepage',

  data() {
    return {
      articlePage:[],
    }
  },

  components: {
    Article,
    Reply,
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

  .reply {
    background: white;
    width: 60%;
    margin: 1.5rem auto;
    padding: 1rem 1rem;
  }
</style>
