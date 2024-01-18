"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Prueba() {
  const [appData, setAppData] = useState("");
  const [secretData, setSecretData] = useState("");
  const [pageData, setPageData] = useState("");
  const [whatsNum, setWhatsNum] = useState("");
  const [botTokenTelegram, setBotTokenTelegram] = useState("");
  const [chatIdTelegram, setChatIdTelegram] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [nuevaUrl, setNuevaUrl] = useState('');

  const handleSubmit = async (e) => {
    const MySwal = withReactContent(Swal);

    if (typeof window !== "undefined") {
      const user_Id = localStorage.getItem("userSettingId");
      e.preventDefault();

      try {
        const dataUser = {
          appId: appData,
          appSecret: secretData,
          pageId: pageData,
          whatsAppNum: whatsNum,
          botToken: botTokenTelegram,
          chatId: chatIdTelegram,
        };
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/config/${user_Id}`,
          dataUser
        );
        setAppData("");
        setSecretData("");
        setPageData("");
        setWhatsNum("");
        setBotTokenTelegram("");
        setChatIdTelegram("");
        await MySwal.fire({
          icon: "success",
          title: "Perfect!",
          text: "Your profile has been updated.",
        });
        return response;
      } catch (error) {
        console.error(error);
        await MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update your profile.",
        });
      }
    }
  };

  const getCode = () => {
    const startIndex = url.indexOf("code=");
    const endIndex = url.indexOf("#_=_");

    const code = url.substring(startIndex + 5, endIndex);
    console.log(code);
    setCode(code);
    return code;
  };

  const getToken = async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "fr=0BidjyFctBD8AIH3u..BlZ2oM.h9.AAA.0.0.Blagvd.AWWPqVC09GQ; sb=DGpnZXg1ucamWyvMCI_JKqOd"
    );
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET}&redirect_uri=https://www.example.com/&code=${code}`,
      requestOptions
    );
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("fbAccesToken", result.access_token);
      setAccessToken(result.access_token);

      console.log("Access Token:", result.access_token);
    } else {
      console.log("Error en la solicitud:", response.statusText);
    }
  };

  const urlPage = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=https://www.example.com/&scope=pages_show_list,business_management,instagram_basic,instagram_manage_comments,instagram_content_publish,pages_read_engagement,pages_manage_posts,public_profile`;

  return (
    <div className="grid">
      <Navbar />
      <h1 className="text-sky-800 text-center font-bold text-3xl mb-8">
        Personal Settings
      </h1>
      <div className="">
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div className="grid justify-center items-center">
            <h1 className="text-sky-600 text-center font-bold text-2xl">
              Facebook Data
            </h1>
            <h3 className="text-sky-400 text-center font-bold text-xl">
              App ID:
            </h3>
            <input
              type="text"
              value={appData}
              onChange={(e) => setAppData(e.target.value)}
              className="justify-center border-2 border-sky-300"
              placeholder="123456789101213"
            />
            <br />
            <h3 className="text-sky-400 text-center font-bold text-xl">
              App Secret:
            </h3>
            <input
              type="text"
              value={secretData}
              onChange={(e) => setSecretData(e.target.value)}
              className="border-2 border-sky-300"
              placeholder="abcede12345678a1ab12345a12ab1234"
            />
            <br />
            <h3 className="text-sky-400 text-center font-bold text-xl">
              Page ID:
            </h3>
            <input
              type="text"
              value={pageData}
              onChange={(e) => setPageData(e.target.value)}
              className="border-2 border-sky-300"
              placeholder="123456789101112"
            />
            <br />
          </div>
          <div className="grid justify-center items-start">
            <h1 className="text-sky-600 text-center font-bold text-2xl">
              WhatsApp Data
            </h1>
            <h3 className="text-sky-400 text-center font-bold text-xl">
              WhatsApp Number:
            </h3>
            <input
              type="text"
              value={whatsNum}
              onChange={(e) => setWhatsNum(e.target.value)}
              className="border-2 border-sky-300"
              placeholder="575554447777"
            />
            <br />
          </div>
          <div className="grid justify-center items-center">
            <h1 className="text-sky-600 text-center font-bold text-2xl">
              Telegram Data
            </h1>
            <h3 className="text-sky-400 text-center font-bold text-xl">
              Bot Token:
            </h3>
            <input
              type="text"
              value={botTokenTelegram}
              onChange={(e) => setBotTokenTelegram(e.target.value)}
              className="border-2 border-sky-300"
              placeholder="1234567891:ABCdeFgHIJkLmNñOPQRsTuvWXyZAb1aBC12"
            />
            <br />
            <h3 className="text-sky-400 text-center font-bold text-xl">
              Chat ID:
            </h3>
            <input
              type="text"
              value={chatIdTelegram}
              onChange={(e) => setChatIdTelegram(e.target.value)}
              className="border-2 border-sky-300"
              placeholder="-1234567891011"
            />
            <br />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-start-2 col-span-1"
          >
            Submit
          </button>
        </form>
        <br />
        <div className="grid justify-center">
          <a
            href={urlPage}
            target="_blank"
            className="text-white text-center font-bold text-xl bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
          >
            Open the Facebook Auth
          </a>
          <br />
          <br />
          <h1 className="text-sky-600 text-center font-bold text-xl">
            Send the Url Code
          </h1>
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            className="border-2 border-sky-300"
          />
          <br />
          <br />
          <button
            onClick={getCode}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get the Code
          </button>
          <br />
          <br />
          <button
            onClick={getToken}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get the Access Token
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
