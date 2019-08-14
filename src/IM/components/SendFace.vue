<template>
  <div class="sendCustom">
    <el-popover
      placement="top"
      width="400"
      trigger="click">
        <div class="face-wrapper clearfix">
          <div class="face-item" v-for="item in SendFaceJSON" :key="item">
            <img :src="item" alt="">
          </div>
        </div>
      <i ref="faceRef" class="el-icon-s-shop" slot="reference" @click="handleFace"></i>
    </el-popover>
  </div>
</template>
<script>
import { SendFaceJSON } from './SendJSONData'

export default {
  name: 'SendFace',
  data () {
    return {
      SendFaceJSON: SendFaceJSON
    }
  },
  methods: {
    handleFace () {
      
    }
  }
}
</script>
<style lang="less" scope>
.face-wrapper {
  width: 400px;
  height: 180px;
  overflow: auto;
  .face-item {
    width: 80px;
    height: 80px;
    padding: 5px;
    float: left;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
