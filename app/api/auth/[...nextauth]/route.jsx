import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import User from '@/models/User';
import Payments from '@/models/Payments';
import connectDb from '@/db/connectDb';

// provides a list of all provides to be used in the website
export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    //takes my oauth key from env and puts it in the provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  //callback is basically nextauth pausing the authentication and running my custom code
  callbacks: {
    // runs every time the user tries to sign in
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == 'github') {
        //connect to database
        await connectDb();
        // check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          // if the user does not exist, create a new user in the database
          const newUser = await User.create({
            email: user.email,
            username: user.email.split('@')[0],
          });
        }
        return true;
      }
    },
    //sessions provides a temperory id allowing user to browser the website without signin in again
    async session({ session, user, token }) {
      //checks connection to the database if the signIn functions cached connection is lost then reconnects to the DB
      await connectDb();
      //it takes the email the user has in their session and looks for users custom username then attaches that to the session as well then the session continues
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
