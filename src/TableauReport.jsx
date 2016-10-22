import React, { PropTypes } from 'react';
import url from 'url';
import { Promise } from 'es6-promise';
import shallowequal from 'shallowequal';
import tokenizeUrl from './tokenizeUrl';
import Tableau from 'tableau-api';

const propTypes = {
  id: PropTypes.number,
  filters: PropTypes.object,
  url: PropTypes.string,
  parameters: PropTypes.object
};

const defaultProps = {
  loading: false,
  parameters: {}
};

class TableauReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      parameters: {}
    };
  }

  componentDidMount() {
    this.initTableau();
  }

  componentWillReceiveProps(nextProps) {
    const isReportChanged = nextProps.id !== this.props.id;
    const isFiltersChanged = !shallowequal(this.props.filters, nextProps.filters, this.compareArrays);
    const isParametersChanged = !shallowequal(this.props.parameters, nextProps.parameters);
    const isLoading = this.state.loading;

    // Only report is changed - re-initialize
    if (isReportChanged) {
      this.initTableau();
    }

    // Only filters are changed, apply via the API
    if (!isReportChanged && isFiltersChanged && !isLoading) {
      this.applyFilters(nextProps.filters);
    }

    // Only parameters are changed, apply via the API
    if (!isReportChanged && isParametersChanged && !isLoading) {
      this.applyParameters(nextProps.parameters);
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

  getUrl() {
    const { isTokenUsed, token } = this.props;
    const parsed = url.parse(this.props.url, true);
    const query = '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes';

    if (!isTokenUsed && token) {
      this.props.invalidateToken();
      return tokenizeTableauUrl(this.props.url, token) + query;
    }

    return parsed.protocol + '//' + parsed.host + parsed.pathname + query;
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
    const opts = { isExcludeMode: true };

    this.viz.pauseAutomaticUpdatesAsync();

    this.setState({ loading: true });

    for (const key in filters) {
      if (
        !this.state.filters.hasOwnProperty(key) ||
        !this.compareArrays(this.state.filters[key], filters[key])
      ) {
        promises.push(
          this.sheet.applyFilterAsync(key, filters[key], REPLACE, opts)
        );
      }
    }

    Promise.all(promises).then(() => {
      this.viz.resumeAutomaticUpdatesAsync();
      this.setState({ loading: false, filters });
    }, () => {
      this.viz.resumeAutomaticUpdatesAsync();
      this.setState({ loading: false, filters });
    });
  }

  applyParameters() {
    const { parameters } = this.props;
    const promises = [];

    if (!this.props.parameters || this.props.disableParameters) {
      return;
    }

    this.setState({ loading: true });

    for (const key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        const val = parameters[key];
        promises.push(this.workbook.changeParameterValueAsync(key, val));
      }
    }

    Promise.all(promises).then(() => {
      this.setState({ loading: false });
    }, () => {
      this.setState({ loading: false });
    });
  }

  /**
   * Initialize the viz via the Tableau JS API.
   * @return {void}
   */
  initTableau() {
    const { filters, parameters } = this.props;

    const options = {
      ...filters,
      ...parameters,
      onFirstInteractive: () => {
        this.workbook = this.viz.getWorkbook();
        this.sheets = this.workbook.getActiveSheet().getWorksheets();
        this.sheet = this.sheets[0];

        this.setState({ loading: false, filters: filters });

        this.props.onLoad(new Date());
      }
    };

    this.setState({ loading: true });

    // cleanup
    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    /**
     * @HACK REMOVE THIS !
     */
    const _vizUrl = this.getUrl();
    console.log("vizUrl", _vizUrl);

    this.viz = new Tableau.Viz(this.refs['container'], _vizUrl, options);
  }

  render() {
    return <div ref="container" />;
  }
}

TableauReport.propTypes = propTypes;
TableauReport.defaultProps = defaultProps;

export default TableauReport;
