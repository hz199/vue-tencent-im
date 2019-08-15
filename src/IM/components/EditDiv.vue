<template>
  <div
    class="edit-div"
    v-text="innerText"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
  ></div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "editDiv",
  props: {
    value: {
      type: String,
      default: ""
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    };
  },
  watch: {
    value() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    changeText() {
      this.$emit("input", this.$el.innerHTML);
    }
  }
}
</script>
<style lang="less" scope>
.edit-div {
  width: 100%;
  height: 100%;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  padding: 5px;
  & [contenteditable="true"] {
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>