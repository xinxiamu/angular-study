## 小结

本章讨论的 Angular 表单技术利用了下列框架特性来支持数据修改、验证和更多操作：

- Angular HTML 表单模板。
- 带有 @Component 装饰器的表单组件类。
- 通过绑定到 NgForm.ngSubmit 事件属性来处理表单提交。
- 模板引用变量，例如 #heroForm 和 #name。
- [(ngModel)] 语法用来实现双向数据绑定。
- name 属性的用途是有效性验证和对表单元素的变更进行追踪。
- 指向 input 控件的引用变量上的 valid 属性，可用于检查控件是否有效、是否显示/隐藏错误信息。
- 通过绑定到 NgForm 的有效性状态，控制 Submit 按钮的禁用状态。
- 定制 CSS 类来给用户提供无效控件的视觉反馈。
