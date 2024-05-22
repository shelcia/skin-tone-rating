import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SurveyAnswerProvider } from "./context/SurveyAnswerContext.tsx";

// Supports weights 300-900
import "@fontsource-variable/figtree";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SurveyAnswerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SurveyAnswerProvider>
);
