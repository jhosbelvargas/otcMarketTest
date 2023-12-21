/* import axios from "axios";
const initFacebookSdk = async () => {
  const respUser = await axios.get(`http://localhost:4000/user/findById/6568cbefe9c2eea7efb5af8a`);
  const respData = await axios.get("http://localhost:4000/config/6568cbefe9c2eea7efb5af8a");
  localStorage.setItem("user", JSON.stringify(respUser.data));
  localStorage.setItem("dataUser", JSON.stringify(respData.data));
  const user =  localStorage.getItem('user')
  const dataUser = localStorage.getItem('dataUser')
  const appId = JSON.parse(dataUser).appId

  //vercel//////////////////////////
  const appId = '360666669950141'
  /////////////////////////////////

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
};

export { initFacebookSdk };
 */