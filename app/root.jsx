import {Outlet,LiveReload, Link} from 'remix';
import globalStylesUrl from '~/styles/global.css'

export default function App(){
  return (
       <Document>
         <Layout>
         <Outlet/>
         </Layout>
       </Document>
  )
}

function Document({children, title}){
      return(
        <html lang='en'>
    <head>
      <title> {title ? title : 'Remix | Blog | Development | By MUGISHA ISAAC'} </title>
      <link rel="stylesheet" href={globalStylesUrl} />
    </head>
    <body>
      {children}
      {process.env.NODE_ENV === 'development' ? <LiveReload />: null}
    </body>
  </html>
      )
}


function Layout({children}){
    return(
      <>
       <nav className="navbar">
         <Link to='/' className='logo'>
           Remix
         </Link>
         <ul className="nav">
           <li>
             <Link to='/posts' className='posts'>Posts</Link>
           </li>
         </ul>
       </nav>
       <div className="container">
         {children}
       </div>
      </>
    )
}