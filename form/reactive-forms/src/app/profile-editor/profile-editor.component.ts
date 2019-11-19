import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

/**
 * FormGroup跟踪一组FormControl实例（比如一个表单）的表单状态。当创建 FormGroup 时，其中的每个控件都会根据其名字进行跟踪。
 *
 */
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  //profileForm是个嵌套表单,同时接纳 FormControl 和 FormGroup 作为子控件。
  //来自内嵌控件组的状态和值的变更将会冒泡到它的父控件组，以维护整体模型的一致性。
  profileForm = this.fb.group({//在视图中，profileForm是FormGroup的名称
    firstName: ['', Validators.required],  //校验器要求必填。key是表单的名字，视图中的formControlName属性名称。必填字段必须都有值，表单状态才为可用状态，否则为不可用状态。
    lastName: [''],
    address: this.fb.group({ //在视图中，address是formGroupName的名称
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([ //formArrayName
      this.fb.control('')
    ])
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray; //表单组
  }

  constructor(private fb: FormBuilder) { } //首先要引入表单组对象创建的对象。


  //更新模型值
  //两种方式：1.使用 setValue() 方法来为单个控件设置新值。 setValue() 方法会严格遵循表单组的结构，并整体性替换控件的值。
  //2.使用 patchValue() 方法可以用对象中所定义的任何属性为表单模型进行替换。
  //下面只更新firstNamehe
  updateProfile() {
    this.profileForm.patchValue({
          firstName: 'Nancy',
          address: {
            street: '123 Drew Street'
          }
        });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  //form提交时间回调。
  //使用 EventEmitter 向组件外部提供该表单的值
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
