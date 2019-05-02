<template>
    <div class="article">
      <div class="articleInfo">
        <div class="title">
          {{ articlePage.title }}
        </div>
        <div class="otherInfo">
          <p>·发布于{{articlePage.create_at}}</p> 
          <p>·作者 {{articlePage.author.loginname}}</p>
          <p>·{{articlePage.visit_count}} 次浏览</p>
          <p>·最后一次编辑是 </p>
          <p>·来自 {{articlePage.tab}}</p>
        </div>
      </div>
      <hr>
      <div v-html="articlePage.content" id="content"></div>
    </div>
</template>

<script>
export default {
  name: 'article',
  props: ["articlePage"],
}
</script>

<style scoped>
  .article .articleInfo .otherInfo {
    font-size: 12px;
    word-break: normal;
    white-space: normal;
  }
</style>
