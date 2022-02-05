import bcrypt from 'bcrypt'
import { db } from './db.server'
import { createCookieSessionStorage, redirect } from 'remix'


// Login user

export async function Login({ username, password }) {
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
