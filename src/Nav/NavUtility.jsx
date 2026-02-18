import { useState } from "react";

export default function useNavUtility() {
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
  let [hiUser, setHiuser] = useState("");
  const [login, setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

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
