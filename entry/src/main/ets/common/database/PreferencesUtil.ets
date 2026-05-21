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

import { preferences } from '@kit.ArkData';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

const KEY_APP_FONT_SIZE = 'appFontSize';
const KEY_USER_LIST = 'userList';
const KEY_CURRENT_ACCOUNT = 'currentAccount';
const TAG = 'PreferencesUtil';

export interface UserInfo {
  account: string;
  password: string;
  nickname: string;
  email: string;
}

/**
 * The PreferencesUtil provides preferences of create, save and query.
 */
class PreferencesUtil {
  preference?: preferences.Preferences;

  /**
   *The method of creating a preferences Instance.
   */
  getFontPreferences(context: Context) {
    try {
      this.preference = preferences.getPreferencesSync(context, { name: 'FontPreferences' });
      hilog.info(0x0000, TAG, 'create success');
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `create failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  /**
   *The method of saving fontsize offset change.
   */
  saveChangeFontSize(fontSizeOffset: number) {
    try {
      this.preference?.putSync(KEY_APP_FONT_SIZE, fontSizeOffset);
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `putSync failed, code = ${err.code}, message = ${err.message}`);
    }
    this.preference?.flush(
      (err: BusinessError) => {
        if (err) {
          hilog.error(0x0000, TAG, 'Failed to flush. code =' + err.code + ', message =' + err.message);
          return;
        }
        hilog.info(0x0000, TAG, 'Succeeded in flushing.');
      });
  }

  /**
   *The method of getting fontsize offset.
   */
  getChangeFontSize() {
    let fontSizeOffset: number = 0;
    try {
      fontSizeOffset = this.preference?.getSync(KEY_APP_FONT_SIZE, 0) as number;
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `getSync failed, code = ${err.code}, message = ${err.message}`);
    }
    return fontSizeOffset;
  }

  /**
   *The method of Determining Whether a key Exists.
   */
  isKeyExist(): boolean {
    let isKeyExist: boolean = false;
    this.preference?.has(KEY_APP_FONT_SIZE).then((isExist: boolean) => {
      isKeyExist = isExist;
    }).catch((err: Error) => {
      hilog.error(0x0000, TAG, 'Has the value failed with err: ' + err);
    });
    return isKeyExist;
  }

  getUsers(): Array<UserInfo> {
    let users: Array<UserInfo> = [];
    try {
      let usersJson = this.preference?.getSync(KEY_USER_LIST, '[]') as string;
      users = JSON.parse(usersJson) as Array<UserInfo>;
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `getUsers failed, code = ${err.code}, message = ${err.message}`);
    }
    return users;
  }

  private saveUsers(users: Array<UserInfo>): void {
    try {
      this.preference?.putSync(KEY_USER_LIST, JSON.stringify(users));
      this.preference?.flush();
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `saveUsers failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  findUser(account: string): UserInfo | undefined {
    let users = this.getUsers();
    return users.find((user: UserInfo) => user.account === account);
  }

  registerUser(userInfo: UserInfo): boolean {
    if (this.findUser(userInfo.account) !== undefined) {
      return false;
    }
    let users = this.getUsers();
    users.push(userInfo);
    this.saveUsers(users);
    return true;
  }

  validateUser(account: string, password: string): boolean {
    let user = this.findUser(account);
    return user !== undefined && user.password === password;
  }

  resetPassword(account: string, password: string): boolean {
    let users = this.getUsers();
    let userIndex = users.findIndex((user: UserInfo) => user.account === account);
    if (userIndex < 0) {
      return false;
    }
    users[userIndex].password = password;
    this.saveUsers(users);
    return true;
  }

  saveCurrentAccount(account: string): void {
    try {
      this.preference?.putSync(KEY_CURRENT_ACCOUNT, account);
      this.preference?.flush();
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `saveCurrentAccount failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  getCurrentAccount(): string {
    let account = '';
    try {
      account = this.preference?.getSync(KEY_CURRENT_ACCOUNT, '') as string;
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `getCurrentAccount failed, code = ${err.code}, message = ${err.message}`);
    }
    return account;
  }

  getCurrentUser(): UserInfo | undefined {
    let account = this.getCurrentAccount();
    if (account === '') {
      return undefined;
    }
    return this.findUser(account);
  }

  clearCurrentAccount(): void {
    try {
      this.preference?.putSync(KEY_CURRENT_ACCOUNT, '');
      this.preference?.flush();
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `clearCurrentAccount failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  updateCurrentUserProfile(nickname: string, email: string): boolean {
    let account = this.getCurrentAccount();
    let users = this.getUsers();
    let userIndex = users.findIndex((user: UserInfo) => user.account === account);
    if (userIndex < 0) {
      return false;
    }
    users[userIndex].nickname = nickname;
    users[userIndex].email = email;
    this.saveUsers(users);
    return true;
  }
}

export default new PreferencesUtil();
