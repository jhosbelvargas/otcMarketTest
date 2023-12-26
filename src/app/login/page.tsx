/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Modal from "../../components/Modal";
import { compare } from "bcryptjs";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [mail, setMail] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    updateBtnState(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    updateBtnState(email, e.target.value);
  };

  const updateBtnState = (email, password) => {
    setBtnActive(email.trim().length > 0 && password.trim().length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verificar que las contraseñas son iguales
      if (pass !== pass2) {
        console.error("Passwords do not match.");
        const MySwal = withReactContent(Swal);
        await MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
        });
        return;
      }
      const dataUser = {
        firstname: name,
        secondname: last,
        password: pass,
        email: mail,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        dataUser
      );

      if (response.status === 201) {
        await signIn("credentials", {
          email: mail,
          password: pass,
          redirect: false,
        });
        router.push("/main");
      } else {
        console.error("Error en el registro:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userData = async () => {
    const MySwal = withReactContent(Swal);
    try {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/findUserByEmail/${email}`
        )
        .then(async (response: any) => {
          const PasswordCorrect = await compare(
            password,
            response.data.password
          );
          if (PasswordCorrect) {
            const res = await signIn("credentials", {
              email: response.data.email,
              password: response.data.password,
              redirect: false,
            });
            if (res.ok) {
              axios
                .get(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/config/${response.data._id}`
                )
                .then(async (respConfig: any) => {
                  localStorage.setItem("userSettingId", respConfig.data._id);
                });
              localStorage.setItem("userID", response.data._id);
              return router.push("/main");
            }
          } else {
            await MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "User not found. Verify email and password.!",
            });
          }
        });
    } catch (error) {
      console.error(error);
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not found. Verify email and password.!",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google")
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signIn("facebook");
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  };

  console.log('Ya actualice9')
  console.log(session)

  const userSession = async () => {
    if (status === "authenticated") {
      const userEmail = session.user.email;
      const userFindUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/findUserByEmail/${userEmail}`;

      try {
        const userFind = await axios.get(userFindUrl);
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/config/${userFind.data._id}`
          )
          .then(async (respConfig: any) => {
            localStorage.setItem("userSettingId", respConfig.data.userId);
          });
        if (userFind.data.email) {
          router.push("/main");
        } else {
          const dataUser = {
            firstname: session.user.name,
            secondname: "",
            password: "",
            email: session.user.email,
          };
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
            dataUser
          );
          router.push("/main");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        console.log('hola soy goku1')
      }
    }
  };

  useEffect(() => {
    if (session !== null) {
      userSession();
    }
  }, [status]);

  return (
    <div className="bg-white h-screen grid">
      <div className="flex justify-between ml-8 mt-8 mr-8">
        <img src="/images/logo.png" alt="logo" className="h-52" />
        <h1 className="font-semibold cursor-pointer" onClick={openModal}>
          CREATE ACCOUNT
        </h1>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          customStyles={{ modal: { height: "60vh" } }}
        >
          <div className="p-8 h-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <br />
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="gap-2">
                <div className="border-b-2 inputLabel">
                  <h3>First Name</h3>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="inputLog"
                  />
                </div>
                <div className="border-b-2 inputLabel">
                  <h3>Last Name</h3>
                  <input
                    type="text"
                    placeholder="Your Last Name"
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                    className="inputLog"
                  />
                </div>
                <div className="border-b-2 inputLabel">
                  <h3>Password</h3>
                  <input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="inputLog"
                  />
                  <FontAwesomeIcon
                    icon={showPassword2 ? faEye : faEyeSlash}
                    className="eye-icon"
                    onClick={togglePasswordVisibility2}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="border-b-2 inputLabel">
                  <label>
                    Repeat your password
                    <br />
                    <input
                      type={showPassword3 ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={pass2}
                      onChange={(e) => setPass2(e.target.value)}
                      className="inputLog"
                    />
                  </label>
                  <FontAwesomeIcon
                    icon={showPassword3 ? faEye : faEyeSlash}
                    className="eye-icon"
                    onClick={togglePasswordVisibility3}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="border-b-2 inputLabel">
                  <label>
                    Email
                    <br />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      className="inputLog"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-2 col-span-1 w-full"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <h1 className="text-center text-4xl">LOGIN TO OTCMARKETS.AI</h1>
      <div className="flex justify-center items-center">
        <div>
          <form className="grid">
            <label className="border-b-2 inputLabel">
              EMAIL ADDRESS
              <br />
              <input
                type="text"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                className="inputLog"
              />
            </label>
            <div className="border-b-2 inputLabel">
              <label>
                PASSWORD
                <br />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="inputLog"
                />
              </label>
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="eye-icon"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            </div>
          </form>
          <button
            className="btnLogin"
            style={{
              backgroundColor: btnActive ? "#0091E0" : "#ebebeb",
              color: btnActive ? "black" : "#D5D5D5",
              fontWeight: "bolder",
            }}
            disabled={!btnActive}
            onClick={userData}
          >
            LOGIN
          </button>
        </div>
        <div className="orDiv">
          <hr />
          <p className="mt-4 mb-4">or</p>
          <hr />
        </div>
        <div className="grid">
          <button className="socialButton" onClick={handleGoogleSignIn}>
            <img src="/images/g-google.png" className="imgLogo" /> Continue with
            Google
          </button>
          <button className="socialButton">
            <img src="/images/apple-logo.png" className="imgLogo" />
            Continue with Apple
          </button>
          <button className="socialButton" onClick={handleFacebookSignIn}>
            <img src="/images/facebook-logo.png" className="imgLogo" />
            Continue with Facebook
          </button>
        </div>
      </div>
      <div className="grid justify-center mt-16">
        <h3 className="text-center font-semibold">{`CAT'N LOG IN?`}</h3>
        <div className="flex text-center mt-8">
          <a href="#" className="underline decoration-1">
            Terms
          </a>
          <p>&</p>
          <a href="#" className="underline decoration-1">
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
