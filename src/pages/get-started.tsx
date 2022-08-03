import AuthenticationForm from "../client/components/AuthenticationForm";

function Signup() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="Quickly-Brief-Logo-Black.png"
              alt="Quickly Brief"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up for an account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <AuthenticationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
