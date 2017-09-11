// 获取全局应用程序实例对象
/*eslint-disable*/
// const app = getApp()
const common = require('../../utils/common')
const WxCharts = require('../../utils/wxcharts')
let lineChart = null
var columnChart = null
var chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37, 15, 20, 45, 37, null, 15, 20, 45, 37, 15, 20, 45, 37],
    categories: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
  },
  sub: [{
    title: '2012年度成交量',
    data: [70, 40, 65, 100, 34, 18],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2015年度成交量',
    data: [76, 54, 23, 12, 45, 65],
    categories: ['1', '2', '3', '4', '5', '6']
  }]
}
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'worker',
    money: 159,
    line: false,
    curNav: 1,
    chartTitle: '总成交量',
    isMainChartDisplay: true,
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
    var simulationData2 = this.createSimulationData()
    var series = [
      {
        name: '昨天打赏金额',
        color: '#ff0000',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) + '元'
        }
      },
      {
        name: '今日打赏金额',
        color: '#ffff00',
        data: simulationData2.data,
        format: function (val, name) {
          return val.toFixed(2) + '元'
        }
      }
    ]
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
    if (this.data.dz * 1 === e.detail.value * 1) return
    this.setData({
      dz: e.detail.value
    })
    this.updateData()
  },
  // 打赏picker切换
  dsChange (e) {
    if (this.data.ds * 1 === e.detail.value * 1) return
    this.setData({
      ds: e.detail.value
    })
    this.backToMainChart()
  },
  // 展示图形切换
  choose (e) {
    if (this.data.curNav * 1 === e.currentTarget.dataset.index * 1) return
    this.setData({
      curNav: e.currentTarget.dataset.index,
      line: !this.data.line
    })
    if(this.data.line) {
      this.updateData()
    } else {
      this.backToMainChart()
    }
  },
  backToMainChart () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    })
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format (val, name) {
          return val.toFixed(2) + '万'
        }
      }]
    })
  },
  touchHandlerTwo (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: chartData.sub[index].data,
          format (val, name) {
            return val.toFixed(2) + '万'
          }
        }]
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (params) {
    this.setData({
      id: params.id,
      from: params.from
    })
    common.getUserInfo(this)
    var windowWidth = 320
    try {
      var res = wx.getSystemInfoSync()
      windowWidth = res.windowWidth
    } catch (e) {
      console.error('getSystemInfoSync failed!')
    }
    var simulationData = this.createSimulationData()
    // 曲线图
    lineChart = new WxCharts({
      canvasId: 'lineCanvas',
      width: windowWidth,
      height: 320,
      animation: true, // 是否动画展示
      legend: true, // 是否显示图标下方的各类标识
      type: 'line', // 图表类型，可选值为pie, line, column, area, ring, radar
      categories: simulationData.categories,
      background: '#f5f5f5',
      series: [{s
        name: '昨天打赏金额',
        data: simulationData.data,
        color: '#ff0000',
        format (val, name) {
          return val.toFixed(2) + '元'
        }
      }, {
        name: '打赏金额',
        color: '#ffff00',
        data: [2, 0, 0, 3, null, 4, 0, 0, 2, 0, null, null],
        format (val, name) {
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
      dataLabel: true,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve' // curve 曲线 straight 直线
      }
    })
    // 柱状图
    columnChart = new WxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format (val, name) {
          return val.toFixed(2) + '万'
        }
      }],
      yAxis: {
        format (val) {
          return val + '万'
        },
        title: '打赏统计',
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 20
        }
      },
      width: windowWidth,
      height: 320,
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
