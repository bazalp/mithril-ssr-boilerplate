import m from 'mithril';
import Header from './Header';
import Footer from './Footer';
import Script from './Script';

declare global {
  interface Window {
    preloadedState: object;
  }
}

// interface Ici {
//   (test: string): JSX.Element;
// }

interface One {
  module: any;
}

export interface Test {
  module: {
    stateman: object;
    // tag: Ici;
    tag: (() => m.Vnode) & {
      title?: string;
    };
  };
}

function mainContent(vnode: m.CVnode<Test>): any {
  console.log('layout : ', vnode.attrs.stateman?.state.contact ? ' Le state EST chargé ' : ' Le state PAS chargé ')
  return (
    <>
      <Header />
      {vnode.children}
      <Footer />
    </>
  );
}

export default class Layout implements m.ClassComponent<Test> {
  view(vnode: m.CVnode<Test>): any {
    return process.env.BROWSER_ENV ? (
      // Layout Client
      mainContent(vnode)
    ) : (
      // Layout Server
      <>
        {m('!doctype[html]')}
        <html lang="fr">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="description ici" />
            {/*<title>{vnode.attrs.module.tag.title}</title>*/}
          </head>
          <body>
            <div id="mainContent">
              {mainContent(vnode)}
            </div>
            <Script stateman={vnode.attrs.stateman} />
            <script src="/js/apps.js" />
          </body>
        </html>
      </>
    );
  }
}
