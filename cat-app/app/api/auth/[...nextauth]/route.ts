import prisma from "@/app/lib/prismadb";
import md5 from "md5";
import NextAuth from "next-auth";
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
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        });
        console.log(user)
        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        console.log(user.password)
        const isCorrectPassword = user.password === credentials.password // md5(credentials.password);

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };