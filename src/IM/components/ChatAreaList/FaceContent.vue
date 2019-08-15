<template>
  <div class="FaceContent">
    <img :src="FaceOptions.face" alt="">
  </div>
</template>
<script>
export default {
  name: "FaceContent",
  props: {
    FaceOptions: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" scoped>
.FaceContent {
  max-width: 200px;
  max-height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}

</style>
