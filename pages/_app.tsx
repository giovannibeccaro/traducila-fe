import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { store } from "../store/store";
import "../styles/index.scss";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <NextNProgress
          transformCSS={(css) => {
            console.log(css);
            return (
              <style>{`#nprogress {
              pointer-events: none;
            }
            #nprogress .bar {
              background: hsl(338, 58%, 52%);
              position: fixed;
              z-index: 9999;
              top: 0;
              left: 0;
              width: 100%;
              height: 0.5rem;
            }
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              box-shadow: 0 0 10px hsl(338, 58%, 52%), 0 0 5px hsl(338, 58%, 52%);
              opacity: 1;
              -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
            }
            #nprogress .spinner {
              display: block;
              position: fixed;
              z-index: 1031;
              top: .85rem;
              left: 50%;
              transform: translateX(-50%)
            }
            #nprogress .spinner-icon {
              width: 18px;
              height: 18px;
              box-sizing: border-box;
              border: solid 3px transparent;
              border-top-color: hsl(338, 58%, 52%);
              border-left-color: hsl(338, 58%, 52%);
              border-radius: 50%;
              -webkit-animation: nprogresss-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
            }
            .nprogress-custom-parent {
              overflow: hidden;
              position: relative;
            }
            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
              position: absolute;
            }
            @-webkit-keyframes nprogress-spinner {
              0% {
                -webkit-transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
              }
            }
            @keyframes nprogress-spinner {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }`}</style>
            );
          }}
        />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}
