<template>
	<div class="postsShowSelection">
		<div class="postsShowSelectionLoading" v-if="loading">
			Loading...<i class="fa fa-refresh fa-spin"></i>
		</div>
		<div class="posts" v-else>
			<ul>
				<li v-for="post in posts" v-bind:key="post.id">
					<img v-bind:src="post.author.avatar_url" v-bind:title="post.author.loginname">
					<span class="replyVisit">
						{{ post.reply_count }}/{{ post.visit_count }}
					</span>
					{{post.title}}
					<span class="to_right">
							{{ post.last_reply_at}}
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'posts',

    data() {
			return {
				posts: [],
				loading: true,
			}
    },
    
    created() {
      axios.get('https://cnodejs.org/api/v1/topics/')
        .then(res => this.posts = res.data.data)
				.catch(err => console.log(err));
		},

		beforeMount() {
			this.loading = false;
		},
}
</script>


<!--Copied from [SD-Gaming](https://github.com/SD-Gaming/Vue2.0_CNode.bbs)-->
<style scoped>
	@import "../static/lib/font-awesome-4.7.0/css/font-awesome.css";
	
	.postsShowSelectionLoading {
		text-align: center;
	}
	.posts {
		background-color: white;
		padding: 0.5rem;
		margin: 1rem 20rem;
	}
	.posts li {
		list-style: none;
		margin-bottom: 14px;
		border-bottom: 1px solid #E7E7E7;
		line-height: 30px;
	}
	.posts ul li img {
		width: 1.5rem;
		height: 1.5rem;
	}
	.posts li .replyVisit {
		display: inline-block;
		text-align: center;
		width: 70px;
		font-size: 12px;
		margin: 0 10px;
	}
	.posts a {
		text-decoration: none;
		color: inherit;
	    -o-text-overflow: ellipsis;
	    white-space: nowrap;
	    display: inline-block;
	    vertical-align: middle;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    max-width: 70%;
	}
	.posts a:visited {
		color:#858585;
	}	
	.posts .last_reply {
		float: right;
   		font-size: 0.7rem;
   	    margin-top: 0.3rem;
  }
  .posts li .to_right {
    float: right;
    font-size: 12px;
    /* margin-right: 50px; */
		/* margin-top: 15px; */
  }
</style>
