响应式表单的使用

## 单个表单控件的使用

#### 步骤1-注册 ReactiveFormsModule

要使用响应式表单，首先要在你要使用的模块下引入angular的响应式表单模块。并把它添加到你的 NgModule 的 imports 数组中。

    import { ReactiveFormsModule } from '@angular/forms';
    
    @NgModule({
      imports: [
        // other imports ...
        ReactiveFormsModule   //在这里引入响应式表单模块
      ],
    })
    export class AppModule { }
    
 #### 步骤2-生成并导入一个新的表单控件
 
 FormControl类是响应式表单的基本构造块。要注册单个的表单控件，请在组件中导入 FormControl 类，并创建一个 FormControl 的新实例，把它保存在类的某个属性中。   
 
    import { Component } from '@angular/core';
    import { FormControl } from '@angular/forms';
    
    @Component({
      selector: 'app-name-editor',
      templateUrl: './name-editor.component.html',
      styleUrls: ['./name-editor.component.css']
    })
    export class NameEditorComponent {
      name = new FormControl('');
    }

`name = new FormControl('')`创建一个表单控件模型实例,在构造函数中初始化表单的值。可以直接对表单控件的状态进行监听、修改和校验。

#### 步骤3-在模板中注册该控件

在组件类中创建了表单控件实例后，还需要把它和模板中的表单关联起来。

    <label>
      Name:
      <input type="text" [formControl]="name">
    </label>

以上表单，添加绑定属性`[formControl]`,并关联到名为`name`的表单控件。formControl 是由 ReactiveFormsModule 中的 FormControlDirective 提供的。

表单绑定表单控件以后，表单控件和 DOM 元素就可以互相通讯了：视图会反映模型的变化，模型也会反映视图中的变化。

#### 管控表单控件的值

响应式表单让你可以访问表单控件此刻的状态和值。你可以通过组件类或组件模板来操纵其当前状态和值。

两种方式获取表单控件的值：

- 通过可观察对象 valueChanges，你可以在模板中使用 AsyncPipe 或在组件类中使用 subscribe() 方法来监听表单值的变化。
- 使用 value 属性。它能让你获得当前值的一份快照。

下面的例子展示了如何在模板中使用插值表达式显示当前值。

    <p>
      Value: {{ name.value }}
    </p>

#### 替换表单控件的值

    this.name.setValue('Nancy');
    
表单控件`formControl`还有更多其它的方法去操作表单。具体请参考官网学习。

## 表单控件分组
    
