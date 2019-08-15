
import webIM from '../sdk/webim'
import $store from '../../store'
// import {analysisNewMessage} from './message' 

/**
 * 上传图片
 */
export const handleMessageSend = (ImageRefFile) => {
  const file = ImageRefFile.files[0]
  console.log(file)
}