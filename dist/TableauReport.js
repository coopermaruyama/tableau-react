'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _es6Promise = require('es6-promise');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _tokenizeUrl = require('./tokenizeUrl');

var _tokenizeUrl2 = _interopRequireDefault(_tokenizeUrl);

var _tableauSdk = require('./tableau-sdk');

var _tableauSdk2 = _interopRequireDefault(_tableauSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  filters: _propTypes2.default.object,
  url: _propTypes2.default.string.isRequired,
  parameters: _propTypes2.default.object,
  options: _propTypes2.default.object,
  token: _propTypes2.default.string,
  onLoad: _propTypes2.default.func,
  query: _propTypes2.default.string
};

var defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {},
  query: '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
};

var TableauReport = function (_React$Component) {
  _inherits(TableauReport, _React$Component);

  function TableauReport(props) {
    _classCallCheck(this, TableauReport);

    var _this = _possibleConstructorReturn(this, (TableauReport.__proto__ || Object.getPrototypeOf(TableauReport)).call(this, props));

    _this.state = {
      filters: props.filters,
      parameters: props.parameters,
      intervalId: null
    };
    return _this;
  }

  _createClass(TableauReport, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initTableau();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearInterval();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var isReportChanged = this.props.url !== prevProps.url;
      var isFiltersChanged = !(0, _shallowequal2.default)(prevProps.filters, this.props.filters, this.compareArrays);
      var isParametersChanged = !(0, _shallowequal2.default)(prevProps.parameters, this.props.parameters);
      var isIntervalChanged = this.props.options.interval !== prevProps.options.interval;
      var isLoading = this.state.loading;

      // Only report is changed - re-initialize
      if (isReportChanged) {
        this.initTableau(this.props.url);
      }

      // Only filters are changed, apply via the API
      if (!isReportChanged && isFiltersChanged && !isLoading) {
        this.applyFilters(this.props.filters);
      }

      // Only parameters are changed, apply via the API
      if (!isReportChanged && isParametersChanged && !isLoading) {
        this.applyParameters(this.props.parameters);
      }

      // token change, validate it.
      if (this.props.token !== prevProps.token) {
        this.setState({ didInvalidateToken: false });
      }

      // unset interval or update if changed
      if (isIntervalChanged && typeof this.props.options.interval === 'number') {
        this.initInterval();
      }
    }

    /**
     * Compares the values of filters to see if they are the same.
     * @param  {Array<Number>} a
     * @param  {Array<Number>} b
     * @return {Boolean}
     */

  }, {
    key: 'compareArrays',
    value: function compareArrays(a, b) {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.sort().toString() === b.sort().toString();
      }

      return undefined;
    }

    /**
     * Execute a callback when an array of promises complete, regardless of
     * whether any throw an error.
     */

  }, {
    key: 'onComplete',
    value: function onComplete(promises, cb) {
      _es6Promise.Promise.all(promises).then(function () {
        return cb();
      }, function () {
        return cb();
      });
    }

    /**
     * Returns a vizUrl, tokenizing it if a token is passed and immediately
     * invalidating it to prevent it from being used more than once.
     */

  }, {
    key: 'getUrl',
    value: function getUrl(nextUrl) {
      var newUrl = nextUrl || this.props.url;
      var _props = this.props,
          token = _props.token,
          query = _props.query;

      var parsed = _url2.default.parse(newUrl, true);

      if (!this.state.didInvalidateToken && token) {
        this.invalidateToken();
        return (0, _tokenizeUrl2.default)(newUrl, token) + query;
      }

      return parsed.protocol + '//' + parsed.host + parsed.pathname + query;
    }
  }, {
    key: 'invalidateToken',
    value: function invalidateToken() {
      this.setState({ didInvalidateToken: true });
    }

    /**
     * Asynchronously applies filters to the worksheet, excluding those that have
     * already been applied, which is determined by checking against state.
     * @param  {Object} filters
     * @return {void}
     */

  }, {
    key: 'applyFilters',
    value: function applyFilters(filters) {
      var _this2 = this;

      var REPLACE = _tableauSdk2.default.FilterUpdateType.REPLACE;
      var promises = [];

      if (!this.sheet) {
        console.warn('tableau-react: Not appplying filters because the sheet is not loaded yet.');
        return;
      }

      this.setState({ loading: true });

      for (var key in filters) {
        if (!this.state.filters.hasOwnProperty(key) || !this.compareArrays(this.state.filters[key], filters[key])) {
          promises.push(this.sheet.applyFilterAsync(key, filters[key], REPLACE));
        }
      }

      this.onComplete(promises, function () {
        return _this2.setState({ loading: false, filters: filters });
      });
    }
  }, {
    key: 'applyParameters',
    value: function applyParameters(parameters) {
      var _this3 = this;

      var promises = [];

      for (var key in parameters) {
        if (!this.state.parameters.hasOwnProperty(key) || this.state.parameters[key] !== parameters[key]) {
          var val = parameters[key];
          // Ensure that parameters are applied only when we have a workbook
          if (this.workbook && this.workbook.changeParameterValueAsync) {
            promises.push(this.workbook.changeParameterValueAsync(key, val));
          }
        }
      }

      this.onComplete(promises, function () {
        return _this3.setState({ loading: false, parameters: parameters });
      });
    }

    /**
     * If an interval is passed, refrshes the report every interval.
     */

  }, {
    key: 'initInterval',
    value: function initInterval() {
      var _this4 = this;

      // Setup auto-refresh
      if (typeof this.props.options.interval === 'number') {
        var interval = setInterval(function () {
          _this4.viz.refreshDataAsync();
        }, this.props.options.interval);

        this.setState({ intervalId: interval });
      }
    }

    /**
     * Clear interval if set.
     */

  }, {
    key: 'clearInterval',
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      if (typeof this.state.intervalId === 'number') {
        clearInterval(this.state.intervalId);
        this.setState({ intervalId: null });
      }
    })

    /**
     * Initialize the viz via the Tableau JS API.
     * @return {void}
     */

  }, {
    key: 'initTableau',
    value: function initTableau(nextUrl) {
      var _this5 = this;

      var _props2 = this.props,
          filters = _props2.filters,
          parameters = _props2.parameters;

      var vizUrl = this.getUrl(nextUrl);

      var options = _extends({}, filters, parameters, this.props.options, {
        onFirstInteractive: function onFirstInteractive() {
          _this5.workbook = _this5.viz.getWorkbook();
          _this5.sheet = _this5.workbook.getActiveSheet();

          // If child sheets exist, choose them.
          var hasChildSheets = typeof _this5.sheet.getWorksheets !== 'undefined';
          if (hasChildSheets) {
            var childSheets = _this5.sheet.getWorksheets();

            if (childSheets && childSheets.length) {
              _this5.sheet = childSheets[0];
            }
          }

          _this5.props.onLoad && _this5.props.onLoad(new Date());
        }
      });

      // cleanup
      if (this.viz) {
        this.viz.dispose();
        this.viz = null;
      }

      this.viz = new _tableauSdk2.default.Viz(this.container, vizUrl, options);
      this.initInterval();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement('div', { ref: function ref(c) {
          return _this6.container = c;
        } });
    }
  }]);

  return TableauReport;
}(_react2.default.Component);

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

exports.default = TableauReport;
module.exports = exports['default'];