// 获取全局应用程序实例对象
// const app = getApp()
const common = require('../../utils/common')
const WxCharts = require('../../utils/wxcharts')
let lineChart = null
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'worker',
    money: 159,
    dzList: ['今日点赞', '7天点赞', '30天点赞'],
    dz: 0,
    dsList: ['今日打赏', '7天打赏', '30天打赏'],
    ds: 0
  },
  // canvas上的触摸事件
  touchHandler (e) {
    // console.log(lineChart.getCurrentDataIndex(e))
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    })
  },
  // 数据
  updateData () {
    var simulationData = this.createSimulationData()
    var series = [{
      name: '成交量1',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2) + '万'
      }
    }]
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    })
  },
  // 创建模拟数据
  createSimulationData () {
    var categories = []
    var data = []
    for (var i = 0; i < 12; i++) {
      let s = i < 10 ? '0' + i : i
      categories.push(s)
      data.push(Math.random() * (20 - 10) + 10)
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  // 点赞picker切换
  dzChange (e) {
    this.setData({
      dz: e.detail.value
    })
  },
  // 打赏picker切换
  dsChange (e) {
    this.setData({
      ds: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    common.getUserInfo(this)
    var windowWidth = 320
    try {
      var res = wx.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    var simulationData = this.createSimulationData()

    lineChart = new WxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '昨天打赏金额',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '元'
        }
      }, {
        name: '打赏金额',
        data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0, null, null],
        format: function (val, name) {
          return val.toFixed(2) + '元'
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '打赏金额(元)',
        format (val) {
          return val.toFixed(2)
        },
        min: 0
      },
      width: windowWidth,
      height: 320,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    })
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
