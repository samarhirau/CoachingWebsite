import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/mongoDb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }

        await connectDB()
        const user = await User.findOne({ email })
        if (!user) throw new Error("No user found with this email")

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error("Invalid password")

        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB()

      if (account?.provider === "google") {
        let existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            googleId: account.providerAccountId,
            role: "student",
          })
        }
      }
      return true
    },
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
  },

  pages: {
    signIn: "/login", // your login page route
  },

  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
