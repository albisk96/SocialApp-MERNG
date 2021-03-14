import { useContext } from "react";
import { AuthProvider } from "./context/auth";
import Routes from "./components/routes/Routes";
import { AlertContext } from "./context/alert";
import { Alert } from "react-bootstrap";

import "./App.css";

function App() {
  const { alert, visible, setVisible } = useContext(AlertContext);

  return (
    <div className="application">
      {alert.message && visible && (
        <Alert
          dismissible
          className={`custom-alert-${alert.type}`}
          onClose={() => setVisible(false)}
          variant={alert.type}
        >
          {alert.message}
        </Alert>
      )}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
