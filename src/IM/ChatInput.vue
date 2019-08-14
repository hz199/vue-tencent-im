<template>
  <div class="ChatInput">
    <div class="header">
      <!-- 自定义消息 -->
      <SendCustom></SendCustom>
    </div>
    <div class="body">
      <div class="input-wrapper">
        <textarea v-model="currentMessage"></textarea>
      </div>
      <div class="btn-wrapper">
        <el-button class="btn" type="primary" @click="submitNewMsg">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { handleMessageSend } from './utils/messageSend'
import { addNewMessage } from './utils/message'
import { mapGetters, mapMutations } from 'vuex'

import SendCustom from './components/SendCustom'

export default {
  name: 'ChatInput',
  components: {
    SendCustom
  },
  data () {
    return {
      currentMessage: ''
    }
  },
  computed: {
    ...mapGetters([
      'getIMUserInfo',
      'getCurrentIMInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'pushCurrentIMInfoMessages'
    ]),
    submitNewMsg () {
      if (!this.currentMessage) {
        this.$message.error('请填写发送消息')
        return
      }

      handleMessageSend(this.currentMessage, this.getCurrentIMInfo, this.getIMUserInfo).then(res => {
        if (res.callOkMessage.ActionStatus === 'OK') {
          // 发送成功之后输入框清空
          this.currentMessage = ''

          this.pushCurrentIMInfoMessages(addNewMessage(res.MSG))
        }
      }).catch(() => {
        this.$message.error('发送消息失败！')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ChatInput {
  // padding: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    border-bottom: 1px solid #eee;
    display: flex;
    > div {
      width: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      color: #999;
    }
  }
  .body {
    flex-grow: 1;
    position: relative;
    display: flex;
    .input-wrapper {
      flex: 1
    }
    .btn-wrapper {
      width: 100px;
      position: relative;
      .btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
    .input-wrapper {
      position: relative;
      textarea {

        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        resize:none;
        width: 90%;
        // height: inherit;
        border: none;
        outline: none;
        padding: 8px;
        color: #3d3d3d;
        font-size: 14px;
      }
    }
    
  }
}
</style>

