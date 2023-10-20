import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
 
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context

  interface Session {
    user: {
      // The user's access type
      userType: string;
    } 
    & DefaultSession["user"]
    accessToken?: string
    
  }
  interface User {
    id: number;
    contact_information: { email: string }
    user_type: string;
    data: {
      email: string;
      userType: string;
      id: string;
    } & DefaultUser['user']
  }

  // interface Account {}

  // interface Profile {}
}

declare module "next-auth/jwt" {
    // Returned by the `jwt` callback and `getToken`, when using JWT sessions
    interface JWT {
      // OpenID ID Token
      customerId:   string
      idToken?:     string
      provider?:    string
      accessToken?: string
      userType:     string
    }
  }