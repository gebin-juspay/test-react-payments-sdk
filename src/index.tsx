/*
 * Copyright (c) Juspay Technologies.
 *
 * This source code is licensed under the AGPL 3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'test-react-payments-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const TesetSDKReact = NativeModules.TesetSDKReact
  ? NativeModules.TesetSDKReact
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export { default as HyperFragmentView } from './HyperFragmentView';

if (Platform.OS === 'android') {
  TesetSDKReact.updateBaseViewController = () => {};
  TesetSDKReact.updateMerchantViewHeight = (
    _tag: string,
    _height: number
  ) => {
    console.log('UpdateMerchantViewHeight not available for android');
  };
}

if (Platform.OS === 'ios') {
  TesetSDKReact.processWithActivity = (data: string) => {
    TesetSDKReact.process(data);
  };
}

type TesetSDKReactType = {
  HyperEvent: string;
  preFetch(data: string): void;
  createHyperServices(): void;
  initiate(data: string): void;
  process(data: string): void;
  processWithActivity(data: string): void;
  terminate(): void;
  onBackPressed(): boolean;
  isNull(): boolean;
  isInitialised(): Promise<boolean>;
  updateBaseViewController(): void;
  openPaymentPage(data: string): void;
  updateMerchantViewHeight(tag: string, height: number): void;
  notifyAboutRegisterComponent(tag: string): void;
  JuspayHeader: string;
  JuspayHeaderAttached: string;
  JuspayFooter: string;
  JuspayFooterAttached: string;
};

export default TesetSDKReact as TesetSDKReactType;
