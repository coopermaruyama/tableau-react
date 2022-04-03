import Viz from '../src/index';
const VIZ_URL = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';
const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <div>
    <Viz url={VIZ_URL} />
  </div>
)