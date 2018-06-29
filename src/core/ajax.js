import axios from 'axios';
import Util from 'core/util';
import Url from './url';
import querystring from 'querystring';
import BaseServer from './baseServer';

class Ajax extends BaseServer {
	baseURL = '';
	
	constructor () {
		super();
		axios.defaults.withCredentials = true;
		axios.defaults.timeout = 10000;
	}
	
	autoVerify (res) {
		if (!res) {
			Util.error('接口出错');
			throw(new Error('接口出错'));
		}
		if (res && res.hasOwnProperty('success') && !res.success) {
			if (res.code && res.code === '1022') {
				// 刷新页面,跳转登录页面
				throw(new Error('未登录'));
			}
			Util.error(res.codeMessage);
			throw(new Error(res.codeMessage));
		}
	}
	
	get (url, data, autoError = true) {
		let param = data && Object.keys(data).length > 0 ? '?' + Url.param(data) : '';
		url = url + param;
		let p = axios({
			method: 'get',
			baseURL: this.baseURL,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
			url,
		}).then(this.onSuccess).catch(this.onError);
		
		return p.then(res => {
			autoError && this.autoVerify(res);
			return res;
		});
	}
	
	post (url, params, autoError = true) {
		let p = axios({
			method: 'POST',
			baseURL: this.baseURL,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
			url: url,
			data: querystring.stringify(params),
		}).then(this.onSuccess).catch(this.onError);
		
		return p.then(res => {
			autoError && this.autoVerify(res);
			return res;
		});
	}
	
	onSuccess (res) {
		return res.data;
	}
	
	onError (e) {}
	
};

export default Ajax;
