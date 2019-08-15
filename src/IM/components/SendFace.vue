<template>
  <div class="SendFace">
    <el-popover
      placement="top"
      width="400"
      trigger="click">
        <div class="face-wrapper clearfix">
          <div class="face-item" v-for="item in SendFaceJSON" :key="item" @click="handleFace(item)">
            <img :src="item" alt="">
          </div>
        </div>
      <i ref="faceRef" class="el-icon-s-shop" slot="reference"></i>
    </el-popover>
  </div>
</template>
<script>
import { SendFaceJSON } from './SendJSONData'
import { sendFaceMsg } from '../utils/messageSend'
import { mapMutations } from 'vuex'
import { analysisNewMessage } from '../utils/message'

export default {
  name: 'SendFace',
  data () {
    return {
      SendFaceJSON: SendFaceJSON
    }
  },
  methods: {
    ...mapMutations([
      'pushCurrentIMInfoMessages'
    ]),
    handleFace (item) {
      sendFaceMsg(item).then(res => {
        if (res.callOkMessage.ActionStatus === 'OK') {

          // 向聊天历史记录里面 PUSH 一条数据
          this.pushCurrentIMInfoMessages(analysisNewMessage(res.MSG))
        }
      }).catch((err) => {
        console.error('发送表情：', err)
      })
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
