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
        <input ref="inputFileRef" type="file" hidden/>
        <el-button type="primary" @click="buttonClickToInputFile">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">发 送</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import { analysisNewMessage } from '../utils/message'
import { mapMutations } from 'vuex'

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
    handleUploadImage (item) {
    }
  }
}
</script>
<style lang="less" scoped>

</style>