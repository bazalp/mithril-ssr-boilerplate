import m from '../lib/m';
import Layout from './components/Layout';
import routes from './common/routes';
import stateManager from './common/stateman';

declare global {
  interface Window {
    preloadedState: object
  }
}

let sharedState = window.preloadedState || {};
const stateman = Object.create(stateManager);
stateman.init(sharedState);

const clientRoutes = {};

let attrs = { stateman };
Object.keys(routes).forEach((route:string) => {
  clientRoutes[route] = {

    onmatch: () => {
      return routes[route].module().then((resp) => {
        return resp;
      });
    },

    render: (vnode) => {
      Object.assign(vnode.attrs, attrs);
      document.title = vnode.tag.data.title;
      return m(Layout, { module: { tag: vnode.tag, stateman: vnode.attrs.stateman } });
    }
  };
});

m.route(document.getElementById('mainContent'), '/', clientRoutes);