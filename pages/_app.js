import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../components/Auth/firebaseAuth";
import MyAppBar from "../components/MyAppBar";
import MyBottomNavBar from "../components/MyBottomNavBar";
import Paper from "@mui/material/Paper";
import { AnimatePresence } from "framer-motion";

//? Firestore and react-firebase-hooks imports we will use
import { collection, doc, orderBy, query, setDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const posts = [];

  const protectedRoutes = ["/", "/login"];

  useEffect(() => {
    if (protectedRoutes.includes(router.pathname)) {
      if (user === null) {
        router.push("/login");
      } else if (user) {
        console.log(user);
        const userRef = doc(db, "users", user.uid);
        setDoc(
          userRef,
          {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          },
          { merge: true }
        ).then(() => {
          router.push("/");
        });
      }
    }
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      {router.route !== "/login" && <MyAppBar user={user} />}
      <AnimatePresence initial={false}>
        <Component {...pageProps} user={user} posts={posts} />
      </AnimatePresence>
      {router.route !== "/login" && (
        <>
          <div className="h-[3.5rem]"></div>
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={20}>
            <MyBottomNavBar pathname={router.pathname} />
          </Paper>
        </>
      )}
    </StyledEngineProvider>
  );
}

export default MyApp;
