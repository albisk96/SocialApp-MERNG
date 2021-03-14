import { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const [visible, setVisible] = useState(false);

  const ShowAlert = (message, status) => {
    setVisible(true);
    setAlert({
      type: status,
      message: message,
    });

    setTimeout(() => {
      setVisible(false);
      setAlert({
        type: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ setVisible, visible, alert, ShowAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
