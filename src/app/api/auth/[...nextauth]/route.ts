import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials: any): Promise<any> {
				try {
					const user = await axios({
						method: "post",
						data: JSON.stringify({
							username: credentials.username,
							password: credentials.password,
						}),
						headers: {
							"Content-Type": "application/json",
						},
						url: `${process.env.BACKEND_URL}/auth/login`,
					});

					if (!user.data.username) return null;

					return { name: user.data.username, email: user.data.role };
				} catch (error) {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 15 * 24 * 60 * 60,
	},
	jwt: {
		maxAge: 15 * 24 * 60 * 60,
	},
	pages: {
		error: "/error",
		signIn: "/",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
		async redirect({ url, baseUrl }) {
			return url;
		},
	},
});

export { handler as GET, handler as POST };
