require('babel-register')();

const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');
const jsdom = require('jsdom').jsdom;

configure({ adapter: new Adapter() });

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
