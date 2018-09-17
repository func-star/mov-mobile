import Events from 'mona-events';

class TabsCtrl extends Events {
	itemKeyInfo = {}; // 控制tabsItem的加载

	setTabItemKey(tabsKey, key) {
		if (!this.itemKeyInfo['itemKeyList' + tabsKey]) {
			this.itemKeyInfo['itemKeyList' + tabsKey] = [];
		}
		if (this.itemKeyInfo['itemKeyList' + tabsKey].indexOf(key) !== -1) {
			return;
		}
		this.itemKeyInfo['itemKeyList' + tabsKey].push(key);
	}

	getTabsItemKey(tabsKey) {
		const key = this.itemKeyInfo['itemKeyList' + tabsKey];
		return key ? key : [];
	}

	destroyItemList(tabsKey) {
		delete this.itemKeyInfo['itemKeyList' + tabsKey];
	}

}

export default new TabsCtrl;
