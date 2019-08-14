<template>
  <span class="TextContent">
    {{text}}
  </span>
</template>
<script>
export default {
  name: 'TextContent',
  props: ['text']
}
</script>
<style lang="less" scoped>
.TextContent {
  display: inline-block;
  max-width: 400px;
  word-wrap:break-word;
  text-align: left;
}
</style>

