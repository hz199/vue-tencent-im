<template>
  <div class="sendCustom">
    <el-tooltip content="自定义消息" placement="top">
      <i class="el-icon-s-comment" @click="handleDrawer"></i>
    </el-tooltip>

    <el-drawer
      title="我是标题"
      size="20%"
      :visible.sync="drawerVisible"
      :direction="'rtl'">
      <ul class="ul">
        <li class="li" v-for="(item, index) in SendCustomJSON" :key="index" @click="handleSendCustom(item)">
          <div class="goodsImg-wrapper">
            <img :src="item.goodsImage" alt="">
          </div>
          <div class="goods-msg-wrapper">
            <div class="title">
              <h2>{{item.goodsName}}</h2>
            </div>
            <div class="describe">
              <h3>{{item.describe}}</h3>
            </div>
            <div class="prize">
              <h4>{{item.prize}}</h4>
            </div>
          </div>
        </li>
      </ul>
    </el-drawer>

  </div>
</template>
<script>
import { SendCustomJSON } from './SendJSONData'
import { sendCustomMsg } from '../utils/messageSend'
import { addNewMessage } from '../utils/message'
import { mapMutations } from 'vuex'

export default {
  // 发送自定义消息
  name: 'sendCustom',
  data () {
    return {
      drawerVisible: false,
      SendCustomJSON: SendCustomJSON
    }
  },
  methods: {
    ...mapMutations([
      'pushCurrentIMInfoMessages'
    ]),
    handleDrawer () {
      this.drawerVisible = true
    },
    handleSendCustom (item) {
      sendCustomMsg(JSON.parse(JSON.stringify(item))).then(res => {
        if (res.callOkMessage.ActionStatus === 'OK') {
          this.drawerVisible = false

          // 向聊天历史记录里面 PUSH 一条数据
          this.pushCurrentIMInfoMessages(addNewMessage(res.MSG))
        }
      }).catch(() => {
        // TODO 发送失败
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ul, .li {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
.li {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 5px 5px #eeeeee;
  cursor: pointer;
}
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
  h2, h3, h4 {
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
</style>