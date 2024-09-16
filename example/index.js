import { AppRegistry } from 'react-native';
import App from './src/App';
import JuspayTopView from './src/JuspayTopView';
import JuspayTopViewAttached from './src/JuspayTopViewAttached';
import { name as appName } from './app.json';
import TesetSDKReact from 'test-react-payments-sdk';

AppRegistry.registerComponent(appName, () => App);

TesetSDKReact.notifyAboutRegisterComponent(
  TesetSDKReact.JuspayHeaderAttached
);
AppRegistry.registerComponent(
  TesetSDKReact.JuspayHeaderAttached,
  () => JuspayTopViewAttached
);
TesetSDKReact.notifyAboutRegisterComponent(TesetSDKReact.JuspayHeader);
AppRegistry.registerComponent(
  TesetSDKReact.JuspayHeader,
  () => JuspayTopView
);
