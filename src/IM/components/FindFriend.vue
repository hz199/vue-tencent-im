<template>
  <div class="FindFriend">
    <el-row type="flex">
      <el-col :span="20">
        <el-input v-model="findFriendUserID" placeholder="请输入用户账号"></el-input>
      </el-col>
      <el-col :span="4" style="text-align:center;">
        <el-button type="primary" @click="handleSelectClick">查找</el-button>
      </el-col>
    </el-row>
    <!-- table start -->
    <el-table
      :data="friendTableData"
      style="width: 100%; margin-top:20px;">
      <el-table-column
        prop="To_Account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="Nick"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="Gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="AllowType"
        label="加好友方式">
      </el-table-column>
      <el-table-column
        prop="Image"
        label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.Image" width="50" height="50" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleAddFriend(scope.row)" type="text" size="small">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table end -->
  </div>
</template>
<script>
import webIM from '../sdk/webim'
import { mapGetters } from 'vuex'
import { applyAddFriend } from '../utils/friend'
import { GenderMapText, AllowTypeMapText } from '../utils/mapText'

export default {
  name: 'FindFriend',
  data () {
    return {
      // 要查找朋友的账号
      findFriendUserID: '',
      friendDialogVisible: true,
      friendTableData: []
    }
  },
  computed: {
    ...mapGetters([
      'getIMUserInfo'
    ]),
    getFindFriendOption () {
      return {
        'To_Account': [this.findFriendUserID],
        'TagList': ['Tag_Profile_IM_Nick', 'Tag_Profile_IM_Gender', 'Tag_Profile_IM_AllowType', 'Tag_Profile_IM_Image'] // 昵称, 性别, 加好友方式, 头像
      }
    }
  },
  methods: {
    handleAddFriend (rowData) {
      const options = {
        'From_Account': this.getIMUserInfo.identifier,
        'AddFriendItem': [
          {
            'To_Account': rowData.To_Account,
            "AddSource": "AddSource_Type_Unknow",
            "AddWording": '你好，可以加个好友吗？' //加好友附言，可为空
          }
        ]
      }

      applyAddFriend(options).then(() => {
        if (rowData.AllowType === '允许任何人') {
          this.$message({
            type: 'success',
            message: '添加好友成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '申请添加好友成功'
          })
        }


      }).catch(() => {
        this.$message.error('添加好友失败！')
      })

    },
    findFriend (option) {
      webIM.getProfilePortrait(option || {}, (res) => {
        if (res.ActionStatus === 'OK') {
          this.handleFriendList(res.UserProfileItem)
        }
      }, () => {
        this.$message.error('查找不到用户，请检查账号！')
      })
    },
    handleSelectClick () {
      if (!this.findFriendUserID) {
        this.$message({
          showClose: true,
          message: '请填写用户账号！',
          type: 'warning'
        })
        return
      }

      this.findFriend(this.getFindFriendOption)
    },
    // 整理用户列表 加入table 表格
    handleFriendList (userList = []) {
      // 转换用户数据
      const list = userList.map(item => {
        let nick = '未知'
        let gender = '未知'
        let allowType = '未知'
        let imageUrl = null

        item.ProfileItem.forEach(oItem => {
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
          'To_Account': webIM.Tool.formatText2Html(item.To_Account), // 用户名字
          'Nick': webIM.Tool.formatText2Html(nick),
          'Gender': gender,
          'AllowType': allowType,
          'Image': imageUrl
        }
      })

      this.friendTableData = Object.freeze(list)
    }
  }
}
</script>

