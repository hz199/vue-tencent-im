<template>
  <div class="center">
    <div class="ear ear--left"></div>
    <div class="ear ear--right"></div>
    <div class="face">
      <div class="eyes">
        <div class="eye eye--left">
          <div class="glow"></div>
        </div>
        <div class="eye eye--right">
          <div class="glow"></div>
        </div>
      </div>
      <div class="nose">
        <svg width="38.161" height="22.03">
          <path
            d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z"
            fill="#243946"
          />
        </svg>
        <div class="glow"></div>
      </div>
      <div class="mouth">
        <svg class="smile" viewBox="-2 -2 84 23" width="84" height="23">
          <path
            d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161"
            fill="none"
            stroke-width="3"
            stroke-linecap="square"
            stroke-miterlimit="3"
          />
        </svg>
        <div class="mouth-hole"></div>
        <div class="tongue breath">
          <div class="tongue-top"></div>
          <div class="line"></div>
          <div class="median"></div>
        </div>
      </div>
    </div>
    <div class="hands">
      <div class="hand hand--left">
        <div class="finger">
          <div class="bone"></div>
          <div class="nail"></div>
        </div>
        <div class="finger">
          <div class="bone"></div>
          <div class="nail"></div>
        </div>
        <div class="finger">
          <div class="bone"></div>
          <div class="nail"></div>
        </div>
      </div>
      <div class="hand hand--right">
        <div class="finger">
          <div class="bone"></div>
          <div class="nail"></div>
        </div>
        <div class="finger">
          <div class="bone"></div>
          <div class="nail"></div>
        </div>
        <div class="finger">
          <div class="bone"></div>
          <div class="nail"></div>
        </div>
      </div>
    </div>
    <div class="login">
      <el-form :model="userInfo" :rules="userInfoRules" ref="ruleForm">
        <el-form-item prop="identifier">
          <el-input placeholder="userId" v-model="userInfo.identifier">
            <template slot="prepend">
              <i class="el-icon-phone"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userSig">
          <el-input placeholder="UserSig" v-model="userInfo.userSig">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button style="padding-left:100px;padding-right:100px" type="info" @click="handleSubmit('ruleForm')" round>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="social-buttons">
      <div class="social">
        <div class="fa fa-wechat"></div>
      </div>
      <div class="social">
        <div class="fa fa-weibo"></div>
      </div>
      <div class="social">
        <div class="fa fa-paw"></div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      userInfo: {
        identifier: 'admin1',
        userSig: 'eJwtzF0LgjAUxvHvsuuQs82NErqIkih6gwy6VXayUynzpVVG3z1RL5-fA-8vizZHz2HJAiY8YKNuk8G8pgt1HJuMcj48lbnH1pJhAfcBhM*VVv2Db0sltq6UEgDQa01ZZ1pJyfV4MlQobcNV07zwcI0MrZfzInQSYf85PZMZhOkDd1GxvZlyVbnFGabs9wdubjKi'
      },
      userInfoRules: {
        identifier: { required: true, message: '请输入账号！', trigger: 'blur' },
        userSig: { required: true, message: '请输入用户签名，控制台中获取！', trigger: 'blur' }
      }
    }
  },
  methods: {
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('on-login-submit', this.userInfo)
        } else {
          this.$message.error('请根据提示填写相应的数据！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./styles/Login.less');
</style>
