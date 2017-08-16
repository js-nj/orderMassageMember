import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Mint from 'bh-mint-ui2';
import {
  Toast,
  MessageBox
} from 'bh-mint-ui2';
import route from './router';
import * as utils from './utils'
import api from './api'
import 'bh-mint-ui2/lib/style.css'
import init from 'bh-mixin-sdk'
import axios from 'axios'

Vue.use(Mint);
Vue.use(VueRouter);
const router = new VueRouter(route);

if (process.env.NODE_ENV !== 'production') {
  global.employeeId = '';
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
      App
    }
  });
} else {
  axios.post(api.getSignature, {
    sign_url: window.location.href.replace(/#(\S+)?/, ''),
    flag: 1
  }).then(function({
    data
  }) {
    if (data.code === 0) {
      dd.config({
        agentId: data.agentId, // 必填，微应用ID
        corpId: data.corpId, //必填，企业ID
        timeStamp: data.timeStamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi。不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: ['biz.user.get',
            'device.geolocation.get',
            'runtime.info',
            'biz.contact.choose',
            'device.notification.confirm',
            'device.notification.alert',
            'device.notification.prompt',
            'biz.ding.post',
            'biz.util.openLink'
          ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      });
      dd.ready(function() {
        dd.biz.user.get({
          onSuccess: function(resp) {
            global.employeeId = resp.emplId;
            new Vue({
              el: '#app',
              router,
              template: '<App/>',
              components: {
                App
              }
            });
          }
        });
      });
      dd.error(function(err) {
        dd.device.notification.alert({
          "message": JSON.stringify(err),
          "title": "提示",
          "buttonName": "确定"
        })
        new Vue({
          el: '#app',
          router,
          template: '<App/>',
          components: {
            App
          }
        });
      });
    } else {
      dd.device.notification.alert({
        "message": "获取签名失败",
        "title": "提示",
        "buttonName": "确定"
      });
    }
  }).catch(function() {
    dd.device.notification.alert({
      "message": "网络或服务器错误",
      "title": "提示",
      "buttonName": "确定"
    });
  });
}

// global.SDK = null;

// function getSDKConfig() {
//   return new Promise((resolve, reject) => {
//     let config = {
//       // 微信sdk初始化参数
//       wx: {
//         /**
//          * 微信端上传图片的流程是：
//          * 1、选取文件通过微信jsdk上传到微信服务器后获取文件的serverId
//          * 2、将serverId发送到应用服务端，服务端接收请求后根据serverId，将文件从微信服务拉取到应用服务
//          * 
//          * uploadImgsToEmapUrl 参数 就是步骤2中 将serverId发送到应用服务的请求接口
//          */
//         // TODO: 上传接口
//         uploadImgsToEmapUrl: WEBPACK_CONIFG_HOST + '/sys/yxapp/WechatServiceStu/saveFileFromWechat.do' //TODO: 上传接口
//       },
//       dd: {}, //钉钉jdk初始化参数
//     }
//     if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
//       /**
//        * 判断运行环境为微信时，向后端发送请求获取微信jsdk的授权签名，（此接口应该有后端来提供），请求返回应包含以下参数
//        * corpId - 企业号的corpid
//        * nonceStr - 生成签名的随机串
//        * timestamp - 生成签名的时间戳
//        * signature - 签名
//        */
//       // TODO: 发请求获取微信签名
//       config.wx.url = "http://res.wisedu.com:9090/checkSign";
//       utils.Get(api.getWechatSign, { configurl: window.location.href.replace(/#(\S+)?/, '') }).then(({
//         data: resp
//       }) => {
//         if (resp.code == "0") {
//           let signData = resp.data
//           signData.corpId = signData.corpid
//           signData.nonceStr = signData.noncestr
//           config.wx.signData = signData
//           resolve(config)
//         } else {
//           Toast('微信jsdk初始化失败 ' + resp.code);
//           reject(resp)
//         }
//       }, () => {
//         Toast('微信jsdk初始化失败');
//         reject()
//       })
//     } else {
//       setTimeout(function () {
//         resolve(config)
//       }, 0)
//     }
//     return config
//   })
// }

// getSDKConfig().then((config) => {
//   init((res) => {
//     if (res.type === 'success') {
//       global.SDK = res.sdk;

//       new Vue({
//         el: '#app',
//         router,
//         template: '<App/>',
//         components: {
//           App
//         }
//       });
//     }
//   }, config)
// })