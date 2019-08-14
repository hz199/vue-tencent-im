import webIM from '../sdk/webim'
/**
 * 获取最新的c2c历史消息,用于切换好友聊天，重新拉取好友的聊天消息 
 */
export const getLastC2CHistoryMessages = (selToID) => {
  if (!selToID) {
    alert('当前的聊天id非法，selToID')
    return
  }

  const options = {
    'Peer_Account': selToID, //好友帐号
    'MaxCnt': 15, //拉取消息条数
    'LastMsgTime': 0, //最近的消息时间，即从这个时间点向前拉取历史消息
    'MsgKey': ''
  }

  return new Promise((resolve, reject) => {
    webIM.getC2CHistoryMsgs(options, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}