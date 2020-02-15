import * as React from 'react';
import { Observable, Subscription } from 'rxjs';

import { Input, Form, FormGroupModel, FormControlModel } from '@shared/form';
import { BasicButton, IconButton } from '@shared/buttons';
import { Validators } from '@shared/form/validation';
import { Tooltip } from '@shared/tooltip';
import { Wait } from '@shared/wait';

import './LoginScreen.light.scss';
import './LoginScreen.dark.scss';

interface Props {
  onLogin: (username: string, password: string) => Observable<any>;
}

interface State {
  passwordVisible: boolean;
  showSpinner: boolean;
}

export class LoginScreen extends React.Component<Props, State> {

  readonly formGroupModel = new FormGroupModel({
    username: new FormControlModel('system', [Validators.checkNotEmpty('Username')]),
    password: new FormControlModel('manager', [Validators.checkNotEmpty('Password')])
  });

  private _subscription: Subscription;

  constructor(props: Props) {
    super(props);

    this.state = {
      passwordVisible: false,
      showSpinner: false
    };

    this.login = this.login.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  componentDidMount() {
    this.formGroupModel.validityChanges()
      .subscribe({
        next: () => this.forceUpdate()
      });
  }

  componentWillUnmount() {
    this.formGroupModel.cleanup();
    this._subscription?.unsubscribe();
  }

  render() {
    return (
      <div className='login-screen-container'>
        <Form
          className='login-screen-form'
          formGroupModel={this.formGroupModel}
          onSubmit={this.login}>
          <Input
            className='login-screen-form__username'
            label='Username'
            formControlModel={this.formGroupModel.findControl('username')} />
          <div className='login-screen-form__password-container'>
            <Input
              className='login-screen-form__password'
              label='Password'
              formControlModel={this.formGroupModel.findControl('password')}
              type={this.state.passwordVisible ? 'text' : 'password'} />
            <Tooltip content={this.state.passwordVisible ? 'Hide password' : 'Show password'}>
              <IconButton
                icon={this.state.passwordVisible ? 'visibility_off' : 'visibility'}
                size='small'
                style='accent'
                onClick={this.togglePasswordVisibility} />
            </Tooltip>
          </div>
          <BasicButton
            className='login-screen-form__login-button'
            type='positive'
            label='Log in'
            disabled={!this.formGroupModel.isValid()}
            onClick={this.login} />
        </Form>
        <Wait show={this.state.showSpinner} />
      </div>
    );
  }

  togglePasswordVisibility() {
    this.setState(state => ({
      passwordVisible: !state.passwordVisible
    }));
  }

  login() {
    this.setState({
      showSpinner: true
    });
    const credentials = this.formGroupModel.getValue();
    this._subscription = this.props.onLogin(credentials.username, credentials.password)
      .subscribe({
        complete: () => {
          this.setState({
            showSpinner: false
          });
        }
      });
  }

}
