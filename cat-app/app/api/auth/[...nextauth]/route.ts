import prisma from "@/app/lib/prismadb";
import md5 from "md5";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// Authentication handler using NextAuth
export const handler = NextAuth({
  providers: [
    // Use the "credentials" provider for email and password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        try{
          
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials');
          }
          let customer, admin, isCorrectPassword;
          
          // attempt to locate customer account with the provided email
          customer = await prisma.customer.findFirst({
            where: {
              email: credentials.email
            }
          });

           // If no customer is found, attempt to locate 
           // an admin account with the email
          if (!customer) {
            admin = await prisma.admin.findFirst({
              where: {
                email: credentials.email
              },
            });
          }

          // if customer account is found, check the password then return customer
          if (customer) {
            isCorrectPassword = customer?.password === credentials.password //md5(credentials.password);
            if (!isCorrectPassword) {
              throw new Error('Invalid credentials');
            }
            await prisma.$disconnect();
            return customer;

            // if admin account is found, check the password then return admin
          }
          if (admin) {
            isCorrectPassword = admin?.password === credentials.password //md5(credentials.password);
            if (!isCorrectPassword) {
              throw new Error('Invalid credentials');
            }
            await prisma.$disconnect();
            return admin;
          }
          if (!customer && !admin) {
            throw new Error('Invalid credentials');
          }
        } catch(error) {
          console.error(error)
          await prisma.$disconnect();
          return null;
        }
      }
    })
  ],
  callbacks: {
    // the jwt callback allows useful data to be extracted
    // from the JSON web token, used for authentication purposes
    async jwt({ token, account, user }) {
      if (account) {
        token.id_token    = account.id_token
        token.provider    = account.provider
        token.accessToken = account.access_token
      }
      if (user) {
        token.customerId  = user.id.toString()
        token.email       = user.email
        token.userType    = user.user_type
      }
      return token
    },

    // Session callback extracts useful data 
    // from the JSON web token for authentication purposes
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string
      
      if(user) {
        session.user.userType = token.userType
        session.user.email = user.email
      }
  
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };