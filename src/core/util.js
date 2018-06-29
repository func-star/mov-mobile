import moment from 'moment';

//基础工具
class Util {
	go (path, data) {
		location.href = (data ? '?' + Url.param(data) : '') + '#' + path;
	}
	
	moment (date) {
		return moment(date);
	}
}

export default new Util;
