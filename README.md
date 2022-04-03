# Tableau React Component
Tableau React component integrated with Tableau JS API.

## Install

```
npm install tableau-react
```

## Install Beta Version (Uses Tableau API v2.3.0)

Note: This version is not heavily tested and may be unstable.

```
npm install tableau-react@beta
```

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
  hideTabs: false,
  // added interval support - an integer can be passed as milliseconds in the options object and refreshDataAsync() will refresh the data automatically on your preferred interval.
  // All other vizCreate options are supported here, too
  // They are listed here: https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record
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
    // Overwrite default query params
    // defaults to '?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
    query="?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes"
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


## Local Development of this package or updating.

  1. clone this repo.
  2. Do `npm install`.
  3. Make the changes, commit it and raise a PR.

  **Note:** If you don't have write access to the repo, you need to clone it and make changes there and raise a PR to the parent repo.
