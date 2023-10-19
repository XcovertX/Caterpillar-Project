import prisma from "@/app/lib/prismadb";
import md5 from "md5";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        console.log(credentials.email)
        console.log(credentials.password)
        const user = await prisma.customer.findFirst({
          where: {
            contact_information: {
              email: credentials.email
            }
          },
          include: {
            contact_information: true
          }
        });
        console.log(user)
        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        console.log(user.password)
        const isCorrectPassword = user?.password === credentials.password // md5(credentials.password);

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
        token.accessToken = account.access_token
      }
      if (user) {
        // token.customerId = user.id as number
        token.email = user.contact_information.email
      }
      return token
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string
      if(user) {
        
        session.user.email = user.contact_information.email
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