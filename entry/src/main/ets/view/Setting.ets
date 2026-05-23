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

import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import PreferencesUtil, { UserInfo } from '../common/database/PreferencesUtil';
import ItemData from '../viewmodel/ItemData';
import mainViewModel from '../viewmodel/MainViewModel';
import { SliderCustomDialog } from './SliderCustomDialog';

const TAG = 'Setting';

/**
 * Setting tab content
 */
@Component
export default struct Setting {
  @StorageLink('fontSizeOffset') fontSizeOffset: number = 0;
  @Link pathStack: NavPathStack;
  @State account: string = '';
  @State accountName: string = 'Mr. Lee';
  @State accountEmail: string = '2000000@test.cc';
  @State avatarPath: string = '';
  @State editName: string = '';
  @State editEmail: string = '';
  @State isProfileEditShow: boolean = false;
  SliderCustomDialogController: CustomDialogController = new CustomDialogController({
    builder: SliderCustomDialog({}),
    alignment: DialogAlignment.Bottom,
    customStyle: true,
    offset: { dx: 0, dy: -25 }
  });

  private showToast(message: Resource): void {
    try {
      this.getUIContext().getPromptAction().showToast({ message: message });
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `showToast failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  private refreshUserProfile(): void {
    let currentUser: UserInfo | undefined = PreferencesUtil.getCurrentUser();
    if (currentUser !== undefined) {
      this.account = currentUser.account;
      this.accountName = currentUser.nickname;
      this.accountEmail = currentUser.email;
      this.avatarPath = currentUser.avatar ?? '';
    }
  }

  private async pickAvatar(): Promise<void> {
    try {
      let options = new picker.PhotoSelectOptions();
      options.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
      options.maxSelectNumber = 1;
      let photoPicker = new picker.PhotoViewPicker();
      let result = await photoPicker.select(options);
      if (!result.photoUris || result.photoUris.length === 0) {
        return;
      }
      let srcUri = result.photoUris[0];
      let context = getContext(this) as common.UIAbilityContext;
      let dotIndex = srcUri.lastIndexOf('.');
      let ext = dotIndex >= 0 ? srcUri.substring(dotIndex) : '.jpg';
      let destPath = `${context.filesDir}/avatar_${Date.now()}${ext}`;
      let srcFile = fs.openSync(srcUri, fs.OpenMode.READ_ONLY);
      let destFile = fs.openSync(destPath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
      try {
        fs.copyFileSync(srcFile.fd, destFile.fd);
      } finally {
        fs.closeSync(srcFile);
        fs.closeSync(destFile);
      }
      let destUri = 'file://' + destPath;
      if (!PreferencesUtil.updateCurrentUserAvatar(destUri)) {
        this.showToast($r('app.string.account_not_exist'));
        return;
      }
      this.avatarPath = destUri;
    } catch (error) {
      let err = error as BusinessError;
      hilog.error(0x00, TAG, `pickAvatar failed, code = ${err.code}, message = ${err.message}`);
    }
  }

  private openProfileEditor(): void {
    this.editName = this.accountName;
    this.editEmail = this.accountEmail;
    this.isProfileEditShow = true;
  }

  private saveProfile(): void {
    if (this.editName.trim() === '' || this.editEmail.trim() === '') {
      this.showToast($r('app.string.input_empty_tips'));
      return;
    }
    if (!PreferencesUtil.updateCurrentUserProfile(this.editName, this.editEmail)) {
      this.showToast($r('app.string.account_not_exist'));
      return;
    }
    this.refreshUserProfile();
    this.isProfileEditShow = false;
    this.showToast($r('app.string.profile_saved'));
  }

  @Builder
  editProfileSheet() {
    Column({ space: 16 }) {
      Text($r('app.string.edit_profile'))
        .fontSize(20 + this.fontSizeOffset)
        .fontWeight(700)
        .width('100%')
        .textAlign(TextAlign.Center)

      Image(this.avatarPath !== '' ? this.avatarPath : $r('app.media.account'))
        .width('72vp')
        .height('72vp')
        .borderRadius('36vp')
        .clip(true)
        .onClick(() => {
          this.pickAvatar();
        })

      Text($r('app.string.change_avatar'))
        .fontSize(14 + this.fontSizeOffset)
        .fontColor('#0A59F7')
        .onClick(() => {
          this.pickAvatar();
        })

      Row() {
        Text($r('app.string.account'))
          .fontSize(16 + this.fontSizeOffset)
        Text(this.account)
          .fontSize(16 + this.fontSizeOffset)
          .fontColor('#66182431')
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceBetween)

      TextInput({ text: this.editName, placeholder: $r('app.string.nickname') })
        .height('44vp')
        .width('90%')
        .maxLength(16)
        .onChange((value: string) => {
          this.editName = value;
        })

      TextInput({ text: this.editEmail, placeholder: $r('app.string.email') })
        .height('44vp')
        .width('90%')
        .maxLength(32)
        .onChange((value: string) => {
          this.editEmail = value;
        })

      Row({ space: 12 }) {
        Button($r('app.string.Cancel'))
          .width('42%')
          .height('40vp')
          .backgroundColor('#0d000000')
          .fontColor('#0A59F7')
          .onClick(() => {
            this.isProfileEditShow = false;
          })
        Button($r('app.string.Confirmed'))
          .width('42%')
          .height('40vp')
          .onClick(() => {
            this.saveProfile();
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .padding({ top: '20vp', bottom: '24vp' })
    .width('100%')
  }

  aboutToAppear(): void {
    this.refreshUserProfile();
  }

  @Builder
  settingCell(item: ItemData, customDialogController: CustomDialogController) {
    Row() {
      Row({}) {
        Image(item.img)
          .height('22vp')
          .margin({
            left: '16vp',
            right: '12vp'
          })
        Text(item.title)
          .fontSize(16 + this.fontSizeOffset)
      }

      if (item.others === undefined) {
        Image($r('app.media.right_grey'))
          .width('12vp')
          .height('24vp')
      } else {
        Toggle({ type: ToggleType.Switch, isOn: false })
      }
    }
    .onClick(() => {
      if (item.id === 1) {
        customDialogController.open();
      }
    })
    .justifyContent(FlexAlign.SpaceBetween)
    .width('100%')
    .padding({
      left: '8vp',
      right: '22vp'
    })
  }

  build() {
    Scroll() {
      Column({ space: 12 }) {
        Text($r('app.string.mainPage_tabTitles_mine'))
          .width('100%')
          .margin({
            top: '48vp',
            bottom: '12vp'
          })
          .fontWeight(700)
          .fontSize(26 + this.fontSizeOffset)

        Row() {
          Image(this.avatarPath !== '' ? this.avatarPath : $r('app.media.account'))
            .width('48vp')
            .height('48vp')
            .borderRadius('24vp')
            .clip(true)
          Column() {
            Text(this.accountName)
              .fontSize(20 + this.fontSizeOffset)
            Text(this.accountEmail)
              .fontSize(12 + this.fontSizeOffset)
              .margin({ top: '4vp' })
          }
          .alignItems(HorizontalAlign.Start)
          .margin({ left: '12vp' })
          Blank()
          Image($r('app.media.edit'))
            .width('32vp')
            .height('32vp')
            .margin({ right: '12vp' })
        }
        .alignItems(VerticalAlign.Center)
        .width('100%')
        .onClick(() => {
          this.openProfileEditor();
        })

        List({ space: 12 }) {
          ForEach(mainViewModel.getSettingListData(), (item: ItemData[]) => {
            ListItemGroup() {
              ForEach(item, (cell: ItemData) => {
                ListItem() {
                  this.settingCell(cell, this.SliderCustomDialogController);
                }
                .height('48vp')
              }, (cell: ItemData) => JSON.stringify(cell))
            }
            .divider({
              strokeWidth: '1vp',
              color: '#0d000000',
              startMargin: '42vp',
              endMargin: '24vp'
            })
            .backgroundColor('#ffffff')
            .borderRadius('16vp')

          }, (item: ItemData) => JSON.stringify(item))
        }
        .scrollBar(BarState.Off)
        .width('100%')
        .padding({
          top: 4,
          bottom: 4
        })

        Blank()

        Button($r('app.string.setting_button'), { type: ButtonType.Capsule })
          .width('90%')
          .height('40vp')
          .fontSize(16 + this.fontSizeOffset)
          .fontColor('#FA2A2D')
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#E5E8EA')
          .margin({ bottom: '16vp' })
          .onClick(() => {
            PreferencesUtil.clearCurrentAccount();
            this.pathStack.pop();
          })
          .bindSheet(this.isProfileEditShow, this.editProfileSheet(), {
            height: '480vp',
            onDisappear: () => {
              this.isProfileEditShow = false;
            }
          })
      }
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}
