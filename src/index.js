import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
/* ErrorBoundary는 직접 작성하는 클래스형 컴포넌트 */
import ErrorBoundary from "./ErrorBoundary";

/* 부모 트리의 RecoilRoot, recoil 패키지에서 가져오기 */
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    {/* fallback 설정 가능 */}
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <React.StrictMode>
        {/* react.Suspense 호출 가능, fallback으로 로딩 중 불러올 ui 지정 가능 */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </React.StrictMode>
    </ErrorBoundary>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
