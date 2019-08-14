import $store from '../../store'
import { addNewMessage } from './message'
/**
 * 处理新消息
 */
export function handleNewMessage(newMsgList) {
  const newMessage = addNewMessage(newMsgList[0])

  $store.commit('pushCurrentIMInfoMessages', newMessage)
}
