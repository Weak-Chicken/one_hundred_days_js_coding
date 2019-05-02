<template>
  <div class="userPage">
    <div class="userInfo">
      <div class="userName">
        <div class="title">
          <p>主页/</p>
        </div>
        <p>
          <img v-bind:src="userPage.avatar_url" v-bind:title="userPage.loginname"> {{ userPage.loginname }}
        </p>
      </div>
      <div class="userScore">
        <p>{{userPage.score}}积分</p>
      </div>
    </div>

    <div class="recentCreated">
      <div class="title">
        最近创建的话题
      </div>
      <Posts v-bind:posts="userPage.recent_topics" />
    </div>

    <div class="recentResponsed">
      <div class="title">
        最近参与的话题
      </div>
      <Posts v-bind:posts="userPage.recent_replies" />
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Posts from '@/components/Posts.vue';

export default {
  name: 'userpage',

  data() {
    return {
        userPage: [],
    }
  },

  components: {
    Posts,
  },

  created() {
    axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.userName}`)
    .then(res => this.userPage = res.data.data)
    .catch(err => console.log(err));
  },
}
</script>

<style scoped>
  .userInfo {
    background: white;
		width: 60%;
		margin: 10px auto;
  }

  .userInfo p {
    padding: 1rem;
  }

  .title {
    margin: -1rem, -1rem, -1rem, -1rem;
    background-color: rgba(212, 205, 205, 0.17);
    color: rgba(137, 210, 121, 1);
  }

  .recentCreated {
    background: white;
		width: 75%;
		margin: 10px auto;
    padding: 10rem, 10rem, 10rem, 10rem;
  }

  .recentResponsed {
    background: white;
		width: 75%;
		margin: 10px auto;
  }
</style>
