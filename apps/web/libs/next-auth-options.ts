import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { status, data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, 
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );

    if (status !== 200) {
      throw data;
    }

    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + 30 * 60 * 1000, // 30 minutes
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          // Call your NestJS API
          const { status, data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, 
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          if (status !== 200) {
            throw new Error(data.message || 'Login failed');
          }

          // Get user profile
          const { data: profile } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/profile`, 
            {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            }
          );

          return {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            accessTokenExpires: Date.now() + 30 * 60 * 1000, // 30 minutes
          };
        } catch (error: any) {
          throw new Error(error.message || 'Login failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      console.log('Access token expired, refreshing...');
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.id = token.sub!;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };