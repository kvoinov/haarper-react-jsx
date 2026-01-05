// getToken.js
const ST_I = "8cc58d3c-a22a-41e7-987f-bb72231b4399";
const ST_S = "7c30365050d8706398585986b6781a57a34eed63";

export async function getTokenST() {
  const url = "https://flex-api.sharetribe.com/v1/auth/token";
  const info = new URLSearchParams({
    client_id: ST_I,
    grant_type: "client_credentials",
    client_secret: ST_S,
    scope: "integ",
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Accept: "application/json",
    },
    body: info,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}
