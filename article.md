# Full stack ZITADEL integration with Next.js 

[Next.js](https://nextjs.org) is a modern JavaScript website framework created and maintained by [Vercel](https://vercel.com). Next.js helps developers design [Single Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) with the capabilities of Static Site Generation (SSG) and Server-Side Rendering (SSR) and deploy it to different types of hosting providers including Vercel, Netlify, and Amazon Web Services (AWS).

Using Next.js lets you focus on getting your product in place, instead of setting up your development infrastructure. It comes with an out-of-the-box development toolkit and provides you with a development server to easily run code modifications in the browser, while you edit the codebase.

Next.js is a modern framework and it focuses on code optimization and performance optimization for better User Experience (UX) and Developer Experience (DX). This framework includes advanced features like code splitting and [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/).

In this tutorial, you'll learn how to set up a Next.js project using JavaScript. You'll also learn how to integrate that with [ZITADEL](https://github.com/zitadel/zitadel), an open-source identity management platform and security layer for your web application.

## What Is Next.js

Next.js is a hybrid web framework that lets you build statically generated pages and “hydrate” them with client-side JavaScript components built with [React](https://reactjs.org). Hydration is a process that turns SSG-generated pages into SPA pages. In a nutshell it takes static Document Object Model (DOM) from the HTML, and injects JavaScript code to be linked with the nodes inside the DOM, once the code is loaded, it mounts the DOM element and creates framework specific listeners. At the end of hydration, your code would act the same way as you’d create SPA in the first place. Statically generated pages are still reactive according to the Next.js’s documentation, and the framework hydrates your application on the client-side to give it full interactivity, on top of the static HTML.

Next.js also has a large open source community with a rapid release cycle backed by Vercel, as well as a wide ecosystem of a variety of plugins built for Node.js and React, where both are used to deliver a highly performant Next.js experience.

Next.js does even more by providing smooth client-side navigation using JavaScript routing, so the end result looks and works very fast in the users' browsers. At the same time, static content gives you the best performance when it comes to indexing your website in search engines like Google.

This framework can be used for all kinds of projects and applications including customer-facing marketing websites, landing pages, Software as a Service (SaaS) tools, a back office dashboard to aggregate and show some internal metrics, or a Content Management System (CMS).

The majority of these systems and applications built by developers interact with the user and let them perform certain actions within the application after they've been authenticated and authorized. That’s where [OAuth](https://en.wikipedia.org/wiki/OAuth) solutions like ZITADEL come in.

## Prerequisites

Before you begin this tutorial, you need to be comfortable designing both backend and frontend JavaScript applications. You also need to know the basic concepts behind [React.js](https://reactjs.org) and its syntax subset called [JSX](https://reactjs.org/docs/introducing-jsx.html).

It's also important that you have the most recent version of [Node.js](https://nodejs.org/en/) installed on your workstation as all the open-source packages in this tutorial are designed for a [Node.js](https://nodejs.org/en/) runtime environment. (At the time of writing, the current version of Node.js is 18.7.0.)

Make sure to install [*Next.js*](https://nextjs.org) – the SSG/SSR framework that connects all of the libraries together. It will be installed automatically in the net section using `npx create-next-app@latest`. If you want to install Next.js separately, you can use `npm install -g next`.

It's also helpful to have a basic understanding of the authentication and authorization concepts, ideally in the context of [OAuth](https://oauth.net). This knowledge will help you to navigate the authentication flow executed by Zitadel below.

## How to Build a simple Next.js Application with ZITADEL

If you'd like to follow along, all of the code for this tutorial can be found on this [GitHub repo](https://github.com/eugenehp/zitadel-next-app-js).

### Setting up a Next.js Project

To begin this tutorial, you need to focus on setting up the Next.js boilerplate using the official JavaScript template. In this tutorial, you will use [npm](https://www.npmjs.com), but you can also use other package managers like [yarn](https://yarnpkg.com) or [pnpm](https://pnpm.io).

Start by creating the application using `create-next-app`:

```shell
npx create-next-app@latest
```

![Add the name of your Next.js app](https://i.imgur.com/dCwBGam.png)

You'll be prompted to enter the name of the project. In this case, it's `zitadel-next-app-js`.

Once installed, you should see the following:

![Create-next-app finished its work](https://i.imgur.com/3oKTk9l.png)

After installing Next.js, you need to add the [next-auth](https://next-auth.js.org/) library using the following code:

```shell
npm install --save next-auth
```

Now it's time to run the app in the development mode:

```shell
npm run dev
```

Once you run it in development mode you should see this:

![Output of `npm run dev`](https://i.imgur.com/qgCM2T1.png​​)

To make sure that it works in the browser, navigate to [http://localhost:3000/](http://localhost:3000/):

![Next.js application running](https://i.imgur.com/wGyM7vc.png)

### Setting up ZITADEL

In order to use ZITADEL credential keys in the next section, you need to set up an account if you don't already have one. To do so, head to [https://zitadel.cloud](https://zitadel.cloud) and create a new account by following the steps outlined here:

1. Complete the signup form on [ZITADEL.cloud](https://zitadel.cloud):

![Sign up form on ZITADEL.cloud](https://i.imgur.com/raEHpOa.png)

ZITADEL organization has been created

![ZITADEL organization created](https://i.imgur.com/2MjHAwm.png)

2. Activate your user account, by clicking a link you’ve received in your email.

![Activate user account](https://i.imgur.com/wCDTwT2.png)

Your user has been activated 🎉

![User activated](https://i.imgur.com/DAoV3LS.png)

> **Please note:** You can skip multifactor set up for now, but you should activate it before going to production.

![Skip multifactor set up for now](https://i.imgur.com/eNcKjGl.png)

Here’s the view inside ZITADEL dashboard

![The view inside ZITADEL dashboard](https://i.imgur.com/IO5SOb8.png)

To create new instance click on `+New`:

![Creating new instance called `zitadel-instance`](https://i.imgur.com/M4oCkq9.png)

Confirm creation of a  new instance

![Confirming new instance](https://i.imgur.com/ejipzab.png)

New OICD instance has been created 🎉, you will use its configuration in the Next.js code.

![New instance has been created](https://i.imgur.com/NYXNuKw.png)

Click on **Go to my instance** so you can copy your instance's configuration:

![Overview of a newly created instance](https://i.imgur.com/5bhrJOV.png)

Now, grab the instance's domain name from a previous screenshot, it should have the following format: `https:/[your-domain]-[random-string].zitadel.cloud`. You will need this information to point your code to this domain in order to enable user authentication.

#### Creating Environment Variables

To create an environmental variable you need to create a `.env` file in the root directory, and add it to `.gitignore` so it won't be committed to your git repository (according to the [twelve-factor](https://12factor.net) philosophy).

Your `.env` file should look something like this:

```text
NEXTAUTH_URL=http://localhost:3000
ZITADEL_CLIENT_ID=[yourClientId]
ZITADEL_ISSUER=https:/[your-domain]-[random-string].zitadel.cloud
```

Here, `NEXTAUTH_URL` is the URL where the user will be redirected after authentication by ZITADEL. `ZITADEL_CLIENT_ID` is the client ID you can get from ZITADEL instance's interface (in the last screenshot the “Resource Id” was set to `172197259117592833`). `ZITADEL_ISSUER`is a URL structured like `https://zitadel-instance-w2iqk1.zitadel.cloud`.

### What Is the Proof Key for Code Exchange

### Implementing Authentication Flow using Next-Auth and ZITADEL

What is Proof Key for Code Exchange (PKCE)? PKCE is a security mechanism that is a part of the OAuth 2.x protocol for public clients and outlines a secure way of exchanging authorization codes between public clients. If you want to read more about PKCE and its importance, check out how the [Dropbox engineering solved it](https://dropbox.tech/developers/pkce--what-and-why-). They built a PKCE based flow to exchange authorization flow codes between public clients and their own infrastructure. The Dropbox engineering team implemented a secure exchange in accordance with OAuth flow. 

ZITADEL is a fully compliant OICD/PKCE solution that implements the entire flow using its infrastructure. On the Next.js side, both frontend and backend legs of OICD/PKCE flow are completed using `next-auth` library.

To implement your authentication flow, in your root directory go to `pages/api`, create an `auth` directory, and then create a file named `pages/api/auth/[...nextauth].js` with the following configuration of the `next-auth` [custom provider](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider):

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

Now Next.js will listen on `http://localhost:3000/api/auth/callback/<provider-name>` which is `http://localhost:3000/api/auth/callback/zitadel`. And this is critical, as the frontend part of Next.js framework will point to this callback, after talking to Zitadel’s instance (the one we created before).

It's recommended that you use the authentication code flow secured by PKCE for the authentication flow. To be able to connect to ZITADEL, navigate to your Console Projects, create or select an existing project, add your app selecting WEB, then PKCE, and then add `http://localhost:3000/api/auth/callback/zitadel` as a redirect URL to your app.

### Implementing OpenID Connect Flow on the Client Side

For the client side, go to `pages` and edit `pages/index.js` in your source code. 
![Find pages folder and select index.js file](https://i.imgur.com/oCx8kfP.png)

Then, add the following content to your `index.js` page:

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

To make `useSession()` work, you need to enhance `pages/_app.js` with the `SessionProvider`. This will act as a [React context provider](https://reactjs.org/docs/context.html) for the `useSession` hook.

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

And finally, let's create `pages/profile.js` with the content for the `http://localhost:3000/profile` page. In this page end-user will be able to see if they’ve successfully logged in using Zitadel’s instance.

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

At this point you've installed `next` and `next-auth` and you've created an `api`route called `auth/[...nextauth].js`. Then you created a `profile` page that requires authentication. After that you enhanced `_app.js` to inject `SessionProvider` into all Next.js pages, including `profile.js` and `index.js` pages. Inside the main page `index.js` you added conditional buttons to `Sign In` and `Sign out`.

Following is a model of how all the pieces work together:

![Next.js ZITADEL Architecture courtesy of Eugene Hauptmann](https://i.imgur.com/wyLs6uD.png)

*Following is a brief explanation of Zitadel's architecture:

First the user goes to [http://localhost:3000/](http://localhost:3000/) and next-auth redirects the user to [http://localhost:3000/api/auth/zitadel](http://localhost:3000/api/auth/zitadel). Then, an API route redirects to [https://zitadel-instance-w2iqk1.zitadel.cloud](https://zitadel-instance-w2iqk1.zitadel.cloud)

4. Authorize User using predefined Identity Providers in ZITADEL and then the user is redirected to [http://localhost:3000/api/auth/callback/zitadel](http://localhost:3000/api/auth/callback/zitadel)
Finally, the user is redirected back to [http://localhost:3000/](http://localhost:3000/) with the authorized next-auth session.

## Conclusion

In this tutorial you learned how to set up a Next.js project and integrate it with ZITADEL identity management. You used the [OICF](https://openid.net/connect/) flow as a part of [PKCE](https://oauth.net/2/pkce/) using standard [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636) implementation via open source library `next-auth` inside a Next.js full-stack project.

ZITADEL is an open-source identity management platform that provides you with a wide range of features like OpenID Connect, SAML2.0, OAuth2, FIDO2, OTP, and unlimited audit trail. With ZITADEL you can solve all of your authentication and authorization needs. Check out our repo and give us a [GitHub star](https://github.com/zitadel/zitadel), we appreciate the feedback.
