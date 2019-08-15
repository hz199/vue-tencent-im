<template>
  <ul id="chat_list_wrapper" ref="UL">
    <li v-for="item in getCurrentIMInfoMessages" :key="item.time" class="clearfix">
      <div :class="item.isSelfSend ? 'textRight' : 'textLeft'">
        <!-- 左侧头像 -->
        <div class="headImage" v-if="!item.isSelfSend">
          <img width="40" height="40" :src="item.fromAccountImage" alt="">
        </div>
        <div class="chat-wrapper" :style="item.isSelfSend ? 'margin-right: 10px;' :'margin-left: 10px;'">
          <!-- 文本 start -->
          <TextContent
            v-if="item.msgOptions.type === MSG_ELEMENT_TYPE.TEXT"
            :text="item.msgOptions.text"></TextContent>
          <!-- 文本 end -->

          <!-- 图片 start -->
          <ImageContent
            v-if="item.msgOptions.type === MSG_ELEMENT_TYPE.IMAGE"
            :imagesOptions="item.msgOptions"
          >
          </ImageContent>
          <!-- 图片 end -->
          <!-- 自定义内容 start -->
          <CustomContent
            v-if="item.msgOptions.type === MSG_ELEMENT_TYPE.CUSTOM"
            :customOptions="item.msgOptions"
          ></CustomContent>
          <!-- 自定义内容 end -->
          <!-- 表情 start -->
          <FaceContent
            v-if="item.msgOptions.type === MSG_ELEMENT_TYPE.FACE"
            :FaceOptions="item.msgOptions"
          ></FaceContent>
          <!-- 表情 end -->
        </div>
        <!-- 右侧头像 -->
        <div class="headImage" v-if="item.isSelfSend">
          <img width="40" height="40" :src="item.fromAccountImage" alt="">
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import wenIM from '../../sdk/webim'

import TextContent from './TextContent'
import ImageContent from './ImageContent'
import CustomContent from './CustomContent'
import FaceContent from './FaceContent'

export default {
  name: 'ChatAreaList',
  components: {
    TextContent,
    ImageContent,
    CustomContent,
    FaceContent
  },
  data () {
    return {
      MSG_ELEMENT_TYPE: wenIM.MSG_ELEMENT_TYPE
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentIMInfoMessages',
      'getIMUserInfo'
    ])
  }
}
</script>


<style lang="less" scoped>
ul {
  padding: 10px;
  margin: 0;
}
li {
  padding: 5px;
  margin-bottom: 10px;
  list-style: none;
  .textLeft {
    float: left;
    display: flex;
    .chat-wrapper {
      background-color: #eee;
    }
    .chat-wrapper:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-right: 6px solid #eee;
      position: absolute;
      top: 8px;
      left: -12px;
    }
  }
  .textRight {
    float: right;
    display: flex;
    .chat-wrapper:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-left: 6px solid #a6e860;
      position: absolute;
      top: 8px;
      right: -12px;
    }
  }
  .chat-wrapper {
    position: relative;
    border-radius: 7px;
    background-color: #a6e860;
    padding: 6px 10px 8px 10px;
    z-index: 1;
    display: inline-block;
    font-size: 12px;
    color: #333;
    line-height: 28px;
    text-align: right;
  }
}
</style>
