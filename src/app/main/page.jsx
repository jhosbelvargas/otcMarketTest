/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
/* import { initFacebookSdk } from "../api/facebook/route"; */
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaperPlane,
  faComment,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useSession } from "next-auth/react";
import axios from 'axios'

function Main() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [link, setLink] = useState("");
  const [instaId, setInstaId] = useState("");
  const [instaIdPost, setInstaIdPost] = useState("");
  const [facebookIdPage, setFacebookIdPage] = useState("");
  const [imagen, setImagen] = useState("");
  const [dataUser, setDataUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      try {
        const data = await response.json();
        const finalResult = data.match(/\[([^\]]+)\]/g);
        const title = prompt.split("\n");
        setTextTitle(title[0]);
        setResult(finalResult);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      console.error("Request error:", response.status);
      console.error(
        "No more credits to generate responses, check your openai account."
      );
      setLoading(false);
    }
  };

  /* const {data: session} = useSession() */

  const telegramSubmit = async (e) => {
    const MySwal = withReactContent(Swal);
    const shouldExecute = await MySwal.fire({
      title: "Do you want to send the message to Telegram?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (shouldExecute.isConfirmed) {
      e.preventDefault();
      const botToken = dataUser.botToken;
      const chatId = dataUser.chatId;
      const telegramFinal = result[6].slice(1, -1);
      const message = `${telegramFinal} ${link}`;
      const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      try {
        const botTelegram = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });

        if (botTelegram.ok) {
          const data = await botTelegram.json();
          return data;
        } else {
          throw new Error(`Error en la solicitud: ${botTelegram.status}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
      }
    } else {
      MySwal.fire({
        title: "Operation cancelled",
        text: "The operation was cancelled.",
        icon: "info",
      });
    }
  };

  const { data: session, status } = useSession();
console.log(session)

  const getIdInstagram = async () => {
    if (typeof window !== "undefined") {
      const fbToken = localStorage.getItem("fbAccesToken");
      const token = fbToken;
      const idFace = facebookIdPage;
      try {
        const peticion = await fetch(
          `https://graph.facebook.com/v18.0/${idFace}/?fields=instagram_business_account&access_token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const peticionFinal = await peticion.json();
        setInstaId(peticionFinal.instagram_business_account.id);
        localStorage.setItem(
          "idInsta",
          peticionFinal.instagram_business_account.id
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getInstaContainer = async () => {
    if (typeof window !== "undefined") {
      const fbToken = localStorage.getItem("fbAccesToken");
      const token = fbToken;
      const textInsta = result[2] && result[2].replace(/[\[\]]/g, "");
      const caption = encodeURIComponent(textInsta);
      const url = imagen;

      try {
        const peticion = await fetch(
          `https://graph.facebook.com/v18.0/${instaId}/media?image_url=${url}&caption=${caption}&access_token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const peticionFinal = await peticion.json();
        setInstaIdPost(peticionFinal.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const postInstagram = async () => {
    if (typeof window !== "undefined") {
      const fbToken = localStorage.getItem("fbAccesToken");
      const token = fbToken;
      const idContainer = instaIdPost;
      try {
        const peticion = await fetch(
          `https://graph.facebook.com/v18.0/${instaId}/media_publish?creation_id=${idContainer}&access_token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const peticionFinal = await peticion.json();
        return peticionFinal;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const initFacebookSdk = async () => {
    const idConfig = localStorage.getItem('userSettingId')
    const respUser = await axios.get(
      `${NEXT_PUBLIC_BACKEND_URL}/user/findById/${idConfig}`
    );
    const respData = await axios.get(
      `${NEXT_PUBLIC_BACKEND_URL}/config/${idConfig}`
    );
    localStorage.setItem("user", JSON.stringify(respUser.data));
    localStorage.setItem("dataUser", JSON.stringify(respData.data));
    const user = localStorage.getItem("user");
    const dataUser = localStorage.getItem("dataUser");
    const appId = JSON.parse(dataUser).appId;
    console.log(JSON.parse(user))
    console.log(JSON.parse(dataUser))
    if (typeof window !== "undefined") {
      window.fbAsyncInit = function () {
        FB.init({
          appId: process.env.FACEBOOK_CLIENT_ID,
          xfbml: true, 
          version: "v18.0",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  };

  const openInsta = () => {
    getInstaContainer()
      .then(() => openModal())
      .catch((error) => {
        console.error("Se produjo un error en alguna de las funciones:", error);
      });
  };

  const postInstaButtom = () => {
    postInstagram().then(() => closeModal());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("dataUser");
      const data2 = JSON.parse(data);
      setDataUser(data2);
      setFacebookIdPage(data2.pageId);
    }
    /* const data = localStorage.getItem("dataUser");
    const data2 = JSON.parse(data);
    setDataUser(data2);
    setFacebookIdPage(data2.pageId); */

    initFacebookSdk();
    getIdInstagram();
  }, [imagen]);

  return (
    <div className="grid">
      <Navbar />
      <div className=" flex-col flex justify-center items-center">
        <form onSubmit={onSubmit}>
          <div className="grid justify-center">
            <h1 className="text-sky-800 text-center font-bold text-3xl">
              Generate a summary for my social networks
            </h1>
            <br />
            {/* <Link href='/imgTest' className="text-white text-center font-bold text-xl">Image Test</Link>
            <br />
            <br /> */}
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="p-2 block text-cyan-800 w-full rounded-md border-2 border-sky-300 font-medium"
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              className="bg-green-500 p-2 rounded-md block mt-2 text-white disabled:opacity-50 font-medium"
              disabled={!prompt || loading}
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </div>
          <br />
          {result &&
            (() => {
              const numWhatsapp = dataUser.whatsAppNum;
              const twittFinal = result[0].slice(1, -1);
              const whatsappFinal = result[3]?.slice(1, -1);
              const reddiFinal = result[4]?.slice(1, -1);
              const linkedinFinal = result[5]?.slice(1, -1);
              const faceFinal = result[1] && result[1].replace(/[\[\]]/g, "");
              const twitPost = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                twittFinal
              )}`;
              const redditPost = `https://www.reddit.com/submit?title=${textTitle}&text=${encodeURIComponent(
                reddiFinal
              )}%0A%0A${link}`;
              const linkedinPost = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                linkedinFinal
              )}%0A%0A${link}`;
              const whatsappMsj = `https://wa.me/${numWhatsapp}?text=${encodeURIComponent(
                whatsappFinal
              )}%0A%0A${link}`;
              const shareOnFacebook = async () => {
                try {
                  FB.ui({
                    method: "share",
                    href: link,
                  });
                } catch (error) {
                  console.log(error);
                }
              };
              const copyContent = async () => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  },
                });
                try {
                  await navigator.clipboard.writeText(faceFinal);
                  Toast.fire({
                    icon: "success",
                    title: "Content copied",
                  });
                } catch (err) {
                  console.error("Failed to copy: ", err);
                }
              };
              return (
                <div className="flex flex-col">
                  <div>
                    <h3 className="text-sky-800 font-bold text-3xl text-center">
                      Enter the link to the press release
                    </h3>
                    <br />
                    <input
                      type="text"
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://www.example.com/press-release"
                      className="rounded-md w-full border-2 border-sky-300 p-2"
                    />
                    <br />
                    <br />
                    <h3 className="text-sky-800 font-bold text-3xl text-center">
                      Enter your URL Image to post on Instagram
                    </h3>
                    <br />
                    <input
                      type="text"
                      onChange={(e) => setImagen(e.target.value)}
                      placeholder="https://www.example.com/example.jpg"
                      className="rounded-md w-full border-2 border-sky-300 p-2 mb-8"
                    />
                    <br />
                    <br />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="mx-4 shadow-lg px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a
                        href={twitPost}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="text-sky-400 font-bold text-3xl text-center twitter">
                          Twitter
                        </h3>
                      </a>
                      <p className="text-base font-medium text-cyan-800 max-w-xs my-10">
                        {result[0] && result[0].replace(/[\[\]]/g, "")}
                      </p>
                    </div>
                    <div className="mx-4 shadow-lg px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (!link) {
                            Swal.fire({
                              icon: "error",
                              title: "REQUIRED LINKS!",
                              text: "Please enter the image link and URL to post.",
                            });
                          } else {
                            shareOnFacebook();
                          }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="text-sky-400 font-bold text-3xl text-center facebook">
                          Facebook
                        </h3>
                      </a>
                      <p
                        onClick={copyContent}
                        className="text-base font-medium text-cyan-800 max-w-xs my-10 cursor-pointer"
                      >
                        {faceFinal}
                      </p>
                    </div>
                    <div className="mx-4 shadow-lg px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a
                        href="#"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          if (!imagen) {
                            Swal.fire({
                              icon: "error",
                              title: "REQUIRED LINKS!",
                              text: "Please enter the image link and URL to post.",
                            });
                          } else {
                            openInsta();
                          }
                        }}
                      >
                        <h3 className="text-sky-400 font-bold text-3xl text-center instagram">
                          Instagram
                        </h3>
                      </a>
                      <p className="text-base font-medium text-cyan-800 max-w-xs my-10">
                        {result[2] && result[2].replace(/[\[\]]/g, "")}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="mx-4 shadow-lg px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a
                        href={whatsappMsj}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="text-sky-400 font-bold text-3xl text-center whatsapp">
                          WhatsApp
                        </h3>
                      </a>
                      <p className="text-base font-medium text-cyan-800 max-w-xs my-10">
                        {result[3] && result[3].replace(/[\[\]]/g, "")}
                      </p>
                    </div>
                    <div className="mx-4 shadow-lg px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a href={redditPost} target="_blank">
                        <h3 className="text-sky-400 font-bold text-3xl text-center reddit">
                          Reddit
                        </h3>
                      </a>
                      <p className="text-base font-medium text-cyan-800 max-w-xs my-10">
                        {result[4] && result[4].replace(/[\[\]]/g, "")}
                      </p>
                    </div>
                    <div className="mx-4 shadow-lg px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a
                        href={linkedinPost}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="text-sky-400 font-bold text-3xl text-center linkedin">
                          LinkedIn
                        </h3>
                      </a>
                      <p className="text-base font-medium text-cyan-800 max-w-xs my-10">
                        {result[5] && result[5].replace(/[\[\]]/g, "")}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mb-8">
                    <div className="mx-4 shadow-lg col-span-1 col-start-2 col-end-3 px-8 py-10 text-center hover:scale-110 transition duration-300 ease-in-out bg-white">
                      <a
                        href="#"
                        rel="noopener noreferrer"
                        onClick={telegramSubmit}
                      >
                        <h3 className="text-sky-400 font-bold text-3xl text-center telegram">
                          Telegram
                        </h3>
                      </a>
                      <p className="text-base font-medium text-cyan-800 max-w-xs my-10">
                        {result[6] && result[6].replace(/[\[\]]/g, "")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          customStyles={{ modal: { height: "60vh", width: "35vw" } }}
        >
          <div className="container">
            <img src={imagen} alt="Instagram Image Post" />
            <div className="pl-4 pr-4">
              <div className="grid grid-cols-6">
                <div className="col-start-1 col-end-3">
                  <FontAwesomeIcon icon={faHeart} />
                  <FontAwesomeIcon icon={faComment} className="mx-3" />
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
                <div className="col-end-7 col-span-1 justify-end flex items-center">
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
              </div>
              <p>10.840 likes</p>
              <p>{result[2] && result[2].replace(/[\[\]]/g, "")}</p>
              <br />
              <button
                onClick={() => postInstaButtom()}
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Main;
