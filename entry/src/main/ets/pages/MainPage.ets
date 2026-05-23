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

import { curves } from '@kit.ArkUI';
import PreferencesUtil from '../common/database/PreferencesUtil';
import Home from '../view/Home';
import Setting from '../view/Setting';

@Builder
export function MainPageBuilder() {
  MainPage()
}

/**
 * Main page
 */
@Component
export struct MainPage {
  @StorageLink('fontSizeOffset') fontSizeOffset: number = 0;
  @State currentIndex: number = 0;
  @State pathStack: NavPathStack = new NavPathStack();
  @State tab0OffsetX: string = '0%';
  @State tab1OffsetX: string = '0%';
  @State tab0Opacity: number = 1;
  @State tab1Opacity: number = 1;
  private tabsController: TabsController = new TabsController();

  aboutToAppear() {
    this.fontSizeOffset = PreferencesUtil.getChangeFontSize();
  }

  private changeTab(index: number): void {
    if (this.currentIndex === index) {
      return;
    }
    this.tabsController.changeIndex(index);
  }

  @Builder
  TabBuilder(title: Resource, index: number, selectedImg: Resource) {
    Column() {
      SymbolGlyph(selectedImg)
        .fontSize(this.currentIndex === index ? '28fp' : '22fp')
        .renderingStrategy(SymbolRenderingStrategy.MULTIPLE_OPACITY)
        .symbolEffect(new BounceSymbolEffect(EffectScope.WHOLE, EffectDirection.UP),
          this.currentIndex === index ? true : false)
        .fontColor(this.currentIndex === index ? ['#0a59f7'] : ['#66000000'])
      Text(title)
        .margin({ top: '4vp' })
        .fontSize(10 + this.fontSizeOffset)
        .fontWeight(500)
        .fontColor(this.currentIndex === index ? '#0a59f7' : '#66000000')
    }
    .backgroundColor(this.currentIndex === index ? '#1A0A59F7' : '#F1F3F5')
    .borderRadius('20vp')
    .justifyContent(FlexAlign.Center)
    .height('56vp')
    .width('100%')
    .scale({
      x: this.currentIndex === index ? 1.18 : 0.9,
      y: this.currentIndex === index ? 1.18 : 0.9
    })
    .animation({
      duration: 380,
      curve: curves.springMotion(0.4, 0.75)
    })
    .onClick(() => {
      this.changeTab(index);
    })
  }

  private playTabTransition(from: number, to: number, proxy: TabContentTransitionProxy): void {
    const dir: number = to > from ? 1 : -1;
    if (to === 0) {
      this.tab0OffsetX = `${dir * 40}%`;
      this.tab0Opacity = 0;
    } else {
      this.tab1OffsetX = `${dir * 40}%`;
      this.tab1Opacity = 0;
    }
    this.getUIContext().animateTo({
      duration: 450,
      curve: curves.cubicBezierCurve(0.2, 0, 0, 1),
      onFinish: () => {
        proxy.finishTransition();
      }
    }, () => {
      if (from === 0) {
        this.tab0OffsetX = `${-dir * 40}%`;
        this.tab0Opacity = 0;
      } else {
        this.tab1OffsetX = `${-dir * 40}%`;
        this.tab1Opacity = 0;
      }
      if (to === 0) {
        this.tab0OffsetX = '0%';
        this.tab0Opacity = 1;
      } else {
        this.tab1OffsetX = '0%';
        this.tab1Opacity = 1;
      }
    });
  }

  build() {
    NavDestination() {
      Tabs({
        barPosition: BarPosition.End,
        controller: this.tabsController
      }) {
        TabContent() {
          Home({ pathStack: this.pathStack })
        }
        .padding({
          left: '12vp',
          right: '12vp'
        })
        .backgroundColor('#F1F3F5')
        .opacity(this.tab0Opacity)
        .translate({ x: this.tab0OffsetX })
        .tabBar(this.TabBuilder($r('app.string.Tab_Bar_One'), 0, $r('sys.symbol.house_fill')))

        TabContent() {
          Setting({ pathStack: this.pathStack })
        }
        .padding({
          left: '12vp',
          right: '12vp'
        })
        .backgroundColor('#F1F3F5')
        .opacity(this.tab1Opacity)
        .translate({ x: this.tab1OffsetX })
        .tabBar(this.TabBuilder($r('app.string.Tab_Bar_Two'), 1, $r('sys.symbol.person_crop_circle_fill_1')))
      }
      .margin({ bottom: '64vp' })
      .width('100%')
      .height('100%')
      .barHeight('80vp')
      .barMode(BarMode.Fixed)
      .animationDuration(420)
      .animationMode(AnimationMode.CONTENT_FIRST)
      .customContentTransition((from: number, to: number): TabContentAnimatedTransition | undefined => {
        if (from === to) {
          return undefined;
        }
        const animation: TabContentAnimatedTransition = {
          timeout: 600,
          transition: (proxy: TabContentTransitionProxy) => {
            this.playTabTransition(from, to, proxy);
          }
        };
        return animation;
      })
      .onChange((index: number) => {
        this.currentIndex = index;
      })
    }
    .height('100%')
    .hideTitleBar(true)
    .backgroundColor('#F1F3F5')
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    })
  }
}
