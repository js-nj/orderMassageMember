/**
 * WEBPACK_CONIFG_HOST的值，在webpack.config.js中更改
 * 开发环境时 = "http://amptest.wisedu.com/xsfwfw/"
 * 发布环境时 = location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"
 */

export default {
	saveHealthOrder: WEBPACK_CONIFG_HOST + '/health/saveHealthOrder',
	getHealthOrder: WEBPACK_CONIFG_HOST + '/health/getHealthOrder',
	getTimeOrder: WEBPACK_CONIFG_HOST + '/health/getTimeOrder',
	getDay: WEBPACK_CONIFG_HOST + '/health/getDay',
	saveHealthOrder: WEBPACK_CONIFG_HOST + '/health/saveHealthOrder',
	getOrderInfo: WEBPACK_CONIFG_HOST + '/health/getOrderInfo',
	getSignature: WEBPACK_CONIFG_HOST + '/api/getSignature'

}