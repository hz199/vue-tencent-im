<template>
  <div id="app">
    <IM></IM>
  </div>
</template>

<script>
import IM from './IM/IM'

export default {
  name: 'app',
  components: {
    IM
  }
}
</script>
<style>
.clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>