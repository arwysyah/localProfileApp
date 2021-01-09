/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native'
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs(['Require cycle: node_modules/rn-fetch-blob/index.js -> node_modules/rn-fetch-blob/polyfill/index.js -> node_modules/rn-fetch-blob/polyfill/Blob.js -> node_modules/rn-fetch-blob/index.js']);
LogBox.ignoreLogs(['Require cycle: node_modules/rn-fetch-blob/index.js -> node_modules/rn-fetch-blob/polyfill/index.js -> node_modules/rn-fetch-blob/polyfill/XMLHttpRequest.js -> node_modules/rn-fetch-blob/index.js']);
LogBox.ignoreLogs(['Require cycle: node_modules/rn-fetch-blob/index.js -> node_modules/rn-fetch-blob/polyfill/index.js -> node_modules/rn-fetch-blob/polyfill/Fetch.js -> node_modules/rn-fetch-blob/index.js'])
LogBox.ignoreLogs([` Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/async-storage' instead of 'react-native'. See https://github.com/react-native-community/async-storage`])
AppRegistry.registerComponent(appName, () => App);
