import Ajax from 'core/ajax';

class ProfileServer extends Ajax {
	getUserInfo () {
		return this.get('');
	}
}

export default new ProfileServer;
