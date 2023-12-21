"use client";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Register() {
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [mail, setMail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

  return (
    <div>
      <h1>Register</h1>
      <br />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="gap-2">
          <div className="mx-4 flex">
            <div>
              <h3>First Name</h3>
              <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h3>Last Name</h3>
              <input
                type="text"
                placeholder="Last Name"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-4 flex">
            <div>
              <h3>Password</h3>
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div>
              <h3>Repeat Password</h3>
              <input
                type="password"
                placeholder="Repeat Password"
                value={pass2}
                onChange={(e) => setPass2(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-4">
            <h3>Email</h3>
            <input
              type="email"
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-2 col-span-1"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
