/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import Web3 from 'web3';

//const web3 = new Web3(new Web3.providers.HttpProvider('https://8335b94e.ngrok.io'));
 

const GeektAddress = '0x7fd39e17e50b17d2bedb05fece32e70e43a4fb92';

const ABI =[ { constant: true,
    inputs: [],
    name: 'getUsers',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: false,
    inputs: [ [Object], [Object], [Object], [Object] ],
    name: 'registerNewUser',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'getImage',
    outputs: [ [Object], [Object] ],
    payable: false,
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'getUser',
    outputs: [ [Object], [Object], [Object], [Object], [Object] ],
    payable: false,
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'getAllImages',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: false,
    inputs: [ [Object], [Object] ],
    name: 'addImageToUser',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: false,
    inputs: [ [Object] ],
    name: 'removeUser',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: false,
    inputs: [ [Object] ],
    name: 'removeImage',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { constant: true,
    inputs: [ [Object] ],
    name: 'getUserImages',
    outputs: [ [Object] ],
    payable: false,
    type: 'function' },
  { inputs: [], payable: true, type: 'constructor' } ]

// GeektContract.getUsers((err, results) => {
//   console.log(err)
//   console.log(results)
// });


// GeektContract.deployed().then(function(instance) {  
//   return instance.getUsers();
// }).then(function(result) {
//   console.log(result)
//   // Do something after the someFunction() transaction executed
// });

// let defaultAccount
//   , web3;

// function loadWeb3() {
//   let web3Injected = window.web3;
//   if(typeof web3Injected !== 'undefined'){
//     console.log("saw injected web3!");
//     web3 = new Web3(web3Injected.currentProvider);
//   } else {
//     console.log("did not see web3 injected!");
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//   }
// }

// loadWeb3()
// var GeektContract = web3.eth.contract(ABI).at(GeektAddress);

//   if(typeof web3.eth.accounts !== 'undefined') {
//     if(typeof web3.eth.accounts[0] !== 'undefined'){
//       defaultAccount = web3.eth.accounts[0];
//       GeektContract.getUsers((err, results) => {
//         console.log(err)

//       });
//     }
//   }




// this is a dapp yo
// window.addEventListener('load', () => {
//   if (typeof web3 !== 'undefined') {
//     window.web3 = new Web3(web3.currentProvider);
//     debugger
//   } else {
//     console.log('no injected Web3')
//     var provider = document.getElementById('provider_url'.value);
//     window.web3 = new Web3(new Web3.providers.HttpProvider(provider))
//   }
// })

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Import root routes
import createRoutes from './routes';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
