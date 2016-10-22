import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import TableauReport from '../src/TableauReport';

const CONSTANTS = {
  VIZ_URL: 'http://tableau.my-server.com/views/my-workbook/my-sheet?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
};

describe('TableauReport', () => {
  describe('render()', () => {
    it('has container in ref', () => {
      expect(
        shallow(<TableauReport />).contains(<div ref="container" />)
      ).to.equal(true);
    });
  })

  describe('componentDidMount()', () => {
    it('calls initTableau()', () => {
      const spy = sinon.spy(TableauReport.prototype, 'initTableau');
      const wrapper = shallow(
        <TableauReport url={CONSTANTS.VIZ_URL} />
      , { lifecycleExperimental: true });

      sinon.assert.called(spy);
    });
  });
});
