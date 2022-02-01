import {Outlet,LiveReload, Link, Links,Meta} from 'remix';
import globalStylesUrl from '~/styles/global.css'


export const links = ()=>[{
  rel:'stylesheet',
  href:globalStylesUrl
}]

export const meta = ()=>{
  const desccription ='A Cool Blog Built With Remix';
  const keywords = 'remix,react,javascript'

  return{
    desccription,
    keywords
  }
}

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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <Meta />
      <title> {title ? title : 'Remix | Blog | Development | By MUGISHA ISAAC'} </title>
     <Links />
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

export function ErrorBoundary({error}){
  console.log(error)
  return(
      <Document>
        <Layout>
        <h1>Error</h1>
          <p>{error.message}</p>
        </Layout>
      </Document>
  )
}
