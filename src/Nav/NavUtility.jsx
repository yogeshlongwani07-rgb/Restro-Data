import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../main";

export default function useNavUtility() {
  const { user } = useContext(AuthContext);

  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function inputHandle(state) {
    return (e) => {
      state((pre) => {
        return {
          ...pre,
          [e.target.name]: e.target.value,
        };
      });
    };
  }

  let [xerror, setError] = useState("");
  // Derive hiUser from AuthContext so it survives page refresh
  let [hiUser, setHiuser] = useState(() => user?.name?.split(" ")[0] || "");
  const [login, setLogin] = useState(!!user);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // Keep hiUser and login in sync whenever AuthContext user changes
  useEffect(() => {
    if (user) {
      setHiuser(user.name?.split(" ")[0] || "");
      setLogin(true);
    } else {
      setHiuser("");
      setLogin(false);
    }
  }, [user]);

  return {
    loginData,
    setLoginData,
    signUpData,
    setSignUpData,
    inputHandle,
    setError,
    xerror,
    hiUser,
    setHiuser,
    login,
    setLogin,
    showModal,
    setShowModal,
    showModal2,
    setShowModal2,
  };
}
