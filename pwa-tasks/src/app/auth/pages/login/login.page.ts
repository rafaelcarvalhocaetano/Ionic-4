import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public authProviders = AuthProvider;

  form: FormGroup;
  config = {
    isSingin: true,
    action: 'Login',
    actionChange: 'Create Account'
  };

  private nameControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    try {
      const credentials = await this.authService.authentication({
        isSignIn: this.config.isSingin,
        user: this.form.value,
        provider
      });
      console.log(' credentials ', credentials);
      console.log(' Redirect ..... ');

    } catch (e) {
      console.log(' erros ', e);
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  changeAuthAction() {
    this.config.isSingin = !this.config.isSingin;

    // pegando o objeto via atribuição desestruturação
    const { isSingin } = this.config;
    this.config.action = isSingin ? 'Login' : 'Sing Up';
    this.config.actionChange = isSingin ? 'Create Account' : 'Already have an account';
    !isSingin ? this.form.addControl('name', this.nameControl) : this.form.removeControl('name');
  }

}
