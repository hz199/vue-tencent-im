<template>
  <ul id="chat_list_wrapper" ref="UL">
    <li v-for="item in getCurrentIMInfoMessages" :key="item.time" class="clearfix">
      <div class="textLeft" v-if="!item.isSelfSend">
        <div class="headImage">
          <img width="40" height="40" :src="item.fromAccountImage" alt="">
        </div>
        <div class="chat-wrapper" style="margin-left: 10px;">
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
        </div>
      </div>

      <div class="textRight" v-else>
        <div class="chat-wrapper" style="margin-right: 10px;">
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
        </div>
        <div class="headImage">
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

export default {
  name: 'ChatAreaList',
  components: {
    TextContent,
    ImageContent
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
.clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
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
