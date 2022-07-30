# Full stack ZITADEL integration with NextJS (JS)

## Introduction

[Next.js](https://nextjs.org) is a modern JavaScript website framework created and maintained by Vercel. it  is modern because instead of letting developers build one type of a website, it lets developers design Single Page Application ([SPA](https://en.wikipedia.org/wiki/Single-page_application)) with the capabilities of Static Site Generation (SSG) and Server-Side Rendering (SSR) and deploy it to different types of hosting providers, including Vercel, Netlify, Amazon Web Services, and so on.

Using Next.js will let you focus on your product in place, instead of setting up development infrastructure, because Next.js already comes with the development toolkit out of the box and provides you with a development server to easily run code modifications in the browser, while you edit the codebase.

Next.js is a modern framework, so it focuses on code optimization and performance optimization for better User Experience (UX) and Developer Experience (DX). This includes some advanced features like code splitting, Hot Module Replacement ([HMR](https://webpack.js.org/concepts/hot-module-replacement/)), among others.

Next.js has a large open source community with a rapid release cycle backed by Vercel, as well as a wide ecosystem of a variety of plugins built for Node.js and React, where both are used to deliver a highly performant Next.js experience.

In this tutorial, you will learn how to set up a Next.js project using JavaScript and integrate with [ZITADEL Identity management](https://github.com/zitadel/zitadel), an open-source version of Auth0, and a security layer for your web application.

## What is Next.js

Next.js is a hybrid web framework that allows building statically generated pages and “hydrate” them with client-side JavaScript components built with [React](https://reactjs.org), effectively turning SSG-generated pages into Single Page Application ([SPA](https://en.wikipedia.org/wiki/Single-page_application)) pages.

Next.js takes it to the next level by providing smooth client-side navigation using JavaScript routing, so the end result looks and works very fast in the users’ browsers. At the same time, static content gives you the best performance when it comes to indexing your website in the search engines like Google.

Usually this framework is used for all kinds of projects and applications, it can be a customer-facing marketing website, a landing page, a Software as a Service (SaaS) tool, a back office dashboard to aggregate and show some internal metrics, or a Content Management System (CMS), the list goes on.

And the majority of them interact with the users and let them perform certain actions within the application after they are authenticated and authorized. That’s where [OAuth](https://en.wikipedia.org/wiki/OAuth) solutions like ZITADEL come in.

## Prerequisites

*JavaScript* – you need to be comfortable designing both backend and frontend JavaScript applications.

*Node.js* – all the open-source packages in this tutorial are designed for the [node.js](https://nodejs.org/en/) runtime environment.  Make sure you have the most recent one installed on your workstation.

*React.js* – you need to know the basic concepts behind [React.js](https://reactjs.org) and its syntax subset called [*JSX*](https://reactjs.org/docs/introducing-jsx.html).

[*Next.js*](https://nextjs.org) – the SSG/SSR framework that connects all of the libraries together.

Basic understanding of the *authentication* and *authorization* concepts, ideally in the context of [OAuth](https://oauth.net).

## How to Build a simple Next.js Application with ZITADEL

### Setting up Next.js Project

In this tutorial, we will focus on setting up the Next.js boilerplate using the official javascript template provided by them. We will use the `npm` tool, but you can also use other package managers like `yarn` or `pnpm`.

Let’s start by creating the application using `create-next-app`:

```shell
npx create-next-app@latest
```

![Add the  name of your next.js app](https://i.imgur.com/dCwBGam.png)
It will ask you to enter the name of the project, in this case, I’ve added `zitadel-next-app-js`.

Once it’s installed you should be able to see:

![create-next-app finished its work](https://i.imgur.com/3oKTk9l.png)

After next.js was install, let’s add [next-auth](https://next-auth.js.org/) library using:

```shell
npm install --save next-auth
```

Now, let’s run our app in the development mode:

```shell
npm run dev
```

You should be able to see this in your terminal:
![Output of `npm run dev`](https://i.imgur.com/qgCM2T1.png​​)

And check that it works in the browser too, navigate to [http://localhost:3000/](http://localhost:3000/)

![Next.js application running](https://i.imgur.com/wGyM7vc.png)

### Setting up ZITADEL

Let’s continue and set up a new account on ZITADEL, so we can use credential keys in the next sections.

Head to [https://zitadel.cloud](https://zitadel.cloud) and create a new account:

1. Sign up form on zitadel.cloud
    ![Sign up form on zitadel.cloud](https://i.imgur.com/raEHpOa.png)

2. ZITADEL organization has been created
    ![ZITADEL organization has been created](https://i.imgur.com/2MjHAwm.png)

3. Activate the user account
    ![Activate user account](https://i.imgur.com/wCDTwT2.png)

4. User activated
    ![User activated](https://i.imgur.com/DAoV3LS.png)

5. ⚠️ Skip multifactor set up for now, but activate it before going to **production**!
    ![Skip multifactor set up for now, but activate it before going to production!](https://i.imgur.com/eNcKjGl.png)

6. The view inside ZITADEL dashboard
    ![The view inside ZITADEL dashboard](https://i.imgur.com/IO5SOb8.png)

7. Click on `+New` and create a new instance:
    ![Creating new instance called `zitadel-instance`](https://i.imgur.com/M4oCkq9.png)

8. Confirming new instance
    ![Confirming new instance](https://i.imgur.com/ejipzab.png)

9. New instance has been created
    ![New instance has been created](https://i.imgur.com/NYXNuKw.png)

10. Click on `go to my instance`
    ![Overview of a newly created instance](https://i.imgur.com/5bhrJOV.png)

Now grab the instance's domain name from a previous screenshot, it should have this format `https:/[your-domain]-[random-string].zitadel.cloud` and in my example, it is `https://zitadel-instance-w2iqk1.zitadel.cloud`.

#### Creating environment variables

Create `.env` file in the root directory, and add it to `.gitignore` so it won't be committed to your git repository, according to the [twelve-factor](https://12factor.net) philosophy.

Your `.env` file should look something like this:

```text
NEXTAUTH_URL=http://localhost:3000
ZITADEL_CLIENT_ID=[yourClientId]
ZITADEL_ISSUER=https:/[your-domain]-[random-string].zitadel.cloud
```

Let's go line by line:

* `NEXTAUTH_URL` – is the URL where the user will be redirected after authentication by ZITADEL.
* `ZITADEL_CLIENT_ID` – client id you can get from ZITADEL instance's interface, in the last screenshot it was set to `172197259117592833`.
* `ZITADEL_ISSUER` – as already mentioned above, it's an url structured like `https://zitadel-instance-w2iqk1.zitadel.cloud`.

### What is the Proof Key for Code Exchange

Proof Key for Code Exchange (PKCE) is a security mechanism that is a part of the OAuth 2.x protocol for public clients that outlines a secure way of exchanging authorization codes between public clients. If you want to read more about PKCE and its importance, check out how the Dropbox engineering team is using it [here](https://dropbox.tech/developers/pkce--what-and-why-)

![Dropbox's take on explaining PKCE flow](https://i.imgur.com/IDq2FVg.png)

ZITADEL is a fully compliant OICD/PKCE solution that implements the entire flow using its infrastructure. On the Next.js side, both frontend and backend legs of OICD/PKCE flow are completed using `next-auth` library.

### Implementing Authentication Flow using Next-Auth and ZITADEL provider

Go to `pages/api` and create `auth` directory and create a file `pages/api/auth/[...nextauth].js` with the following configuration of the `next-auth` [Custom Provider](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider):

```javascript
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
```

Now Next.js will listen on `http://localhost:3000/api/auth/callback/<provider-name>` which is `http://localhost:3000/api/auth/callback/zitadel`

I recommend using the Authentication Code flow secured by PKCE for the Authentication flow. To be able to connect to ZITADEL, navigate to your Console Projects, create or select an existing project and add your app selecting WEB, then PKCE, and then add `http://localhost:3000/api/auth/callback/zitadel` as a redirect URL to your app.

### Implementing OpenID Connect Flow on the Client Side

For the client side, let's head to `pages` and edit `pages/index.js`.
Add the following content to your `index.js` page:

```javascript
import { signIn, signOut, useSession } from "next-auth/react"

const callbackUrl = 'http://localhost:3000/profile'

export default function Page() {
  const { data: session } = useSession();

 return <div>
  {!session && <>
    Not signed in <br />
    <button onClick={() => signIn('zitadel', { callbackUrl })}>
      Sign in
    </button>
  </>}
  {session && <>
    Signed in as {session.user.email} <br />
    <button onClick={() => signOut()}>Sign out</button>
  </>}
 </div>
}
```

Now to make `useSession` work, we will need to enhance `pages/_app.js` with the `SessionProvider`. It will act as a [React Context Provider](https://reactjs.org/docs/context.html) for the `useSession` hook.

```javascript
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }) {
return (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
);
}

export default App;
```

And finally, let's create `pages/profile.js` with the content for the `http://localhost:3000/profile` page:

```javascript
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Profile() {
  return (
    <div className={styles.container}>
      <h1>Login successful</h1>
      <Link href="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}
```

### Getting Everything Together

Great job, you made it so far! Let's recap what you've done so far.

1. You installed `next` and `next-auth`.

2. You created `api` route called `auth/[...nextauth].js`

3. You created `profile` page that requires authentication.

4. You enhanced `_app.js` to inject `SessionProvider` into all Next.js pages, including `profile.js` and `index.js` pages.

5. Inside the main page `index.js` you added conditional buttons to `Sign In` and `Sign out`.

**Here's a model of how all pieces you added work together:**

![Next.js ZITADEL Architecture](https://i.imgur.com/wyLs6uD.png)

**Here's a detailed description:**

1. User goes to [http://localhost:3000/](http://localhost:3000/)

2. next-auth redirects to [http://localhost:3000/api/auth/zitadel](http://localhost:3000/api/auth/zitadel)

3. API route redirects to [https://zitadel-instance-w2iqk1.zitadel.cloud](https://zitadel-instance-w2iqk1.zitadel.cloud)

4. Authorize User using predefined Identity Providers in ZITADEL

5. Redirect to [http://localhost:3000/api/auth/callback/zitadel](http://localhost:3000/api/auth/callback/zitadel)

6. Redirect back to [http://localhost:3000/](http://localhost:3000/) with the authorized next-auth session

## Conclusion

Congratulations, you did it!

In this tutorial you have learned how to set up a Next.js project and integrate it with ZITADEL Identity management, using [OICF](https://openid.net/connect/) flow as a part of [PKCE](https://oauth.net/2/pkce/) using standard [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636) implementation via open source library `next-auth` inside Next.js full-stack project.

ZITADEL is OpenID-certified open-source implementation of a group of security features like secure login, self-service, [OpenID Connect](https://github.com/zitadel/oidc), [OAuth2.x](https://oauth.net/2/v), [SAML2](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html), branding, Passwordless with [FIDO2](https://fidoalliance.org/fido2/), [OTP](https://en.wikipedia.org/wiki/One-time_password), [U2F](https://en.wikipedia.org/wiki/Universal_2nd_Factor), and an [unlimited audit trail](https://github.com/zitadel/zitadel) to improve the life of developers.

Fantastic, now go build something cool with **ZITADEL**!
