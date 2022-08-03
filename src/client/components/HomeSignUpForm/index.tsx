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
      className="sm:max-w-xl sm:mx-auto lg:mx-0"
    >
      <div className="sm:flex">
        <div className="min-w-0 flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
          />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <button
            type="submit"
            className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
          >
            Start free trial
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-300 sm:mt-4">
        Start your free 14-day trial, no credit card necessary. By providing
        your email, you agree to our{" "}
        <a href="#" className="font-medium text-white">
          terms of service
        </a>
        .
      </p>
    </form>
  );
}
