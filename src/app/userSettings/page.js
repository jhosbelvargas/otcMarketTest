"use client";
/* import axios from "axios"; */
import Link from "next/link";
/* import { useState } from "react"; */

export default function Prueba() {
  /* const [appData, setAppData] = useState("");
  const [secretData, setSecretData] = useState("");
  const [pageData, setPageData] = useState("");
  const [whatsNum, setWhatsNum] = useState("");
  const [botTokenTelegram, setBotTokenTelegram] = useState("");
  const [chatIdTelegram, setChatIdTelegram] = useState("");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = async (e) => {
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
      const response = axios.patch(
        "http://localhost:4000/config/6568cbefe9c2eea7efb5af8a",
        dataUser
      );
      return await response;
    } catch (error) {
      console.error(error);
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
    const dataUser = localStorage.getItem("dataUser");
    const clientId = JSON.parse(dataUser).appId;
    const clientSecret = JSON.parse(dataUser).appSecret;

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
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=https://www.example.com/&code=${code}`,
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

  const dataUser = localStorage.getItem("dataUser");
  const clientId = JSON.parse(dataUser).appId;

  const urlPage = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=https://www.example.com/&scope=pages_show_list,business_management,instagram_basic,instagram_manage_comments,instagram_content_publish,pages_read_engagement,pages_manage_posts,public_profile`; */

  return (
    <div>
      {/* <h1>Personal Settings</h1>
      <h1>Facebook Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          App ID:
          <input
            type="text"
            value={appData}
            onChange={(e) => setAppData(e.target.value)}
          />
        </label>
        <br />
        <label>
          App Secret:
          <input
            type="text"
            value={secretData}
            onChange={(e) => setSecretData(e.target.value)}
          />
        </label>
        <br />
        <label>
          Page ID:
          <input
            type="text"
            value={pageData}
            onChange={(e) => setPageData(e.target.value)}
          />
        </label>
        <br />
        <h1>WhatsApp Data</h1>
        <label>
          WhatsApp Number:
          <input
            type="text"
            value={whatsNum}
            onChange={(e) => setWhatsNum(e.target.value)}
          />
        </label>
        <br />
        <h1>Telegram Data</h1>
        <label>
          Bot Token:
          <input
            type="text"
            value={botTokenTelegram}
            onChange={(e) => setBotTokenTelegram(e.target.value)}
          />
        </label>
        <br />
        <label>
          Chat ID:
          <input
            type="text"
            value={chatIdTelegram}
            onChange={(e) => setChatIdTelegram(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <a href={urlPage} target="_blank">
        Open the Facebook Auth
      </a>
      <br />
      <br />
      <h1>Send the Url Code</h1>
      <input type="text" onChange={(e) => setUrl(e.target.value)} />
      <br />
      <br />
      <button onClick={getCode}>Get the Code</button>
      <br />
      <br />
      <button onClick={getToken}>Get the Access Token</button>
      <br />
      <br /> */}
      <Link href="/">regresar</Link>
    </div>
  );
}
