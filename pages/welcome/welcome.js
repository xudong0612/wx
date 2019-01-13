Page(
  {
    onTapJump:function(event) {
      wx.navigateTo({
        url: '../post/post',
        success:function(){
          console.log("jump success")
        },
        fail:function(){
          console.log("jump failed")
        },
        complete:function(){
          console.log("jump complete")
        }
      })
    },

    onTapClear:function(){
      wx.clearStorageSync();
    },

    onHide: function () {
      console.log("onLoad:页面被隐藏");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      console.log("onLoad:页面被卸载");
    }
  }
)