import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary";

/* 부모 트리의 RecoilRoot, recoil 패키지에서 가져오기 */
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </React.Suspense>
    </ErrorBoundary>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
