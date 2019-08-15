import $store from '../../store'
import { analysisNewMessage } from './message'
/**
 * 处理新消息
 */
export function handleNewMessage(newMsgList) {
  const newMessage = analysisNewMessage(newMsgList[0])

  $store.commit('pushCurrentIMInfoMessages', newMessage)
}
