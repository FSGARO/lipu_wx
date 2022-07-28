const Url = 'wx.litpsmart.com'
const URL = 'https://wx.litpsmart.com'
const HOST = 'https://' + Url + '/sc'
const wxHost = 'wss://' + Url + '/sc'
// const HOST = "https://wx.elitah.xyz/sc";
// const wxHost = "wss://wx.elitah.xyz/sc";
var addr = {
	concelBind: URL + '/sc/cancel',
	host: HOST,
	getToken: HOST + '/auth',
	getDevicelist: HOST + '/login',
	wsGlobal: wxHost + '/miniprogram',
	getdevice: '/app/v1/device',
	deviceStatus: '/app/v1/device/status',
	reserve: '/app/v2/reserve',
	deviceControl: '/app/v1/device/control',
	getLivelist: '/app/v1/task',
	creatMadie: '/app/v1/task?method=1',
	creatWulian: '/app/v1/task?method=0',
	deleteTask: '/app/v1/delete',
	// 获取视列表
	getLive: '/app/v1/rtmp',
	// 获取播放视频播放地址
	getLiveurl: '/app/v1/rtmp/url',
	getEnergylist: '/app/v1/device/billing',
	getInfo: '/app/vl/info',
	getWebInfo: '/app/v1/device/control/web',
	// 获取消息
	getMessage: '/app/v1/notice',
	// 设备控制
	controlDev: '/app/v1/device/control',
	// 获取设备所在位置
	getPlace: '/app/v1/device/place',
	// 获取播放地址
	getMedia: '/app/v1/media/play',
	// 获取指令列表
	getCmd: '/app/v1/cmd',
	// 获取创建人物的音视频列表
	TaskMedia: '/app/v1/media',
	// 获取执行记录
	GetRecord: '/app/v1/task/record',
	// 测试指令
	CmdTest: '/app/v1/cmd/test',
	// 修改单个布局节点
	ControlWeb: '/app/v1/device/control/web'
}

export default addr
