import ReactDOM from 'react-dom';
import './index.css';

// import registerServiceWorker from './registerServiceWorker';
import { makeRoutes } from './routes';

const routes = makeRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
// registerServiceWorker();