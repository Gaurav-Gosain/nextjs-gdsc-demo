import { Button, CircularProgress } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../components/Auth/firebaseAuth";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/future/image";

export default function Login() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const LoginButton = () => {
    if (loading) return <CircularProgress className="text-6xl" />;
    if (error) return <div>{error.message}</div>;
    if (user === undefined)
      return (
        <Button
          variant="contained"
          color="primary"
          className="text-lg md:text-2xl font-bold p-4 rounded-3xl"
          startIcon={<GoogleIcon className="text-4xl mr-3" />}
          onClick={() => {
            signInWithGoogle();
          }}>
          Sign In With Google
        </Button>
      );
  };

  return (
    <section className="h-screen">
      <div className="h-full px-6 text-gray-800">
        <div className="flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-between g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
            <img src="/login.svg" className="w-full" alt="Login Image" />
          </div>
          <div className="items-center flex flex-col-reverse gap-14 mb-12 md:flex-col xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12">
            <div className="flex flex-col gap-2 spac items-center text-md md:text-4xl font-semibold text-[#656c73]">
              <img src="/GDSC_logo.png" className="w-full" alt="Login Image" />
              Heriot-Watt University
            </div>
            <LoginButton />
          </div>
        </div>
      </div>
    </section>
  );
}
