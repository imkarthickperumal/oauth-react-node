import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "thagadoor.us.auth0.com";
    const audience = "https://www.icw-ott.com";
    const scope = "read:challenges";
    const clientId = "your-client-id";
    const responseType = "code";
    const redirectUri = "http://localhost:3000/icwott";

    const response = await fetch(
      `https://${domain}/authorize?` + 
      `audience=${audience}&` + 
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`, {
        redirect: "manual"
      }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;