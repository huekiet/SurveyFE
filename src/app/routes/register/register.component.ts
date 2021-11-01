import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from 'src/app/_validator/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
      },
      {
        validators: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  register() {
    const data = {
      username: this.registerForm.controls.userName.value.trim(),
      password: this.registerForm.controls.password.value.trim(),
      email: this.registerForm.controls.email.value.trim(),
    };
    this.authService.register(data).subscribe(
      (response) => {
        if (response.user) {
          this.toastrService.success('Register successful');
          this.router.navigate(['/auth/login']);
        }
      },
      (error) => {
        this.toastrService.error('Can not register');
      }
    );
  }
}
