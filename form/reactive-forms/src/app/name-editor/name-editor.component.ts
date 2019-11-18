import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl(''); //FormControl是响应式表单的基本构造块，这里构造函数默认表单的值为空，也可以设置其他值。

  updateName() {
    this.name.setValue('Nancy'); //修改数据源的值，观察对象会监听到变化，并绑定到相应控件显示。
  }
}
