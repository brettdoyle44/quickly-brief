import { useRouter } from "next/router";
import { useState } from "react";

/**
 * Used on the Login and Sign Up screens to handle authentication. Can be shared between those as Passport.js doesn't differentiate between logging in and signing up.
 */
export default function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { r } = router.query;
  const redirect = r?.toString();

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        // POST a request with the users email or phone number to the server
        fetch(`/api/auth/magiclink`, {
          method: `POST`,
          body: JSON.stringify({
            redirect,
            destination: email,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.success) {
              // Add the email and security code to the query params so we can show them on the /check-mailbox page
              router.push(
                `/check-mailbox?e=${encodeURIComponent(email)}&c=${json.code}`
              );
            }
          });
      }}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {" "}
          Email address{" "}
        </label>
        <div className="mt-1">
          <input
            type="email"
            placeholder="me@hello.com"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
      >
        Let's go!
      </button>
    </form>
  );
}
