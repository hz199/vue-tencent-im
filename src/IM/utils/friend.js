import webIM from '../sdk/webim'

const TOTAL_MSG_NUMBER = 20

/**
 * 申请加好友 option
 * @param [From_Account] 当前登录用户的账号
 * @param [AddFriendItem] 添加好友的列表 [{'To_Account': '账号', 'AddSource': 'AddSource_Type_Unknow', 'AddWording': '留言'}]
 */
export const applyAddFriend = function (options) {
  return new Promise((resolve, reject) => {
    webIM.applyAddFriend(
      options,
      function (resp) {
        if (resp.Fail_Account && resp.Fail_Account.length > 0) {
          reject(resp)
        } else {
          resolve(resp)
        }
      },
      function (err) {
        reject(err)
      }
    )
  })
}

/**
 * 初始化最近联系人列表
 */
export const initRecentContactList = function () {
  return new Promise((resolve, reject) => {
    webIM.getRecentContactList({
      'Count': TOTAL_MSG_NUMBER
    }, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

/**
 * 获取好友列表
 */
export const getMyFriends = function (loginInfo) {
  return new Promise((resolve, reject) => {
    webIM.getAllFriend({
      'From_Account': loginInfo.identifier,
        'TimeStamp': 0,
        'StartIndex': 0,
        'GetCount': 100, // 获取多少条
        'LastStandardSequence': 0,
        'TagList': [
          'Tag_Profile_IM_Nick',
          'Tag_SNS_IM_Remark',
          'Tag_Profile_IM_Gender',
          'Tag_Profile_IM_Image'
        ]
    }, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}
