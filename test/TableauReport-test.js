import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import TableauReport from '../src/TableauReport';
import Tableau from '../src/tableau-2.7.0';

const CONSTANTS = {
  VIZ_URL: 'http://tableau.my-server.com/views/my-workbook/my-sheet?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes'
};

/*=============================================================================
=    Mock Tableau API
=============================================================================*/
TableauReport.prototype.sheet = {
  applyFilterAsync: () => new Promise(function(resolve) { resolve(); })
}
TableauReport.prototype.workbook = {
  changeParameterValueAsync: () => new Promise(function(resolve) { resolve(); })
}

/*=============================================================================
=    TESTS
=============================================================================*/
describe('TableauReport', function() {

  beforeEach(() => {
    this.VizSpy = sinon.spy(Tableau, 'Viz');
  })

  afterEach(() => {
    Tableau.Viz.restore();
  })

  describe('render()', () => {
    it('has container in ref', () => {
      expect(
        shallow(<TableauReport url={CONSTANTS.VIZ_URL} />).contains(<div ref="container" />)
      ).to.equal(true);
    });
  })

  describe('componentDidMount()', () => {
    it('calls initTableau()', () => {
      const spy = sinon.spy(TableauReport.prototype, 'initTableau');
      const wrapper = mount(
        <TableauReport url={CONSTANTS.VIZ_URL} />
      );

      sinon.assert.called(spy);
    });
  });

  describe('Viz', () => {
    it('creates a viz on initial render', () => {
      const wrapper = mount(
        <TableauReport url={CONSTANTS.VIZ_URL} />
      );
      sinon.assert.called(this.VizSpy);
    });
  })

  describe('Changing Report', () => {
    it('should re-initialize the viz if the URL changes', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
        />
      );
      // simulate changing the url.
      wrapper.setProps({
        url: CONSTANTS.VIZ_URL + 'abc'
      });
      sinon.assert.calledTwice(this.VizSpy);
    });

    it('should not re-initialize the viz if url is the same', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
          filters={{ Gender: ['Male', 'Female'] }}
        />
      );
      // simulate changing the filters.
      wrapper.setProps({
        filters: { Gender: ['Male', 'Female', 'Alien'] }
      });
      sinon.assert.calledOnce(this.VizSpy);
    });
  })

  describe('Changing Filters', () => {
    it('should apply only changed filters via the Tableau JS API', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
          filters={{
            Gender: ['Male', 'Female']
          }}
        />
      );
      const instance = wrapper.instance();
      const spy = sinon.spy(instance.sheet, 'applyFilterAsync');
      // simulate changing the filters.
      // need to assign colors since identity will be used for equality check
      const colors = ['Blue', 'Red'];
      wrapper.setProps({
        filters: {
          Gender: ['Male', 'Female'],
          Color: colors
        }
      });
      // Only 'Color' filter should be changed
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 'Color', colors);
    });
  });

  describe('Changing Parameters', () => {
    it('should call applyParameters() if different', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
          parameters={{ A: 1, B: 2 }}
        />
      );
      const instance = wrapper.instance();
      const spy = sinon.spy(instance, 'applyParameters');
      // simulate changing the parameters.
      wrapper.setProps({
        parameters: { A: 1, B: 3 }
      });
      sinon.assert.calledOnce(spy);
    });

    it('should apply only changed parameters via the Tableau JS API', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
          parameters={{ A: 1, B: 2 }}
        />
      );
      const instance = wrapper.instance();
      const spy = sinon.spy(instance.workbook, 'changeParameterValueAsync');
      // simulate changing the parameters.
      wrapper.setProps({
        parameters: { A: 1, B: 3 }
      });
      // Only 'Color' filter should be changed
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 'B', 3);
    });
  })

  describe('Props', () => {
    it('sets default query', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
        />
      );
      const instance = wrapper.instance();
      const url = instance.getUrl();
      expect(url).to.equal('http://tableau.my-server.com/views/my-workbook/my-sheet?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes');
    })

    it('allows overriding query', () => {
      const wrapper = mount(
        <TableauReport
          url={CONSTANTS.VIZ_URL}
          query="?:embed=yes&:toolbar=no"
        />
      );
      const instance = wrapper.instance();
      const url = instance.getUrl();
      expect(url).to.equal('http://tableau.my-server.com/views/my-workbook/my-sheet?:embed=yes&:toolbar=no');
    })
  })
});
