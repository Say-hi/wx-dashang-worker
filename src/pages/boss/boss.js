// 获取全局应用程序实例对象
// const app = getApp()
// const common = require('../../utils/common')
// const WxCharts = require('../../utils/wxcharts')
// let lineChart = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'boss',
    money: 159,
    level: 2.3,
    dsCount: 56,
    plCount: 23,
    curNav: 0,
    nav: ['今天数据', '7天数据', '30天数据'],
    lists: [
      {
        name: '哈啊打',
        count: 20,
        id: 12,
        money: 100
      },
      {
        name: '哈啊打',
        count: 20,
        id: 12,
        money: 100
      },
      {
        name: '哈啊打',
        count: 20,
        id: 12,
        money: 100
      },
      {
        name: '哈啊打',
        count: 20,
        id: 12,
        money: 100
      },
      {
        name: '哈啊打',
        count: 20,
        id: 12,
        money: 100
      }
    ]
  },
  // 导航选择
  navChoose (e) {
    if (e.currentTarget.dataset.index * 1 === this.data.curNav) return
    this.setData({
      curNav: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
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
    let that = this
    wx.setNavigationBarTitle({
      title: '员工界面--刷新数据中...'
    })
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      wx.setNavigationBarTitle({
        title: '员工界面'
      })
      that.updateData()
    }, 2000)
    // TODO: onPullDownRefresh
  }
})
