/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import PreferencesUtil, { UserInfo } from '../common/database/PreferencesUtil';

@Extend(TextInput)
function inputStyle() {
  .placeholderColor('#99182431')
  .height('45vp')
  .fontSize('18fp')
  .backgroundColor('#F1F3F5')
  .width('328vp')
  .margin({ top: 12 })
}

@Extend(Line)
function lineStyle() {
  .width('328vp')
  .height('1vp')
  .backgroundColor('#33182431')
}

@Extend(Text)
function blueTextStyle() {
  .fontColor('#007DFF')
  .fontSize('14fp')
  .fontWeight(FontWeight.Medium)
}

enum AuthMode {
  Login = 0,
  Register = 1,
  ResetPassword = 2
}

/**
 * Login page
 */
@Entry
@Component
struct LoginPage {
  @State account: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State nickname: string = '';
  @State email: string = '';
  @State authMode: AuthMode = AuthMode.Login;
  @State isShowProgress: boolean = false;
  private timeOutId: number = -1;
  pathStack: NavPathStack = new NavPathStack();

  @Builder
  imageButton(src: Resource) {
    Button({ type: ButtonType.Circle, stateEffect: true }) {
      Image(src)
    }
    .height('48vp')
    .width('48vp')
    .backgroundColor('#F1F3F5')
  }

  private showToast(message: Resource): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message });
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, 'LoginPage', `showToast failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  private isBlank(value: string): boolean {
    return value.trim() === '';
  }

  private clearPasswordInput(): void {
    this.password = '';
    this.confirmPassword = '';
  }

  private switchMode(mode: AuthMode): void {
    this.authMode = mode;
    this.clearPasswordInput();
    if (mode !== AuthMode.Register) {
      this.nickname = '';
      this.email = '';
    }
  }

  private isPasswordConfirmed(): boolean {
    if (this.password !== this.confirmPassword) {
      this.showToast($r('app.string.password_not_match'));
      return false;
    }
    return true;
  }

  private login(): void {
    if (this.isBlank(this.account) || this.isBlank(this.password)) {
      this.showToast($r('app.string.input_empty_tips'));
      return;
    }
    if (!PreferencesUtil.validateUser(this.account, this.password)) {
      this.showToast($r('app.string.login_auth_failed'));
      return;
    }
    this.isShowProgress = true;
    if (this.timeOutId === -1) {
      this.timeOutId = setTimeout(() => {
        this.isShowProgress = false;
        this.timeOutId = -1;
        PreferencesUtil.saveCurrentAccount(this.account);
        this.showToast($r('app.string.login_success'));
        this.pathStack.pushPathByName('MainPage', null);
      }, 600);
    }
  }

  private register(): void {
    if (this.isBlank(this.account) || this.isBlank(this.password) || this.isBlank(this.confirmPassword) ||
      this.isBlank(this.nickname) || this.isBlank(this.email)) {
      this.showToast($r('app.string.input_empty_tips'));
      return;
    }
    if (!this.isPasswordConfirmed()) {
      return;
    }
    let userInfo: UserInfo = {
      account: this.account,
      password: this.password,
      nickname: this.nickname,
      email: this.email
    };
    if (!PreferencesUtil.registerUser(userInfo)) {
      this.showToast($r('app.string.account_exists'));
      return;
    }
    this.showToast($r('app.string.register_success'));
    this.switchMode(AuthMode.Login);
  }

  private resetPassword(): void {
    if (this.isBlank(this.account) || this.isBlank(this.password) || this.isBlank(this.confirmPassword)) {
      this.showToast($r('app.string.input_empty_tips'));
      return;
    }
    if (!this.isPasswordConfirmed()) {
      return;
    }
    if (!PreferencesUtil.resetPassword(this.account, this.password)) {
      this.showToast($r('app.string.account_not_exist'));
      return;
    }
    this.showToast($r('app.string.password_reset_success'));
    this.switchMode(AuthMode.Login);
  }

  private submitAuth(): void {
    if (this.authMode === AuthMode.Login) {
      this.login();
    } else if (this.authMode === AuthMode.Register) {
      this.register();
    } else {
      this.resetPassword();
    }
  }

  aboutToDisappear() {
    clearTimeout(this.timeOutId);
    this.timeOutId = -1;
  }

  build() {
    Navigation(this.pathStack) {
      Scroll() {
        Column() {
          Image($r('app.media.logo'))
            .width('78vp')
            .height('78vp')
            .margin({ top: this.authMode === AuthMode.Login ? '120vp' : '48vp', bottom: '8vp' })
          Text(this.authMode === AuthMode.Login ? $r('app.string.login_page') :
            (this.authMode === AuthMode.Register ? $r('app.string.auth_register_title') :
            $r('app.string.auth_reset_title')))
            .fontSize('24fp')
            .fontWeight(FontWeight.Medium)
            .fontColor('#182431')
          Text(this.authMode === AuthMode.Login ? $r('app.string.login_more') :
            (this.authMode === AuthMode.Register ? $r('app.string.auth_register_more') :
            $r('app.string.auth_reset_more')))
            .fontSize('16fp')
            .fontColor('#99182431')
            .textAlign(TextAlign.Center)
            .margin({
              bottom: '30vp',
              top: '8vp'
            })

          TextInput({ text: this.account, placeholder: $r('app.string.account') })
            .maxLength(11)
            .type(InputType.Number)
            .inputStyle()
            .onChange((value: string) => {
              this.account = value;
            })
          Line()
            .lineStyle()

          if (this.authMode === AuthMode.Register) {
            TextInput({ text: this.nickname, placeholder: $r('app.string.nickname') })
              .maxLength(16)
              .inputStyle()
              .onChange((value: string) => {
                this.nickname = value;
              })
            Line()
              .lineStyle()

            TextInput({ text: this.email, placeholder: $r('app.string.email') })
              .maxLength(32)
              .inputStyle()
              .onChange((value: string) => {
                this.email = value;
              })
            Line()
              .lineStyle()
          }

          TextInput({ text: this.password, placeholder: this.authMode === AuthMode.ResetPassword ?
            $r('app.string.new_password') : $r('app.string.password') })
            .maxLength(16)
            .type(InputType.Password)
            .inputStyle()
            .onChange((value: string) => {
              this.password = value;
            })
          Line()
            .lineStyle()

          if (this.authMode !== AuthMode.Login) {
            TextInput({ text: this.confirmPassword, placeholder: $r('app.string.confirm_password') })
              .maxLength(16)
              .type(InputType.Password)
              .inputStyle()
              .onChange((value: string) => {
                this.confirmPassword = value;
              })
            Line()
              .lineStyle()
          }

          if (this.authMode === AuthMode.Login) {
            Row() {
              Text($r('app.string.message_login'))
                .blueTextStyle()
              Text($r('app.string.forgot_password'))
                .blueTextStyle()
                .onClick(() => {
                  this.switchMode(AuthMode.ResetPassword);
                })
            }
            .justifyContent(FlexAlign.SpaceBetween)
            .width('328vp')
            .margin({ top: '8vp' })
          }

          Button(this.authMode === AuthMode.Login ? $r('app.string.login') :
            (this.authMode === AuthMode.Register ? $r('app.string.register') : $r('app.string.reset_password')),
            { type: ButtonType.Capsule })
            .width('328vp')
            .height('40vp')
            .fontSize('16fp')
            .fontWeight(FontWeight.Medium)
            .backgroundColor($r('app.color.login_button_color'))
            .margin({
              top: this.authMode === AuthMode.Login ? '48vp' : '28vp',
              bottom: '12vp'
            })
            .onClick(() => {
              this.submitAuth();
            })

          if (this.authMode === AuthMode.Login) {
            Text($r('app.string.register_account'))
              .fontColor('#007DFF')
              .fontSize('16fp')
              .fontWeight(FontWeight.Medium)
              .onClick(() => {
                this.switchMode(AuthMode.Register);
              })
          } else {
            Text($r('app.string.back_to_login'))
              .fontColor('#007DFF')
              .fontSize('16fp')
              .fontWeight(FontWeight.Medium)
              .onClick(() => {
                this.switchMode(AuthMode.Login);
              })
          }

          if (this.isShowProgress) {
            LoadingProgress()
              .color('#182431')
              .width('30vp')
              .height('30vp')
              .margin({ top: '20vp' })
          }

          if (this.authMode === AuthMode.Login) {
            Text($r('app.string.other_login_method'))
              .fontColor('#838D97')
              .fontSize('12fp')
              .fontWeight(FontWeight.Medium)
              .margin({
                top: '50vp',
                bottom: '12vp'
              })
            Row({ space: 44 }) {
              this.imageButton($r('app.media.login_method1'))
              this.imageButton($r('app.media.login_method2'))
              this.imageButton($r('app.media.login_method3'))
            }
            .margin({ bottom: '16vp' })
          }
        }
        .width('100%')
        .padding({
          left: '12vp',
          right: '12vp',
          bottom: '24vp'
        })
      }
      .height('100%')
      .width('100%')
    }
    .backgroundColor('#F1F3F5')
    .width('100%')
    .height('100%')
    .hideTitleBar(true)
    .hideToolBar(true)
  }
}
