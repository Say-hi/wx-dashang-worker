/**
 * Created by Administrator on 2017/8/25.
 */
const app = getApp()
const serviceUrl = require('./service')

module.exports = {
  // 用户上传图片
  /**
   *
   * @param those 上下文指向
   * @param imgArr 要操作的的相册名
   * @param count 最大上传数量限制
   * @param callback 回调函数
   */
  upPhoto (those, imgArr, count, callback) {
    let that = those
    let obj = {
      count: 6,
      success (res) {
        wx.hideLoading()
        wx.showLoading({
          title: '图片上传中',
          mask: true
        })
        let coverImgArr = that.data[imgArr]
        for (let i of res.tempFilePaths) {
          let upImg = {
            url: serviceUrl.uploadPhotos,
            filePath: i,
            formData: {
              session_key: wx.getStorageSync('session_key'),
              file: i
            },
            success (res) {
              let jsonObj = JSON.parse(res.data).data.res_file
              coverImgArr.push(jsonObj)
              wx.hideLoading()
              if (coverImgArr.length > count) {
                wx.showToast({
                  title: `超过${count}张啦,已删除多余的照片`,
                  duration: 2000,
                  mask: true
                })
              }
              coverImgArr = coverImgArr.slice(0, count)
              callback(those, coverImgArr)
            },
            fail (res) {
              console.log('上传错误', res)
              wx.hideLoading()
              wx.showToast({
                title: '图片上传失败，请重新尝试',
                mask: true,
                duration: 1000
              })
            }
          }
          app.wxUpload(upImg)
        }
      },
      fail (err) {
        console.log(err)
      }
    }
    wx.chooseImage(obj)
  },
  // 删除图片
  /**
   *
   * @param those 上下文指向
   * @param e 含有data-index属性的e
   * @param imgArr 要操作的的相册名
   * @param callback 回调函数
   */
  delphoto (those, e, imgArr, callback) {
    let that = those
    let index = e.currentTarget.dataset.index
    let photos = that.data[imgArr]
    photos.splice(index, 1)
    callback(those, photos)
  },
  // 展示图片
  /**
   *
   * @param those 上下问指向
   * @param e 含有data-index属性的e
   * @param imgArrs 要预览的相册名
   */
  showImg (those, e, imgArrs) {
    let index = e.currentTarget.dataset.index
    let imgArr = those.data[imgArrs]
    let newImgArr = []
    for (let i of imgArr) {
      newImgArr.push(i)
    }
    let obj = {
      current: newImgArr[index],
      urls: newImgArr
    }
    wx.previewImage(obj)
  },
  // 获取用户信息
  getUserInfo (that) {
    if (app.gu()) {
      that.setData({
        userInfo: app.gu()
      })
    } else {
      app.gu(that.getUserInfo)
    }
  }
}
