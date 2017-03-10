import getDomain from './getDomain.js'
var fetchPolyfill = require("fetch-polyfill")
export default {
  post (postData, url, code) {
    let passportUrl = ''
    switch (code) {
      case 1:
        passportUrl = getDomain.getApi(url);
        break;
      case 2:
        passportUrl = getDomain.getPassport(url);
        break;
      case 3:
        passportUrl = getDomain.getDashborad(url);
        break;
      case 4:
        passportUrl = getDomain.getUnFreeze(url);
        break;
      default:

    }
    let postParamsUrl = ''
    for (var key in postData) {
      postParamsUrl = postParamsUrl + key + '=' + encodeURI(postData[key]).replace(/&/g,'%26').replace(/\+/g,'%2B').replace(/\s/g,'%20').replace(/#/g,'%23') + '&';
    }
    return fetch(passportUrl, {
              method: 'POST',
              headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
              mode: 'cors',
              cache: 'default',
              credentials: 'include',
              body: postParamsUrl
      }).then((response)=>{
        if (response.status == 200) {
          return response.json();
        } else {
          window.alert('请求出错');
        }
      })
  },
  getData (postData, url, code) {
    let passportUrl = ''
    switch (code) {
      case 1:
        passportUrl = getDomain.getApi(url)  + '?' ;
        break;
      case 2:
        passportUrl = getDomain.getPassport(url)  + '?';
        break;
      case 3:
        passportUrl = getDomain.getDashborad(url) + '?';
        break;
      case 4:
        passportUrl = getDomain.getUnFreeze(url) + '?';
        break;
      default:

    }
    for (var key in postData) {
      passportUrl = passportUrl + key + '=' + encodeURI(postData[key]).replace(/&/g,'%26').replace(/\+/g,'%2B').replace(/\s/g,'%20').replace(/#/g,'%23') + '&';
    }
    return fetch(passportUrl, {
              method: 'GET',
              headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
              mode: 'cors',
              cache: 'default',
              credentials: 'include',
              body: null
      }).then((response)=>{
        if (response.status == 200) {
          return response.json();
        } else {
          window.alert('请求出错');
        }
      })
  },
  postJson (postData, url, code) {
    // 主要用来发送json数据
    let passportUrl = ''
    switch (code) {
      case 1:
        passportUrl = getDomain.getApi(url);
        break;
      case 2:
        passportUrl = getDomain.getPassport(url);
        break;
      case 3:
        passportUrl = getDomain.getDashborad(url);
        break;
      case 4:
        passportUrl = getDomain.getUnFreeze(url);
        break;
      default:

    }
    return fetch(passportUrl, {
              method: 'POST',
              headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
              mode: 'cors',
              cache: 'default',
              credentials: 'include',
              body: JSON.stringify(postData)
      }).then((response)=>{
        if (response.status == 200) {
          return response.json();
        } else {
          window.alert('请求出错');
        }
      })
  }
}
