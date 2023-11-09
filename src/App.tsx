import store from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ inset: 20 }}
        toastOptions={{ duration: 3000 }}
      />
    </BrowserRouter>
  );
};

export default App;
