// 获取全局应用程序实例对象
const app = getApp()
const common = require('../../utils/common')
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'login',
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    showText: '获取验证码',
    // numberDisabled: false,
    iv: {}
  },
  // 获取用户信息
  getUserInfo () {
    if (app.gu()) {
      this.setData({
        userInfo: app.gu()
      })
    } else {
      app.gu(this.getUserInfo)
    }
  },
  // 获取验证码
  getNumber () {
    this.setData({
      numberDisabled: true
    })
    let time = 60
    let that = this
    let timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer)
        that.setData({
          numberDisabled: false,
          showText: '重新获取验证码'
        })
        return
      }
      that.setData({
        showText: --time + 's'
      })
    }, 1000)
    // todo
  },
  // 获取输入内容
  inputValue (e) {
    app.inputValue(e, this)
    // let type = e.currentTarget.dataset.type
    // let value = e.detail.value
    // let { iv } = this.data
    // if (type === 'phone') {
    //   iv['phone'] = value
    // } else if (type === 'captcha') {
    //   iv['captcha'] = value
    // } else if (type === 'cPwd') {
    //   iv['cPwd'] = value
    // } else if (type === 'pwd') {
    //   iv['pwd'] = value
    // }
    // this.setData({
    //   iv
    // })
  },
  // 密码重置
  register () {
    let { phone, captcha, cPwd, pwd } = this.data
    if (!phone || (phone.length * 1 !== 11)) {
      wx.showToast({
        title: '请输入正确的手机号码'
      })
    } else if (!captcha) {
      wx.showToast({
        title: '请输入验证码'
      })
    } else if (!cPwd || !pwd) {
      wx.showToast({
        title: '请输入密码'
      })
    } else if (pwd !== cPwd) {
      wx.showToast({
        title: '两次输入的密码不一致'
      })
    } else {
      // todo
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // this.getUserInfo()
    common.getUserInfo(this)
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
