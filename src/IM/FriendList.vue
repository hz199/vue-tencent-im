<template>
  <ul class="friend-ul">
    <li class="li title">
      <h3>{{title}}</h3>
    </li>
    <li class="li"
      v-for="item in Contacts"
      :key="item.To_Account"
      :class="getCurrentIMInfo.selToID === item.To_Account ? 'active': ''"
      @click="onFriendListClick(item)"
      >
      <div class="avatar">
        <img :src="item.C2cImage || 'http://study.closeeyes.cn/me.jpg'" alt="">
      </div>
      <div class="user-message">
        <div class="nick-name">{{item.C2cNick || item.To_Account}}</div>
        <div class="message">{{item.MsgShow}}</div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FriendList',
  props: {
    title: {
      type: String,
      default: ''
    },
    // 联系人列表
    Contacts: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentIMInfo'
    ])
  },
  methods: {
    onFriendListClick (item) {
      this.$emit('on-frient-click', JSON.parse(JSON.stringify(item)))
    }
  }
}
</script>
<style scoped lang="less">
.friend-ul {
  margin: 0;
  padding: 0;
  .li {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 5px;
    cursor: pointer;
    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-items: center;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .user-message {
      padding-left: 5px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .nick-name {
        flex: 1;
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        color: #3d3d3d;
      }
      .message {
        flex: 1;
        font-size: 12px;
        color: rgb(201, 196, 196);
        line-height: 20px;
      }
    }
    h3 {
      margin: 0;
      padding: 0;
    }
  }
  .li.active {
    background: #d7eaf3;
  }
  .title {
    height: 30px;
    line-height: 30px;
    text-align: center;
    h3 {
      width: 100%;
    }
  }
}
</style>
