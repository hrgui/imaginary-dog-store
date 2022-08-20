import { BrowserRouter as Router, Link } from "react-router-dom";

import AppProvider from "./AppProvider";
import AppRoutes from "./AppRoutes";

function App({ basename = "/imaginary-pet-shop/" }) {
  return (
    <Router basename={basename}>
      <AppProvider>
        <div>
          <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to="/">
            Find a Item
          </Link>{" "}
          |{" "}
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            to="/collection"
          >
            Collection
          </Link>
        </div>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
