<template>
  <header class="header clearfix">
    <div class="userinfo">

    </div>
    <div class="menu-wrapper">
      <el-dropdown>
        <el-button type="primary" size="small">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="friendDialogVisible = true">查找好友</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 查找好友 模态框 -->
    <el-dialog
      title="查找朋友"
      :visible.sync="friendDialogVisible"
      width="50%">
      <FindFriend></FindFriend>
    </el-dialog>
  </header>
</template>
<script>
import FindFriend from './components/FindFriend'

export default {
  name: 'IMHeader',
  components: {
    FindFriend
  },
  data () {
    return {
      friendDialogVisible: false
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 64px;
  border-bottom: 1px solid #eee;
  .userinfo {
    float: left;
    line-height: 64px;
  }
  .menu-wrapper {
    float: right;
    padding-right: 20px;
    line-height: 64px;
  }
}
.clearfix::after {
  clear: both;
  content: '';
  line-height: 0;
  height: 0;
  overflow: hidden;
}
</style>

