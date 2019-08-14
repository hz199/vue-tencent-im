
import webIM from '../sdk/webim'

export const handleMessageSend = (msgContent, currentIMInfo, currentLoginInfo) => {
  // 当前聊天的对象 从 vuex 去除
  // const currentIMInfo = $store.state.IM.currentIMInfo
  // // 当前登陆者信息
  // const currentLoginInfo = $store.state.IM.imUserInfo

  // 构建 selSessObject 对象
  const selSessObject = new webIM.Session(
    currentIMInfo.selType, // 聊天类型
    currentIMInfo.selToID, // 向谁发送消息 账号ID
    currentIMInfo.selToID,
    currentIMInfo.selToHeadUrl, // 头像
    Math.round(new Date().getTime() / 1000) // 时间戳
  )

  const isSend = true //是否为自己发送
  const seq = -1 //消息序列，-1表示sdk自动生成，用于去重
  const random = Math.round(Math.random() * 4294967296) //消息随机数，用于去重
  const msgTime = Math.round(new Date().getTime() / 1000) //消息时间戳
  let subType //消息子类型
  if (currentIMInfo.selType == webIM.SESSION_TYPE.C2C) {
    subType = webIM.C2C_MSG_SUB_TYPE.COMMON
  } else {
    subType = webIM.GROUP_MSG_SUB_TYPE.COMMON
  }

  // 构建要发送的消息
  const MSG = new webIM.Msg(selSessObject, isSend, seq, random, msgTime, currentLoginInfo.identifier, subType, currentLoginInfo.identifierNick);

  // 解析文本和表情
  addMSGText(MSG, msgContent)

  MSG.PushInfo = {
    "PushFlag": 0,
    "Desc": '测试离线推送内容', //离线推送内容
    "Ext": '测试离线推送透传内容', //离线推送透传内容
    "AndroidInfo": {
      "Sound": "android.mp3" //离线推送声音文件路径。
    },
    "ApnsInfo": {
      "Sound": "apns.mp3", //离线推送声音文件路径。
      "BadgeMode": 1
    }
  };

  MSG.PushInfoBoolean = true //是否开启离线推送push同步
  MSG.sending = 1
  MSG.originContent = msgContent

  return new Promise((reslove, reject) => {
    webIM.sendMsg(MSG, function (resp) {
      reslove({
        MSG: MSG,
        callOkMessage: resp
      })
    }, function (err) {
      reject(err)
    })
  })
}

/**
 * 解析文本和表情
 */
const addMSGText = (msg, msgContent) => {
  let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex
  const expr = /\[[^[\]]{1,3}\]/mg
  const emotions = msgContent.match(expr)
  if (!emotions || emotions.length < 1) {
    text_obj = new webIM.Msg.Elem.Text(msgContent);
    msg.addText(text_obj)
  } else {
    for (var i = 0; i < emotions.length; i++) {
      tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
      if (tmsg) {
        text_obj = new webIM.Msg.Elem.Text(tmsg)
        msg.addText(text_obj)
      }
      emotionIndex = webIM.EmotionDataIndexs[emotions[i]];
      emotion = webIM.Emotions[emotionIndex];

      if (emotion) {
        face_obj = new webIM.Msg.Elem.Face(emotionIndex, emotions[i]);
        msg.addFace(face_obj)
      } else {
        text_obj = new webIM.Msg.Elem.Text(emotions[i])
        msg.addText(text_obj)
      }
      restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length
      msgContent = msgContent.substring(restMsgIndex)
    }
    if (msgContent) {
      text_obj = new webIM.Msg.Elem.Text(msgContent)
      msg.addText(text_obj)
    }
  }
}
