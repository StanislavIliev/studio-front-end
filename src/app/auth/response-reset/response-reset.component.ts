import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  responseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {

    this.CurrentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      console.log(this.resetToken);
    });
  }


   ngOnInit(): any {
    this.responseResetForm = new FormGroup(
      {
        newPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
      }
    );
  }

  validate(form: FormGroup): any {
    const new_password = form.controls.newPassword.value;
    const confirm_password = form.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }
    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }
    return null;
  }


  resetPassword(): any {
    const obj = {...this.responseResetForm.value};
    console.log(obj);
    const code = this.router.url.split('/').pop();
    const formData = new FormData();
    formData.append('password', this.responseResetForm.get('newPassword').value);
    formData.append('uniqueString', code);
    this.authService.setNewPassword(formData).
      subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }
}
