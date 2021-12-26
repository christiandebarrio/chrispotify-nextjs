import NextAuth, { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyApi, SPOTIFY_LOGIN_URL } from "../../../lib/spotify";

interface MyJWT extends JWT {
  username: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}

const jwtCallback = async ({
  token,
  account,
  user,
}: {
  token: MyJWT;
  account: Account;
  user: User;
}) => {
  //   initial sign in
  if (account && user) {
    return {
      ...token,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      username: account.providerAccountId,
      accessTokenExpires: account.expires_at && account.expires_at * 1000,
    };
  }

  //   return the previous token if the access token has not expired yet
  if (Date.now() < (token.accessTokenExpires ?? 0)) {
    return token;
  }

  //   Access token has expird, so we need to refresh it...
  console.log("Access token has expired, refreshing...");
  return await refreshAccessToken(token);
};

const refreshAccessToken = async (token: MyJWT): Promise<MyJWT> => {
  try {
    spotifyApi.setAccessToken(token.accessToken ?? "undefined");
    spotifyApi.setRefreshToken(token.refreshToken ?? "undefined");

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed toke is.", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: MyJWT;
}) => {
  const mySession = {
    ...session,
    user: {
      ...session.user,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      username: token.username,
    },
  };
  return mySession;
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "undefined",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "undefined",
      authorization: SPOTIFY_LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: { signIn: "/login" },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
});
