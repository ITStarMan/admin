export default {
  // 获取不同环境下地址  根据window.location.origin获取到根地址，再去匹配对应环境
  getUrl (perUrl) {
    let url = ''
    let test = window.location.origin
    let test1 = test.indexOf('localhost:3000')
    let test2 = test.indexOf('ffan.net')
    let test3 = test.indexOf('sit.ffan.net')
    // test 环境
    if (test1 != -1 ) {
      url = 'http://localhost:3000/#/' + perUrl
    }
    // sit 环境
    if (test1 == -1 && test3 != -1) {
      url = 'http://oc.sit.ffan.net/frontend/apistore/index.html#/' + perUrl
    }
    // 正式环境
    if (test1 == -1 && test3 == -1 && test2 != -1) {
      url = '//oc.ffan.net/frontend/apistore/index.html#/' + perUrl
    }
    return url
  },
  getPassport (passpotrUrl) {
    let url = ''
    let test = window.location.origin
    let test1 = test.indexOf('localhost:3000')
    let test2 = test.indexOf('ffan.net')
    let test3 = test.indexOf('sit.ffan.net')
    // test 环境
    if (test1 != -1 ) {
      url = 'http://10.213.44.189:10092/' + passpotrUrl
    }
    // sit 环境
    if (test1 == -1 && test3 != -1) {
      url = 'http://10.213.44.188:10092/' + passpotrUrl
    }
    // 正式环境
    if (test1 == -1 && test3 == -1 && test2 != -1) {
      url = '//10.213.152.86:10092/' + passpotrUrl
    }
    return url
  },
  getApi (apiUrl) {
    let url = ''
    let test = window.location.origin
    let test1 = test.indexOf('localhost:3000')
    let test2 = test.indexOf('ffan.net')
    let test3 = test.indexOf('sit.ffan.net')
    // test 环境
    if (test1 != -1 ) {
      url = 'http://api.apistore.intra.test.ffan.net/' + apiUrl
    }
    // sit 环境
    if (test1 == -1 && test3 != -1) {
      url = 'http://api.apistore.intra.sit.ffan.net/' + apiUrl
    }
    // 正式环境
    if (test1 == -1 && test3 == -1 && test2 != -1) {
      url = '//api.apistore.ffan.net/' + apiUrl
    }
    return url
  },
  getDashborad (dashboardUrl) {
    let url = ''
    let test = window.location.origin
    let test1 = test.indexOf('localhost:3000')
    let test2 = test.indexOf('ffan.net')
    let test3 = test.indexOf('sit.ffan.net')
    // test 环境
    if (test1 != -1 ) {
      url = 'http://10.213.128.163:10112/' + dashboardUrl
    }
    // sit 环境
    if (test1 == -1 && test3 != -1) {
      url = 'http://10.213.44.102:10112/' + dashboardUrl
    }
    // 正式环境
    if (test1 == -1 && test3 == -1 && test2 != -1) {
      url = '//10.209.214.72:10112/' + dashboardUrl
    }
    return url
  },
  getUnFreeze (unFreezeUrl) {
    let url = ''
    let test = window.location.origin
    let test1 = test.indexOf('localhost:3000')
    let test2 = test.indexOf('ffan.net')
    let test3 = test.indexOf('sit.ffan.net')
    // test 环境
    if (test1 != -1 ) {
      url = 'http://passport.intra.test.ffan.net/' + unFreezeUrl
    }
    // sit 环境
    if (test1 == -1 && test3 != -1) {
      url = 'http://passport.intra.sit.ffan.net/' + unFreezeUrl
    }
    // 正式环境
    if (test1 == -1 && test3 == -1 && test2 != -1) {
      url = '//passport.ffan.net/' + unFreezeUrl
    }
    return url
  }
}
