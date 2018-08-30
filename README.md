# 一款让你感到幸福的 Vue 组件库

✨✨这是 Mona 系列的 Vue 实现，服务与移动端 H5 产品。

## 大致介绍

这是一款轻量级 Vue 组件库，拥有非常强的可扩展性和自定义功能。

你完全可以根据自己的需要自定义主题样式、组件样式，你也可以根据业务需要扩展组件功能。

可以满足你各种姿势，给你提供各种体位。

## 组件库目前由和func-star和 Miriring 共同维护

## 联系我

> 微信：func-star (599321378) Miriring (497656216)

> github地址： func-star (https://github.com/func-star) Miriring (https://github.com/Miriring)

## 安装

### NPM

```bash
npm i mov-mobile --save
```

### 按需加载

- 使用 babel-plugin-import（推荐用法）

`babel-plugin-import` 是一款 `babel` 插件，它会在编译过程中将 `import` 的写法自动转换为按需引入的方式

```bash
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -dev
```

```js
.babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "mov-mobile",
      "libraryDirectory": "lib",
      "style": true // 加载 less 文件
    }]
  ]
}
```

- 手动引入

```js
import DatePicker from 'mov-mobile/lib/modal';  // 加载 JS
import 'mov-mobile/lib/modal/style';         // 加载 LESS
```

✨✨你也可以为`mov-mobile` 起一个别名，让代码变的更好看一点

```
// webpack 添加解析配置
...js
resolve: {
	extensions: ['.js', '.vue'],
	alias: {
		'mona': path.resolve('./node_modules/mov-mobile')
	}
}
...
```

```js
.babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "mona",
      "libraryDirectory": "lib",
      "style": true // 加载 less 文件
    }]
  ]
}
```



### 开始使用
接着你可以在代码中直接引入 Mov-mobile 组件

```js
import { Row, Col } from 'mona';
```


### TODO


* ListView 修改成hammer
* DatePciker和DatePickerRange优化

