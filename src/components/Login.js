import { useEffect, useRef, useState } from "react";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { auth } from "../firebase";
import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const emailVerifyRequest =
    "an email has been sent to your email address. Confirm that email to continue...";
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (authUser.emailVerified) {
          dispatch(
            login({
              id: authUser.uid,
              name: authUser.displayName,
              email: authUser.email,
              photo: authUser.photoURL,
            })
          );
        }
      }
    });
    return () => {
      unSubscribe();
    };
  });

  const swipeAuthentication = (show) => {
    if (show === "register") {
      setShowLogin(false);
      setShowRegister(true);
    } else if (show === "login") {
      setShowLogin(true);
      setShowRegister(false);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    await auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .catch((error) => alert(error.message));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );

      await result.user.updateProfile({
        displayName: userNameRef.current.value,
      });

      await result.user
        .sendEmailVerification()
        .then(() => alert(emailVerifyRequest))
        .catch((err) => alert(err.message));
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 flex flex-col items-center justify-center">
      {/* main login component */}
      <div className="flex flex-col space-y-2 w-[22rem]">
        {/* main login box */}
        <div className="border flex flex-col items-center bg-white">
          <img
            className="h-[8rem] "
            src="/images/instagram.svg"
            alt="instagram"
            loading="lazy"
          />
          <form
            className="px-10 py-4 w-full flex flex-col -mt-6"
            onSubmit={showLogin ? handleLogIn : handleRegister}
          >
            <input
              required
              type="email"
              ref={emailRef}
              className="login__input mb-2"
              placeholder="Email"
            />
            {showRegister && (
              <input
                required
                type="text"
                ref={userNameRef}
                className="login__input mb-2"
                placeholder="Username"
              />
            )}
            <input
              required
              type="password"
              ref={passwordRef}
              className="login__input mb-4"
              placeholder="Password"
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 tracking-wide transform active:scale-[0.98] focus:outline-none text-white p-2 rounded-sm font-medium"
              type="submit"
            >
              {showLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
          <div className="relative pt-2 py-6 w-[17rem]">
            <div className="bg-gray-300 w-full  h-[1px]" />
            <p className="px-4 text-sm text-gray-400 font-medium  bg-white absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-80%]">
              OR
            </p>
          </div>
          <div className="cursor-pointer flex space-x-2 text-blue-900 font-medium items-center pt-2 pb-8">
            <RiFacebookBoxFill className="text-2xl" />
            <p>Log in with Facebook</p>
          </div>
        </div>
        {/* login/signup swap box */}
        <div className="border flex flex-col items-center bg-white py-5">
          <p className="text-sm tracking-wide">
            {showLogin
              ? `Don't have an account?${" "}`
              : `Allready have an account?${" "}`}

            <span
              onClick={
                showLogin
                  ? () => swipeAuthentication("register")
                  : () => swipeAuthentication("login")
              }
              className="text-blue-500 font-medium cursor-pointer"
            >
              {showLogin ? "Sign up" : "Log In"}
            </span>
          </p>
        </div>
        <p className="text-sm text-center py-4">Get the app.</p>
        {/* store images */}
        <div className="flex items-center space-x-4 mx-auto">
          <div className="download__app">
            <img
              alt="image"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          <div className="download__app">
            <img
              alt="image"
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* login footer */}
      <div className="mt-14 flex justify-center items-center space-x-4 flex-wrap text-gray-400 text-xs">
        <p className="pt-2">About</p>
        <p className="pt-2">Blog</p>
        <p className="pt-2">Jobs</p>
        <p className="pt-2">Help</p>
        <p className="pt-2">API</p>
        <p className="pt-2">Privacy</p>
        <p className="pt-2">Terms</p>
        <p className="pt-2">Top Accounts</p>
        <p className="pt-2">Hashtags</p>
        <p className="pt-2">Locations</p>
      </div>
      <div className="flex space-x-6 items-center text-xs text-gray-400 mt-6">
        <p className="flex items-center space-x-2">
          <span>English </span>
          <span>
            <FaAngleDown className="mt-1" />
          </span>
        </p>
        <p>&copy; 2021 Instagram from Facebook</p>
      </div>
    </div>
  );
};

export default Login;
