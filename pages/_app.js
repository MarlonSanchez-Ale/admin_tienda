import '@/styles/globals.css'

import { ThemeProvider } from "@material-tailwind/react";
import MenuSideBar from '@/app/components/templates/MenuSideBar/MenuSideBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../app/services/user.service';
import getConfig from "next/config";
import ToastTP from '@/app/components/elements/Toast/Toast';

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // El estado showMainLayout se usa para mostrar el Sidebar y el Title
  const [showMainLayout, setShowMainLayout] = useState(true);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login'];
    const path = url.split('?')[0];

    setShowMainLayout(path != "/login");

    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (

    <>
      {showMainLayout && (
        <MenuSideBar mainPage={
          <main>
            <ToastTP />
            <Component {...pageProps} />
          </main>

        } />
      )}

      {!showMainLayout && (
        <>
          <main>
            <ToastTP />
            {authorized && (
              <>
                <Component {...pageProps} />
              </>
            )}
          </main>
        </>
      )}
    </>
  )
}

