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
    jz: false,
    zd: false,
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
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
  // 获取输入内容
  inputValue (e) {
    // let type = e.currentTarget.dataset.type
    // let value = e.detail.value
    app.inputValue(e, this)
    // if (type === 'phone') {
    //   this.setData({
    //     phone: value
    //   })
    // } else if (type === 'pwd') {
    //   this.setData({
    //     pwd: value
    //   })
    // }
  },
  // 用户登陆
  userLogin () {
    let { phone, pwd } = this.data
    if (!phone) {
      wx.showToast({
        title: '请输入手机号码'
      })
    } else if (phone.length * 1 !== 11) {
      wx.showToast({
        title: '请输入有效的手机号码'
      })
    } else if (!pwd) {
      wx.showToast({
        title: '请输入密码'
      })
    } else {
      wx.setStorageSync('login', {phone, pwd})
      wx.setStorageSync('pd', {jz: this.data.jz, zd: this.data.zd})
      wx.showModal({
        title: '选择跳转页面',
        cancelText: '员工页面',
        confirmText: '商家页面',
        success (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../boss/boss'
            })
          } else if (res.cancel) {
            wx.redirectTo({
              url: '../worker/worker'
            })
          }
        }
      })
      // todo
    }
  },
  // 登陆选项
  switch1Change (e) {
    if (e.currentTarget.dataset.type === 'jz') {
      if (!this.data.jz) {
        this.setData({
          jz: true
        })
      } else {
        this.setData({
          jz: false,
          zd: false
        })
      }
    } else {
      if (!this.data.zd) {
        this.setData({
          zd: true,
          jz: true
        })
      } else {
        this.setData({
          zd: false
        })
      }
    }
  },
  // 登陆判断
  checkLogin () {
    let pd = wx.getStorageSync('pd')
    let { phone, pwd } = wx.getStorageSync('login')
    if (pd) {
      this.setData({
        jz: pd.jz,
        zd: pd.zd
      })
    } else {
      pd = {
        jz: false,
        zd: false
      }
    }
    if (phone && pwd && pd.zd) {
      this.setData({
        phone,
        pwd
      })
      this.userLogin()
    } else if (phone && pwd && pd.jz) {
      this.setData({
        phone,
        pwd
      })
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
    this.checkLogin()
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
