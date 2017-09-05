/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
// const wechat = require('./utils/wechat')
// const Promise = require('./utils/bluebird')
/*eslint-disable*/
const useUrl = require('./utils/service')
App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: '广州人马网络科技有限公司--打赏小程序',
    version: '0.1.0',
    userInfo: null
    /*eslint-disable*/
    /*eslint-enable*/
  },
  // 输入框内容
  inputValue (e, _that) {
    let that = _that
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type === 'name') {
      that.setData({
        name: value
      })
    } else if (type === 'height') {
      that.setData({
        userHeight: value
      })
    } else if (type === 'company') {
      that.setData({
        compny: value
      })
    } else if (type === 'sport') {
      that.setData({
        likesSports: value
      })
    } else if (type === 'movie') {
      that.setData({
        likesMovies: value
      })
    } else if (type === 'book') {
      that.setData({
        likesBooks: value
      })
    } else if (type === 'evaluate') {
      that.setData({
        comment: value
      })
    }
  },
  // 发起微信支付
  wxpay (obj) {
    let objs = {
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType || 'MD5',
      paySign: obj.paySign,
      success: obj.success || function (res) {
        console.log('未传入success回调函数', res)
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:', err.errMsg)
      },
      complete: obj.complete || function () {}
    }
    wx.requestPayment(objs)
  },
  // 上传媒体文件
  wxUpload (obj) {
    let s = {
      url: obj.url,
      filePath: obj.filePath,
      name: obj.name || 'file',
      header: {
        'content-type' : 'multipart/form-data'
      },
      formData: obj.formData,
      success: obj.success || function (res) {
        console.log('未传入成功回调函数', res)
      },
      fail: obj.fail || function (res) {
        console.log('为传入失败回调函数', res)
      },
      complete: obj.complete || function () {}
    }
    wx.uploadFile(s)
  },
  // 请求数据
  wxrequest (obj) {
    // wx.showLoading({
    //   title: '加载数据中'
    // })
    wx.request({
      url: obj.url || useUrl.serviceUrl.login,
      method: obj.method || 'POST',
      data: obj.data || {},
      header: {
        'content-type': obj.header || 'application/x-www-form-urlencoded'
      },
      success: obj.success || function () {
        console.log('未传入success回调函数')
      },
      fail: obj.fail || function (err) {
        console.log('未传入fail回调函数,err:' + err.errMsg)
      },
      complete: obj.complete || function () {
        // console.log(res)
        // wx.hideLoading()
        // if (res.data.code === 400 && res.data.message != 'session_key失效') {
        //   if (res.data.message === 'session_key 不存在！') {
        //     res.data.message = '请授权获取信息'
        //   }
        //   wx.showModal({
        //     title: '系统消息',
        //     content: res.data.message,
        //     showCancel: false
        //   })
        // } else if (res.data.message === 'session_key 不存在！') {
        //   wx.showModal({
        //     title: '系统消息',
        //     content: '请授权获取信息',
        //     showCancel: false
        //   })
        // }
      }
    })
  },
  // 用户登陆
  wxlogin (loginSuccess, params) {
    let that = this
    if (wx.getStorageSync('session_key')) {
      let checkObj = {
        url: useUrl.getUserinfo,
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        success (res) {
          // session失效
          if (res.data.code === 400 && res.data.message === 'session_key 失效！') {
            console.log('session_key失效')
            // 无条件获取登陆code
            wx.login({
              success (res) {
                // console.log(res)
                let code = res.code
                // 获取用户信息
                let obj = {
                  success (data) {
                    wx.setStorageSync('userInfo', data.userInfo)
                    let iv = data.iv
                    let encryptedData = data.encryptedData
                    // 获取session_key
                    let objs = {
                      url: useUrl.login,
                      data: {
                        code: code,
                        iv: iv,
                        encryptedData: encryptedData
                      },
                      success (res) {
                        // let session_key = 'akljgaajgoehageajnafe'
                        // console.log(res)
                        wx.setStorageSync('session_key', res.data.data.session_key)
                        // console.log(session)
                        if (loginSuccess) {
                          loginSuccess(params)
                        }
                      }
                    }
                    that.wxrequest(objs)
                  },
                  fail (res) {
                    console.log(res)
                    wx.showToast({
                      title: '您未授权小程序,请在个人中心登陆'
                    })
                  }
                }
                that.getUserInfo(obj)
              },
              fail (err) {
                console.log('loginError' + err)
              }
            })
          } else {
            console.log('session_key有效')
            if (loginSuccess) {
              loginSuccess(params)
            }
          }
        }
      }
      that.wxrequest(checkObj)
    } else {
      // 无条件获取登陆code
      wx.login({
        success (res) {
          // console.log(res)
          let code = res.code
          // 获取用户信息
          let obj = {
            success (data) {
              wx.setStorageSync('userInfo', data.userInfo)
              let iv = data.iv
              let encryptedData = data.encryptedData
              // 获取session_key
              let objs = {
                url: useUrl.login,
                data: {
                  code: code,
                  iv: iv,
                  encryptedData: encryptedData
                },
                success (res) {
                  // let session_key = 'akljgaajgoehageajnafe'
                  // console.log(res)
                  wx.setStorageSync('session_key', res.data.data.session_key)
                  // console.log(session)
                  if (loginSuccess) {
                    loginSuccess(params)
                  }
                }
              }
              that.wxrequest(objs)
            },
            fail (res) {
              console.log(res)
              wx.showToast({
                title: '您未授权小程序,请在个人中心登陆'
              })
            }
          }
          that.getUserInfo(obj)
        },
        fail (err) {
          console.log('loginError' + err)
        }
      })
    }
  },
  // 获取自己的信息判断session是否有效
  // getMySelf () {
  //   let that = this
  //   let checkObj = {
  //     url: useUrl.getUserinfo,
  //     data: {
  //       session_key: wx.getStorageSync('session_key')
  //     },
  //     success (res) {
  //       // session失效
  //       if (res.data.code === 400 && res.data.message === 'session_key 失效！') {
  //         console.log('session_key失效')
  //
  //       } else {
  //         return
  //       }
  //     }
  //   }
  //   that.wxrequest(checkObj)
  // },
  // 获取用户信息
  getUserInfo (obj) {
    wx.getUserInfo({
      withCredentials: obj.withCredentials || false,
      lang: obj.lang || 'zh_CN',
      success: obj.success || function (res) {
        console.log(res)
      },
      fail: obj.fail || function (res) {
        console.log(res)
      }
    })
  },
  // 获取session_key
  gs () {
    return wx.getStorageSync('session_key')
  },
  // 获取用户缓存信息
  gu (cb) {
    if(wx.getStorageSync('userInfo')) {
      return wx.getStorageSync('userInfo')
    } else {
      let obj = {
        success (res) {
          wx.setStorageSync('userInfo', res.userInfo)
          cb()
        }
      }
      return this.getUserInfo(obj)
    }
  },
  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    // console.log(' ========== Application is launched ========== ')
    this.wxlogin()
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    // console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    // console.log(' ========== Application is hid ========== ')
  }
})
