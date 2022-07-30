import NextAuth from "next-auth";

const profile = async (profile) => ({
  id: profile.sub,
  name: profile.name,
  firstName: profile.given_name,
  lastName: profile.family_name,
  email: profile.email,
  loginName: profile.preferred_username,
  image: profile.picture,
})

const wellKnown = process.env.ZITADEL_ISSUER
const clientId = process.env.ZITADEL_CLIENT_ID

export const ZITADEL = {
  id: "zitadel",
  name: "zitadel",
  type: "oauth",
  version: "2",
  wellKnown,
  authorization: {
    params: {
      scope: "openid email profile",
    },
  },
  idToken: true,
  checks: ["pkce", "state"],
  client: {
    token_endpoint_auth_method: "none",
  },
  profile,
  clientId
};

export default NextAuth({
  providers: [ZITADEL],
});