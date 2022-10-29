import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit, OnDestroy {

  public data: UserEditFormData = {} as UserEditFormData;
  private subscription: Subscription;
  private isEditation = false;

  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  @ViewChild('userEditForm') userEditForm: FormGroupDirective;

  @Input() events: Observable<void>;

  @Input()
  public set user(user: User) {

    if (!user) {
      return;
    }

    this.isEditation = true;

    this.myForm.get('email').setValue(user.email);
    this.myForm.get('phone').setValue(user.telephone);
    this.myForm.get('name').setValue(user.firstname);
    this.myForm.get('lastName').setValue(user.surname);
    this.myForm.get('password').setValue('');
    this.myForm.get('confirmPassword').setValue('');
  }

  @Output()
  editedUser = new EventEmitter<UserEditFormData>();

  constructor() {

    this.myForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/([+]?\d{1,3}[ \s]?)?(\d{3}[ \s]?){3}$/)])
      },
      { validators: this.passwordValidator }
    );

  }

  ngOnInit(): void {
    if (!this.isEditation) {
      this.myForm.get('password').validator = Validators.required;
    }

    this.subscription = this.events.subscribe(() => this.userEditForm.ngSubmit.emit());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSubmit(): void {
    if (this.myForm.valid) {
      this.editedUser.emit(this.myForm.value);
    } else {
      this.validateAllFormFields();
    }
  }

  private validateAllFormFields(): void {
    Object.keys(this.myForm.controls).forEach(field => {
      const control = this.myForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  private passwordValidator(group: FormGroup): any {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }
}

export interface UserEditFormData {
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
}

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    const dirtyPassword = !!(control && control.parent && control.parent.get('password') && control.parent.get('password').dirty);
    const invalidPasswordConfirm = form.hasError('notSame');
    return (invalidCtrl || (invalidParent && invalidPasswordConfirm && dirtyPassword));
  }
}
