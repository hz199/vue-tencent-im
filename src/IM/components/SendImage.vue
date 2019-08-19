<template>
  <div class="SendImage">
    <el-tooltip content="发送图片" placement="top">
      <i class="el-icon-grape" @click="handleModle"></i>
    </el-tooltip>

    <el-dialog
      title="发送图片"
      :visible.sync="dialogVisible"
      width="30%">


      <div class="upload-wrapper">
        <input ref="inputFileRef" type="file" hidden @change="fileOnChange"/>
        <el-button type="primary" @click="buttonClickToInputFile">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>


      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">发 送</el-button>
      </span> -->
    </el-dialog>

  </div>
</template>
<script>
// import { analysisNewMessage } from '../utils/message'
import { mapMutations } from 'vuex'
import { changeImageFile, sendImageMsg } from '../utils/messageSendImage'
// 解析 MSG 消息对象
import { analysisNewMessage } from '../utils/message'

export default {
  // 发送自定义消息
  name: 'sendCustom',
  data () {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations([
      'pushCurrentIMInfoMessages'
    ]),
    handleModle () {
      this.dialogVisible = true
    },
    buttonClickToInputFile () {
      this.$refs.inputFileRef.click()
    },
    // 上传图片
    fileOnChange () {
      // 长传图片成功之后
      changeImageFile(this.$refs.inputFileRef).then(res => {
        // console.log(res)
        if (res.ActionStatus === 'OK') {
          this.sendImageMsg(res)
        }
      }).catch(err => {
        console.log(err, '出错啦')
      })
    },
    // 发送图片 消息
    sendImageMsg (res) {
      sendImageMsg(res).then(res => {
        if (res.callOkMessage.ActionStatus === 'OK') {
          // 弹框消失
          this.dialogVisible = false
          // 向聊天历史记录里面 PUSH 一条数据 或者 多条
          this.pushCurrentIMInfoMessages(...analysisNewMessage(res.MSG))
        }
      }).catch((err) => {
        console.error('发送表情：', err)
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>