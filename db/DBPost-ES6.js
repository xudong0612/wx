class DBPost {
  constructor(postId) {
    this.storageKeyName = "postList";
    this.postId = postId;
  }

  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require("../data/data.js").postList;
      this.initPostList(res);
    }
    return res;
  }


  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }

  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  collect() {
    return this.updatePostData("collect");
  }

  up() {
    return this.updatePostData("up");
  }

  updatePostData(category) {
    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData();
    switch (category) {
      case "collect":
        if (!postData.collectionStatus) {
          postData.collectionNum++;
          postData.collectionStatus = true;
        } else {
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      case "up":
        if (!postData.upStatus) {
          postData.upNum++;
          postData.upStatus = true;
        } else {
          postData.upNum--;
          postData.upStatus = false;
        }
        break;
      default:
        break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData
  }

  getCommentData() {
    var itemData = this.getPostItemById().data;

    itemData.comments.sort(this, compareWithTime);
    var len = itemData.comments.length,
      comment;
    for(var i=0;i<len;i++) {
      comment = itemData.comments[i];
      comment.create_time=util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }
};

export {
  DBPost
}