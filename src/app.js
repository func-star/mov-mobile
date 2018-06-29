import Vue from 'vue';
import Route from 'components/route';
import routeConf from './routeConf';
import FastClick from 'fastclick';
import Polyfill from 'core/polyfill';
import 'style/theme.less';
import 'style/app.less';

//*************补丁**************

FastClick.attach(document.body);
Polyfill.init();


/* eslint-disable */
new Vue({
	el: '#appWrapper',
	data: {
		routeConf: routeConf,
	},
	render: h => h(Route),
});
/* eslint-disable */
