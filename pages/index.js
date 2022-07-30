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