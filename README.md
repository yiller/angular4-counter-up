# angular4-counter-up
本组件适用于 Angular2 及以上版本。

# Installation
* 通过 NPM 安装 angular4-counter-up
```bash
npm install angular4-counter-up --save
```

* 导入 CounterUpModule 模块到项目的 app.module.ts
```javascript
import { CounterUpModule } from 'angular4-counter-up';
@NgModule({
  imports: [ CounterUpModule.forRoot() ]
})
```

## Usage
* 在你的项目模板的需要使用该组建的HTML代码中加入 counter-up 属性：
```html
<span counter-up offset="1" number="1000">0</span>
```
* 为了简化HTML，你可以在 CounterUpModule 中进行全局配置
```javascript
import { CounterUpModule } from 'angular4-counter-up';
@NgModule({
  imports: [ CounterUpModule.forRoot({
    delay: 1000,
    time: 100
  }) ]
})
```

## Module Options & Attributes( Input )
* 模块支持的属性
- delay: 10,  // 内容每次跳变的时间间隔 ( 单位：毫秒 )
- time: 100,  // 内容最大跳变次数 ( 默认根据该值计算每次跳变的增值 )
- beginAt: 0, // 默认的起始数值

* 组件支持的属性
- number: 1000, // 内容跳变的终止 ( 必须参数，根据该参数决定内容显示格式：普通数值 / 时间 / 逗号千分数值 )
- offset: 1,    // 内容跳变增值 ( 如不传递，会自动根据 module 的 time 和 number 计算跳变增值 )
- formatter: '%s', // 数值显示格式 ( %s 为占位符，例如：EUR $s )

## Callbacks( Output )
* 回调支持
- complete: 当内容跳变为终值时触发
* 应用回调用举例：
```html
<span counter-up number="10" (complete)="log($event)">9</span>
```

## Feedback

Please [leave your feedback](https://github.com/yiller/ng4-icheck/issues) if you have noticed any issues or have a feature request.

## License

The repository code is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
