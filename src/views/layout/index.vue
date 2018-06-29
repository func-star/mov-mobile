<template>
	<div>
		<row justify="center">24栅格布局</row>
		<row class="group" justify="center">
			<column class="item" :span="12">12</column>
			<column class="item" :span="12">12</column>
		</row>
		<row class="group">
			<column class="item" :span="8">8</column>
			<column class="item" :span="8">8</column>
			<column class="item" :span="8">8</column>
		</row>
		<row class="group">
			<column class="item" :span="6">6</column>
			<column class="item" :span="6">6</column>
			<column class="item" :span="6">6</column>
			<column class="item" :span="6">6</column>
		</row>

		<div>gutter空隙排版</div>
		<row class="group" gutter="10px">
			<column :span="8">
				<div class="item">8</div>
			</column>
			<column :span="8">
				<div class="item">8</div>
			</column>
			<column :span="8">
				<div class="item">8</div>
			</column>
		</row>
		<div>垂直排版</div>
		<row class="group" direction="column" justify="end" align="center" style="height: 150px;">
			<column class="item" :span="6">6</column>
			<column class="item" :span="6">6</column>
			<column class="item" :span="6">6</column>
			<column class="item" :span="6">6</column>
		</row>
		<div>row可以放其他的子节点，不一定要column</div>
		<row class="group" justify="end" align="center">
			row可以放其他的子节点，不一定要column
		</row>
	</div>
</template>
<script type="text/ecmascript-6">
	import { Row, Column } from 'mov';
	import './index.less';

	export default {
		components: {
			Row,
			Column,
		},
	};

</script>
