import bcrypt from 'bcrypt'
import { db } from './db.server'
import { createCookieSessionStorage, redirect } from 'remix'


// Login user

export async function login({ username, password }) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return null

  // Check password
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) return null

  return user
}

// const sessionSecret = process.env.SESSION_SECRET;

const sessionSecret ="secret";

if(!sessionSecret) throw new Error('No Session Secret');

const storage = createCookieSessionStorage({
  cookie:{
    name:'remix_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite:'lax',
    path:'/',
    maxAge: 3600 * 24 * 60,
    httpOnly:true
  }
})


export async function createUsersSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

// getting user session

export const getUserSession = (request:Request)=>{
    return storage.getSession(request.headers.get('Cookie'))
}

// getting the loggedin user

export const getUser = async(request:Request)=>{
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if(!userId || typeof userId !=='string'){
    return null;
  }
  try{
    const user = await db.user.findUnique({
        where: {id:userId}
      });
      return user;
  }
  catch(error){
    console.log(error);
    return null;
  }
}


// logging out the user and destroying the session

export const logout = async(request:Request)=>{
   const session = await storage.getSession(request.headers.get('Cookie'));
   return redirect('/auth/logout',{
     headers:{
       'Set-Cookie': await storage.destroySession(session),
     }
   })
}

