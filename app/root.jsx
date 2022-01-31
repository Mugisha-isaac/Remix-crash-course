import {Outlet,LiveReload} from 'remix';

export default function App(){
  return <html lang='en'>
    <head>
      <title>Remix | Blog | Development | By MUGISHA ISAAC</title>
    </head>
    <body>
      hello1
      <Outlet />
      {process.env.NODE_ENV === 'development' ? <LiveReload />: null}
    </body>
  </html>
}