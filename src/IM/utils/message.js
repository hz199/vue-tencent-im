import webIM from '../sdk/webim'
import $store from '../../store'

/**
 * 添加一个新消息 MSG 对象解析成 JSON
 */
export const analysisNewMessage = (message) => {
  if (!message) {return {}}

  let isSelfSend =message.getIsSend() //消息是否为自己发的
  let fromAccount = message.getFromAccount() // 从哪里发过来的消息
  let fromAccountNick = null
  let fromAccountImage = null // 头像
  let sessType = message.getSession().type() // 消息类型 
  let msgTime = webIM.Tool.formatTimeStamp(message.getTime())

  // 如果是自己发的罅隙
  if (isSelfSend) {
    fromAccountNick = $store.state.imUserInfo.identifierNick || fromAccount
    fromAccountImage = $store.state.imUserInfo.headurl || 'http://study.closeeyes.cn/me.jpg'
  } else {
    fromAccountNick = message.getFromAccountNick() || fromAccount
    fromAccountImage = message.fromAccountHeadurl || 'http://study.closeeyes.cn/me.jpg'
  }


  /************************处理子类型消息 start *********************/
  // 消息子类型 会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE 会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
  let subType = message.getSubType()
  // 消息前缀
  let msgTextPrefix = ''
  // 消息信息
  let msgOptions = {}
  switch (subType) {
    case webIM.GROUP_MSG_SUB_TYPE.COMMON: //普通消息 
      msgTextPrefix = '[普通消息]'
      msgOptions = convertMsgtoObjct(message)
      break
    case webIM.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
      msgTextPrefix = '[群红包消息]'
      break
    case webIM.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
      msgTextPrefix = '[群点赞消息]'
      break
    case webIM.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
      msgTextPrefix = '[群提示消息]'
      break
  }

  /************************处理子类型消息 end *********************/

  const results = {
    isSelfSend, // 是否是自己发的消息
    fromAccount, // 消息出处
    fromAccountNick, // 昵称
    fromAccountImage, // 邮箱
    subType, // 子消息类型
    sessType, // 消息类型 webim.SESSION_TYPE.GROUP-群聊 webim.SESSION_TYPE.C2C-私聊，
    msgTextPrefix, // 消息前缀
    msgOptions, // 消息信息 文本 图片 什么的
    msgTime // 消息时间
  }

  return results
}

// 把消息体解析成对象
const convertMsgtoObjct = (msg) => {
  // 获取消息包含的元素数组
  let elems = msg.getElems()
  let elemsLength = elems.length
  let elem = null
  let type = null
  let content = null
  let messageObject = {}

  for (let i = 0; i < elemsLength; i++) {
    elem = elems[i]
    type = elem.getType(); //获取元素类型
    content = elem.getContent(); //获取元素对象

    switch (type) {
      case webIM.MSG_ELEMENT_TYPE.TEXT: // 文本
        messageObject = {
          text: convertTextMsg(content),
          type: webIM.MSG_ELEMENT_TYPE.TEXT
        }
        break
      case webIM.MSG_ELEMENT_TYPE.FACE: // 表情
      messageObject = {
        face: convertFacetMsg(content),
        type: webIM.MSG_ELEMENT_TYPE.FACE
      }
        break
      case webIM.MSG_ELEMENT_TYPE.IMAGE: // 图片
        // 两张以上的图片 ？
        if (i <= elemsLength - 2) {
          const customMsgElem = elems[i + 1] //获取保存图片名称的自定义消息elem
          const imgName = customMsgElem.getContent().getData() //业务可以自定义保存字段，demo中采用data字段保存图片文件名
          messageObject = {
            type: webIM.MSG_ELEMENT_TYPE.IMAGE,
            images: convertImageMsg(content, imgName)
          }
          i++ //下标向后移一位
        } else {
          messageObject = {
            type: webIM.MSG_ELEMENT_TYPE.IMAGE,
            images: convertImageMsg(content)
          }
        }
        break
      case webIM.MSG_ELEMENT_TYPE.SOUND: // 声音
        break
      case webIM.MSG_ELEMENT_TYPE.FILE: // 文件
        break
      case webIM.MSG_ELEMENT_TYPE.LOCATION: // 位置
        break
      case webIM.MSG_ELEMENT_TYPE.CUSTOM: // 自定义消息
        messageObject = {
          type: webIM.MSG_ELEMENT_TYPE.CUSTOM,
          data: convertCustomMsg(content)
        }
        break
      case webIM.MSG_ELEMENT_TYPE.GROUP_TIP: // 群提示
        break
      default:
        webIM.Log.error('未知消息元素类型: elemType=' + type);
        break
    }
  }

  return messageObject
}

/**
 * 解析文本消息元素
 */
const convertTextMsg = (content) => {
  return content.getText()
}

/**
 * 解析图片消息元素
 */
const convertImageMsg = (content, imageName = null) => {
  const smallImage = content.getImage(webIM.IMAGE_TYPE.SMALL) //小图
  const bigImage = content.getImage(webIM.IMAGE_TYPE.LARGE) //大图
  const oriImage = content.getImage(webIM.IMAGE_TYPE.ORIGIN) //原图

  return {
    smallImage: smallImage.getUrl(),
    bigImage: bigImage.getUrl(),
    oriImage: oriImage.getUrl(),
    imageName
  }
}

/**
 * 解析自定义数据 发送过来的对象转化成了字符串
 */
const convertCustomMsg = (content) => {
  try {
    return JSON.parse(content.getData())
  } catch(err) {
    return {}
  }
}

const convertFacetMsg = (content) => {
  return content.getData()
}

