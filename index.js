/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Root from './src/Root';
import Test from './src/views/EditItem'

AppRegistry.registerComponent(appName, () => Root);
