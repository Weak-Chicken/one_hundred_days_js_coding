<template>
  <div class="reply">
    <div v-for="reply in replies" v-bind:key="reply.id">
      <div v-html="reply.content"></div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reply',
  props: ['replies'],
}
</script>

<style scoped>

</style>
