<template>
  <div class="CustomContent">
    <div class="goodsImg-wrapper">
      <img :src="customOptions.data.goodsImage" alt />
    </div>
    <div class="goods-msg-wrapper">
      <div class="title">
        <h2>{{customOptions.data.goodsName}}</h2>
      </div>
      <div class="describe">
        <h3>{{customOptions.data.describe}}</h3>
      </div>
      <div class="prize">
        <h4>{{customOptions.data.prize}}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomContent",
  props: {
    customOptions: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
<style lang="less" scoped>
.CustomContent {
  display: inline-block;
  max-width: 400px;
  word-wrap: break-word;
  text-align: left;
  display: flex;
  .goodsImg-wrapper {
    width: 150px;
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
  .goods-msg-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    h2,
    h3,
    h4 {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }
    h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    h4 {
      font-size: 14px;
    }
  }
}
</style>
