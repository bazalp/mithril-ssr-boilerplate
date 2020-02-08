import m from '../common/m';
import Header from './Header';
import Footer from './Footer';

const Script = {
  view: (vnode) => {
    return (
      m('script', `window.preloadedState = ${vnode.attrs.stateman.getString()}`)
    );
  }
};

const LayoutClient = {
  view: (vnode) => {
    return [
      <Header/>,
      m(vnode.attrs.module.tag, { stateman: vnode.attrs.module.stateman }),
      <Footer/>
    ];
  }
};

const LayoutServer = {
  view: (vnode) => {
    return [
      m('!doctype[html]'),
      m('html', { lang: 'fr' }, [
        m('head', [
          <meta charset="utf-8"/>,
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>,
          <meta http-equiv="x-ua-compatible" content="ie=edge"/>,
          <meta name="description" content="description ici"/>,
          <title>{vnode.attrs.module.tag.data.title}</title>
        ]),
        m('body', [
          <div id="mainContent">
            <Header/>
            {m(vnode.attrs.module.tag, { stateman: vnode.attrs.module.stateman })}
            <Footer/>
          </div>,
          <Script stateman={vnode.attrs.module.stateman}/>,
          <script src="/js/app.js"/>
        ])
      ])
    ];
  }
};

export default process.browser ? LayoutClient : LayoutServer;
