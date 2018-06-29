import Index from 'views/index';
import Loading from 'views/loading';
import Toast from 'views/toast';
import Carousel from 'views/carousel';
import Layout from 'views/layout';
import PickerView from 'views/picker-view';
import Popup from 'views/popup';
import DatePicker from 'views/date-picker';
import DatePickerRange from 'views/date-picker-range';
import ListView from 'views/list-view';
import Modal from 'views/modal';
import ModalSelect from 'views/modal-select';
import PickerSelect from 'views/picker-select';
import Tabs from 'views/tabs';

export default {
	index: 'index',
	routes: {
		'index': Index,
		'loading': Loading,
		'toast': Toast,
		'carousel': Carousel,
		'layout': Layout,
		'picker-view': PickerView,
		'popup': Popup,
		'date-picker': DatePicker,
		'date-picker-range': DatePickerRange,
		'list-view': ListView,
		'modal': Modal,
		'modal-select': ModalSelect,
		'picker-select': PickerSelect,
		'tabs': Tabs,
	},
};
