import { useRouter } from "next/router";

function CheckMailbox() {
  const router = useRouter();
  const email = router.query.e && decodeURIComponent(router.query.e.toString());
  const code = router.query.c && decodeURIComponent(router.query.c.toString());

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="Quickly-Brief-Logo-Black.png"
            alt="Quickly Brief"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check your mailbox!
          </h2>
          <p className="mt-6 text-center">
            We've sent you a magic link to {email ? email : "your email"}.
          </p>
          <p className="mt-6 text-center">
            Click on the link to finish signing in.
          </p>
          {code && (
            <p className="mt-6 text-center">
              Make sure the verification code matches {code}!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckMailbox;
