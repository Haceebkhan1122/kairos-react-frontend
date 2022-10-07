import React, { useEffect, useRef, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { Logo, MyInput } from "../../components/shared";
import { Form } from "reactstrap";
import { message } from "antd";
import Auth from "../../api/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailFirst, setEmailFirst] = useState(true);
  const [passwordFirst, setPasswordFirst] = useState(true);
  const password = useRef("");
  const email = useRef("");
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("appTitle").innerText = "Kairos | Sign-In";
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setOpen(true);
    Auth.userSignIn(email.current, password.current)
      .then((r) => {
        setOpen(false);
        localStorage.setItem("tokenMKairos", r.token);
        message.success("Login Sucessful");
        window.location.replace("/");
        // window.location.href = "/";
      })
      .catch((e) => {
        setOpen(false);
        message.error(e.response.data.message);
      });
  };
  const emailChangeHandler = (e) => {
    const em = e.target.value;
    if (em.length > 0 && em.includes("@") && em.includes(".")) {
      setEmailError(false);
      setEmailFirst(false);
      email.current = em;
    } else {
      setEmailError(true);
    }
    console.log(emailError);
  };
  const passwordChangeHandler = (e) => {
    const pd = e.target.value;
    if (pd.length > 0) {
      setPasswordError(false);
      setPasswordFirst(false);
      password.current = pd;
    } else {
      setPasswordError(true);
    }
  };

  return (
    <>
      <div className="main">
        <div className="content" style={{ marginTop: "65px" }}>
          <Logo />
          <div className="text-center mt-5">
            <label className="SignIn py-1">Sign In</label>
            <br />
            <span className="SignInDetails">
              Enter your details to login to your account:
            </span>
          </div>
          <div className="mb-5" style={{ marginTop: "75px" }}>
            <Form onSubmit={formSubmitHandler}>
              <MyInput
                first={emailFirst}
                margin={"0 0 25px 0"}
                fontSize={"13px"}
                padding={"10px 20px"}
                backgroundColor={"#C4BEF7 !important"}
                opacity={"0.6"}
                labelHide={true}
                radius={"25px"}
                for={"email"}
                name={"email"}
                label="Email"
                type={"email"}
                onError={emailError}
                onChange={emailChangeHandler}
                placeholder={"Email"}
              />
              <MyInput
                first={passwordFirst}
                padding={"10px 20px"}
                backgroundColor={"#C4BEF7 !important"}
                labelHide={true}
                radius={"25px"}
                opacity={"0.6"}
                fontSize={"13px"}
                for={"password"}
                name={"password"}
                label={"Password"}
                type={"password"}
                onError={passwordError}
                onChange={passwordChangeHandler}
                placeholder={"Password"}
              />
              <div className="checkbox-inline mb-2">
                <label className="checkbox checkbox-outline text-white m-0">
                  <input type="checkbox" name="remember_me" className="me-2" />
                  <span className="checkboxText">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="myBtn">
                  Sign In
                </button>
              </div>
            </Form>
            <div className="text-center mt-3">
              <a className="verifyLink me-2">Resend Verification Link</a>
              <a className="signUpLink">Sign Up</a>
            </div>
          </div>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default SignInPage;
