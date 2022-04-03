require('babel-register')();

const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

configure({ adapter: new Adapter() });

var exposedProperties = ['window', 'navigator', 'document'];

const { window } = new JSDOM('');
global.document = window.document;
global.window = window;

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
