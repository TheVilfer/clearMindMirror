import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto";

const generateUUID = (email) => {
    const emailBuffer = Buffer.from(email);
    const emailHash = crypto
        .createHash("sha256")
        .update(emailBuffer)
        .digest("hex");
    return emailHash;
};


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session(session, user) {
            session.session.uuid = generateUUID(session.session.user.email);
            console.log(session.session);
            return session.session;
        },

    }
}

export default NextAuth(authOptions)