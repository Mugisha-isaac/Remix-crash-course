import {Outlet,LiveReload, Link, Links,Meta,useLoaderData} from 'remix';
import globalStylesUrl from '~/styles/global.css'
import {getUser} from '~/utils/session.server'


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

export const loader = async({request})=>{
  const user = await getUser(request)
  const data = {
    user
  }
  return data;
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
  const {user} = useLoaderData();
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
           {user ? (<li>
             <form action="/auth/logout" method='POST'>
               <button className='btn' type='submit'>
                 Logout {user.username}
               </button>wor
             </form>
           </li>): (<li>
             <Link to='/auth/login' className='posts'>Login</Link>
           </li>)}
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
