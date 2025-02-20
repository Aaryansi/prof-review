import { useEffect } from "react";
import Script from "next/script";
import Layout from "../components/layout";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/rosefire.min.js";  // Path to manually added script
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;