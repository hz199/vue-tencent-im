<template>
  <div class="IM">
    <IMHeader></IMHeader>
    <div class="content">
      <div class="friend">
        <!-- 最近联系人 -->
        <FriendList
          :Contacts="getRecentContacts"
          title="最近联系人"
          @on-frient-click="handleFriendClick"
        ></FriendList>
      </div>
      <div class="chat-region">
        <div class="chat-list-wrapper" ref="chatListWrapper">
          <ChatAreaList></ChatAreaList>
        </div>
        <div class="chat-input-wrapper">
          <ChatInput></ChatInput>
        </div>
      </div>
      <!-- 好友列表 -->
      <div class="friend friend-border">
        <FriendList
          title="好友列表"
          :Contacts="getMyFriends"
        ></FriendList>
      </div>
    </div>
    <!-- 登录 dialog -->
    <el-dialog
      class="im-login-dialog"
      :fullscreen="true"
      :show-close="false"
      :visible.sync="loginDialogVisible"
      width="50%">
      <div class="login">
        <Login @on-login-submit="onLoginSubmit"></Login>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { initRecentContactList, getMyFriends } from './utils/friend'
import { handleNewMessage } from './utils/messageNew'
import { getLastC2CHistoryMessages } from './utils/messageHistory'

import webIM from './sdk/webim'
import FriendList from './FriendList'
import ChatInput from './ChatInput'
import Login from './Login'
import IMHeader from './IMHeader'
import ChatAreaList from './components/ChatAreaList'

export default {
  name: 'IM',
  components: {
    FriendList,
    ChatInput,
    Login,
    IMHeader,
    ChatAreaList
  },
  data () {
    return {
      // 登录配置
      loginInfo: {
        sdkAppID: '1400241565', //用户所属应用id,必填
        identifier: '', //当前用户ID,必须是否字符串类型，必填
        userSig: '',//当前用户身份凭证，必须是字符串类型，必填
        identifierNick: null, //当前用户昵称，
        headurl: null
      },
      // 登录模态框
      loginDialogVisible: true
    }
  },
  computed: {
    ...mapGetters([
      'getRecentContacts',
      'getMyFriends',
      'getCurrentIMInfo',
      'getCurrentIMInfoMessages'
    ])
  },
  methods: {
    ...mapMutations([
      'setIMUserInfo',
      'setRecentContacts',
      'setMyFriends',
      'setCurrentIMInfoMessages',
      'setCurrentIMInfo'
    ]),
    // 登录
    onLoginSubmit (params) {
      const payload = Object.assign({}, this.loginInfo, params)

      this.webimLogin(payload)
    },
    webimLogin (loginInfo) {
      webIM.login(loginInfo,
        {
        'onConnNotify': this.onConnNotify,
        'onMsgNotify': this.onMsgNotify
        },
        {'isAccessFormalEnv': true,'isLogOn': false},
        // 成功回调
        (successMessage) => {
          // console.log('loginSuccess:', successMessage)
          this.handleSuccessLogin(successMessage, loginInfo)
        },
        // 失败回调
        () => {
          this.$message.error('登录失败，请检查账号是否正确')
        }
      )
    },
    // 登录成功之后的回调
    handleSuccessLogin (successMessage, loginInfo) {
      // vuex 设置当前登录者信息
      this.setIMUserInfo({
        identifierNick: successMessage.identifierNick,
        headurl: successMessage.headurl,
        identifier: loginInfo.identifier
      })
      this.loginDialogVisible = false

      // 初始化最近联系人
      initRecentContactList().then(res => {
        if (res.ActionStatus === 'OK') {
          this.setRecentContacts(res.SessionItem || [])
        }
      })

      // 获取好友列表
      getMyFriends(loginInfo).then(res => {
        if (res.FriendNum > 0) {
          this.setMyFriends(res.InfoItem)
        }
      })
    },
    /**
     * 用于收到连接状态相关通知的回调函数,目前未使用
     */
    onConnNotify (resp) {
      let info
      switch (resp.ErrorCode) {
        case webIM.CONNECTION_STATUS.ON:
          info = '建立连接成功: ' + resp.ErrorInfo
          break
        case webIM.CONNECTION_STATUS.OFF:
          info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo
          break
        case webIM.CONNECTION_STATUS.RECONNECT:
          info = '连接状态恢复正常: ' + resp.ErrorInfo
          break
        default:
          break
      }
      console.log('info: ' + info)
    },
    handleFriendClick (item) {
      this.setCurrentIMInfo({
        selType: webIM.SESSION_TYPE.C2C, // 私聊
        selToID: item.To_Account, // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
        selToHeadUrl:item.C2cImage,
        selSess: null, // 当前聊天会话对象
        nickName: item.C2cNick
      })
    },
    /**
     * 用于收到新消息通知的回调函数
     */
    onMsgNotify (newMsg) {
      handleNewMessage(newMsg)
      // console.log('newMsg: ', newMsg)
    }
  },
  watch: {
    'getCurrentIMInfo.selToID' () {
      getLastC2CHistoryMessages(this.getCurrentIMInfo.selToID).then(res => {
        this.setCurrentIMInfoMessages(res.MsgList || [])
      })
    },
    // 监听聊天历史记录 如果变化回到底部
    'getCurrentIMInfoMessages' () {
     this.$nextTick(() => {
        const chatListWrapper = this.$refs.chatListWrapper
        chatListWrapper.scrollTop = chatListWrapper.scrollHeight
        // console.log(chatListWrapper)
     })
    }
  },
  beforeDestroy () {
    webIM.logout(() => {
      console.log('退出IM成功')
    }, (err) => {
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>
.IM {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    height: 100%;
    .friend {
      min-width: 100px;
      width: 300px;
      height: inherit;
      border-right: 1px solid #eee;
      overflow-x: auto;
    }
    .friend-border {
      border-left: 1px solid #eee;
      border-right: none;
    }
    .chat-region {
      flex-grow: 1;
      height: inherit;
      display: flex;
      flex-direction: column;
      .chat-list-wrapper {
        flex-grow: 1;
        overflow-x: auto;
        min-width: 300px;
        // transition: all 1s;
      }
      .chat-input-wrapper {
        min-height: 150px;
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>

