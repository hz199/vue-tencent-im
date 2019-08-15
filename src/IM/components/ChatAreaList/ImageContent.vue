<template>
  <img
    width="300"
    :src="imagesOptions.images.oriImage" alt="">
</template>
<script>
export default {
  name: 'ImageContent',
  props: {
    imagesOptions: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" scoped>
</style>

