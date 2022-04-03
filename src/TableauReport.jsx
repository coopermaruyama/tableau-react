import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import { Promise } from 'es6-promise';
import shallowequal from 'shallowequal';
import tokenizeUrl from './tokenizeUrl';
import Tableau from './tableau-sdk';

const propTypes = {
  filters: PropTypes.object,
  url: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  options: PropTypes.object,
  token: PropTypes.string,
  onLoad: PropTypes.func,
  query: PropTypes.string,
};

const defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {},
  query: '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
};

class TableauReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: props.filters,
      parameters: props.parameters
    };
  }

  componentDidMount() {
    this.initTableau();
  }

  componentDidUpdate(prevProps) {
    const isReportChanged = this.props.url !== prevProps.url;
    const isFiltersChanged = !shallowequal(prevProps.filters, this.props.filters, this.compareArrays);
    const isParametersChanged = !shallowequal(prevProps.parameters, this.props.parameters);
    const isLoading = this.state.loading;

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
  }

  /**
   * Compares the values of filters to see if they are the same.
   * @param  {Array<Number>} a
   * @param  {Array<Number>} b
   * @return {Boolean}
   */
  compareArrays(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.sort().toString() === b.sort().toString();
    }

    return undefined;
  }

  /**
   * Execute a callback when an array of promises complete, regardless of
   * whether any throw an error.
   */
  onComplete(promises, cb) {
    Promise.all(promises).then(() => cb(), () => cb())
  }

  /**
   * Returns a vizUrl, tokenizing it if a token is passed and immediately
   * invalidating it to prevent it from being used more than once.
   */
  getUrl(nextUrl) {
    const newUrl = nextUrl || this.props.url;
    const { token, query } = this.props;
    const parsed = url.parse(newUrl, true);

    if (!this.state.didInvalidateToken && token) {
      this.invalidateToken();
      return tokenizeUrl(newUrl, token) + query;
    }

    return parsed.protocol + '//' + parsed.host + parsed.pathname + query;
  }

  invalidateToken() {
    this.setState({ didInvalidateToken: true });
  }

  /**
   * Asynchronously applies filters to the worksheet, excluding those that have
   * already been applied, which is determined by checking against state.
   * @param  {Object} filters
   * @return {void}
   */
  applyFilters(filters) {
    const REPLACE = Tableau.FilterUpdateType.REPLACE;
    const promises = [];

    if (!this.sheet) {
      console.warn(`tableau-react: Not appplying filters because the sheet is not loaded yet.`);
      return;
    }

    this.setState({ loading: true });

    for (const key in filters) {
      if (
        !this.state.filters.hasOwnProperty(key) ||
        !this.compareArrays(this.state.filters[key], filters[key])
      ) {
        promises.push(
          this.sheet.applyFilterAsync(key, filters[key], REPLACE)
        );
      }
    }

    this.onComplete(promises, () => this.setState({ loading: false, filters }));
  }

  applyParameters(parameters) {
    const promises = [];

    for (const key in parameters) {
      if (
        !this.state.parameters.hasOwnProperty(key) ||
        this.state.parameters[key] !== parameters[key]
      ) {
        const val = parameters[key];
        // Ensure that parameters are applied only when we have a workbook
        if (this.workbook && this.workbook.changeParameterValueAsync) {
          promises.push(this.workbook.changeParameterValueAsync(key, val));
        }
      }
    }

    this.onComplete(promises, () => this.setState({ loading: false, parameters }));
  }

  /**
   * Initialize the viz via the Tableau JS API.
   * @return {void}
   */
  initTableau(nextUrl) {
    const { filters, parameters } = this.props;
    const vizUrl = this.getUrl(nextUrl);

    const options = {
      ...filters,
      ...parameters,
      ...this.props.options,
      onFirstInteractive: () => {
        this.workbook = this.viz.getWorkbook();
        this.sheet = this.workbook.getActiveSheet();

        // If child sheets exist, choose them.
        const hasChildSheets = typeof this.sheet.getWorksheets !== 'undefined';
        if (hasChildSheets) {
          const childSheets = this.sheet.getWorksheets();

          if (childSheets && childSheets.length) {
            this.sheet = childSheets[0];
          }
        }

        this.props.onLoad && this.props.onLoad(new Date());
      }
    };

    // cleanup
    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    this.viz = new Tableau.Viz(this.container, vizUrl, options);
  }

  render() {
    return <div ref={c => this.container = c} />;
  }
}

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

export default TableauReport;
