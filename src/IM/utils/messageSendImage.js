
import webIM from '../sdk/webim'
import $store from '../../store'
// import {analysisNewMessage} from './message' 

/**
 * 上传图片 input file 变化了触发上传图片 
 * <input ref="inputFileRef" type="file" hidden @change="fileOnChange"/>
 * 
 * @param ImageRefFile ref 也就是 input type=file 对象
 */
export const changeImageFile = (ImageRefFile) => {
  // 当前聊天的对象 从 vuex 去除
  const currentIMInfo = $store.state.currentIMInfo

  const file = ImageRefFile.files[0]

  const uploadOptions = {
    'file': file, //图片对象
    'onProgressCallBack': (loadedSize, totalSize) => {
      console.log(loadedSize, totalSize)
    }, //上传图片进度条回调函数
    'To_Account': currentIMInfo.selToID, //接收者
    'businessType': webIM.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG //业务类型 目前只有私聊 也就是向好友发送消息，固定这个 如果是像群组发送 图片是 [webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG]
  }

  return new Promise((resolve, reject) => {
    webIM.uploadPic(uploadOptions,
      function(resp) {
        resolve(resp)
      },
      function(err) {
        reject(err)
      }
    )
  })
}

/**
 * 发送图片消息
 * @param images
 * @param imgName 暂时未用到
 */
export const sendImageMsg = (images, imgName) => {
  // 当前聊天的对象 从 vuex 去除
  const currentIMInfo = $store.state.currentIMInfo
  // 当前登陆者信息
  const currentLoginInfo = $store.state.imUserInfo

  const selSessObject = new webIM.Session(
    currentIMInfo.selType, // 聊天类型
    currentIMInfo.selToID, // 向谁发送消息 账号ID
    currentIMInfo.selToID,
    currentIMInfo.selToHeadUrl, // 头像
    Math.round(new Date().getTime() / 1000) // 时间戳
  )

  const MSG = new webIM.Msg(selSessObject, true, -1, -1, -1, currentLoginInfo.identifier, 0, currentLoginInfo.identifierNick)

  const imagesObj = new webIM.Msg.Elem.Images(images.File_UUID, images.File_UUID) // 第二个参数是 图片的名字这里就设置成了 上传成功之后的 File_UUID

  // 向imagesObj 添加图片 URL 对象
  for (var i in images.URL_INFO) {
    const img = images.URL_INFO[i]
    let newImg;
    let type;
    switch (img.PIC_TYPE) {
        case 1: //原图
            type = 1 //原图
            break
        case 2: //小图（缩略图）
            type = 3; //小图
            break
        case 4: //大图
            type = 2 //大图
            break
    }
    newImg = new webIM.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl)
    imagesObj.addImage(newImg);
  }

  // 向 MSG 添加 imagesObj
  MSG.addImage(imagesObj)

  // 最后发送图片 MSG
  return new Promise((resolve, reject) => {
    webIM.sendMsg(MSG,
      function(resp) {
        resolve({
          MSG: MSG,
          callOkMessage: resp
        })
      },
      function(err) {
        reject(err)
      }
    )
  })
}