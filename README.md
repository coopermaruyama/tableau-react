# Tableau React Component
Tableau React component integrated with Tableau JS API.

## Usage
```js
import TableauReport from 'tableau-react';

const SimpleReport = props => (
  <TableauReport
    url="http://reports.my-site.com/my-workbook/my-report"
    token="<TRUSTED TICKET HERE>"
  />
)
```

## Supported props
```js

const options = {
  height: 100,
  width: 100,
  hideTabs: false
};

const filters = {
  Colors: ['Blue', 'Red'],
  Sizes: ['Small', 'Medium']
};

const parameters = {
  Param1: 'Value',
  Param2: 'Other Value'
};

const MyReport = props => (
  <TableauReport
    url="http://reports.my-site.com/my-workbook/my-report"
    filters={filters}
    parameters={parameters}
    options={options} // vizCreate options
  />
)
```

### Changing Filters & Parameters

Any parameters or filters that are initially passed will be sent in the
vizCreate options, which speeds up initial loading time by not having to apply
each one asynchronously after the viz loads.

Once the viz has been loaded, if the parameters/filters change but the url
does not, only the changed parameters/filters will be applied asynchronously in
order to optimize performance.


### Viz Integration
Upon initialization, a new Viz will be created. A new Viz will only be
initialized if `props.url` changes for performance reasons.

### Trusted Tickets

You can authenticate using a trusted ticket, which will be immediately
invalidated upon being used, because using it a second time will log the user
out.

If `props.token` gets updated, it will use it the next time a viz is initialized.

## Testing
```
npm install
npm test
```
