import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/LayoutArea/Layout/Layout";
import { appStore } from "./Redux/Store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={appStore}>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Layout />
      </QueryParamProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
