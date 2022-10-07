import React, { useEffect } from "react";
import { Logo } from "../../components/shared";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("appTitle").innerText = "Kairos | 404";
  }, []);

  return (
    <>
      <div className="main">
        <div className="content" style={{ marginTop: "65px" }}>
          <Logo />
          <div className="text-center mt-5">
            <label className="SignIn py-1">404</label>
            <br />
            <span
              className="SignInDetails"
              onClick={() => {
                navigate("/");
              }}
            >
              Page not found! Click here to go back
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
