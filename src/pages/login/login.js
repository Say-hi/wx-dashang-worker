// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'login',
    img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
  },
  // 获取用户信息
  getUserInfo () {
    if(app.gu()){
      this.setData({
        userInfo: app.gu()
      })
    } else {
      app.gu(this.getUserInfo)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getUserInfo()
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
