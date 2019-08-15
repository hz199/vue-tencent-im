import Vue from 'vue'
import Vuex from 'vuex'

import webIM from './IM/sdk/webim'
import { GenderMapText, AllowTypeMapText } from './IM/utils/mapText'
import { analysisNewMessage } from './IM/utils/message'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前聊天者的类型，ID，
    currentIMInfo: {
      selType: webIM.SESSION_TYPE.C2C,
      selToID: null, // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
      selSess: null // 当前聊天会话对象
    },
    // 当前聊天人的历史聊天记录
    currentIMInfoMessages: [],
    // 当前登陆者信息
    imUserInfo: {
      identifierNick: '',
      headurl: '',
      identifier: ''
    },
    // 最近联系人列表
    recentContacts: [],
    // 好友列表
    myFriends: []
  },
  getters: {
    getIMUserInfo (store) {
      return store.imUserInfo
    },
    // 最近联系人
    getRecentContacts: (store) => store.recentContacts,
    // 好友列表
    getMyFriends: (store) => store.myFriends,
    // 获取当前联系人
    getCurrentIMInfo: (store) => store.currentIMInfo,
    // 获取当前聊天人的历史聊天记录
    getCurrentIMInfoMessages: (store) => store.currentIMInfoMessages
  },
  mutations: {
    setIMUserInfo (store, payload) {
      store.imUserInfo = payload
    },
    // 最近联系人
    setRecentContacts (store, payload = []) {
      const firstContacts = payload[0] || {}
  
      // 初始化当前联系人
      const currentIMInfo = {
        selType: webIM.SESSION_TYPE.C2C,
        selToID: firstContacts.To_Account,
        selSess: null,
        selToHeadUrl: firstContacts.C2cImage,
        nickName: firstContacts.C2cNick
      }
      store.currentIMInfo = currentIMInfo 
  
      store.recentContacts = payload
    },
    // 设置好友列表数据
    setMyFriends (store, payload = []) {
      let newFriends = payload.map(item => {
        let nick = '未知'
        let gender = '未知'
        let allowType = '未知'
        let imageUrl = null
  
        item.SnsProfileItem.forEach(oItem => {
          switch (oItem.Tag) {
            case 'Tag_Profile_IM_Nick':
              nick = oItem.Value
              break
            case 'Tag_Profile_IM_Gender':
              gender = GenderMapText[oItem.Value]
              break
            case 'Tag_Profile_IM_AllowType':
              allowType = AllowTypeMapText[oItem.Value] || '需要确认'
              break
            case 'Tag_Profile_IM_Image':
              imageUrl = oItem.Value
              break
          }
        })
  
        return {
          'To_Account': item.Info_Account, // 用户名字
          'C2cNick': nick,
          'Gender': gender,
          'AllowType': allowType,
          'C2cImage': imageUrl
        }
      })
  
      store.myFriends = newFriends
    },
    // 设置当前聊天的好友信息
    setCurrentIMInfo (store, payload = {}) {
      store.currentIMInfo = payload
    },
    // 设置当前聊天对象的 历史聊天记录
    setCurrentIMInfoMessages (store, payload = []) {
      const newMsgList = payload.map(item => {
        return analysisNewMessage(item)
      })
      // console.log(analysisNewMessage(payload[14]))
      store.currentIMInfoMessages = newMsgList
    },
    // 向当前两天对象的聊天历史记录里面 push  一条新数据
    pushCurrentIMInfoMessages (store, payload) {
      store.currentIMInfoMessages.push(payload)
    }
  },
  actions: {

  }
})
