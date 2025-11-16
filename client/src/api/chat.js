import { baseApi } from "./base";
// const sendMessage = async (message) => {
//   const response = await fetch("/api/chat", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${userToken}`, // if authenticated
//     },
//     body: JSON.stringify({ message }),
//   });

//   const data = await response.json();
//   return data.reply;
// };

export function getMessage(message) {
  return baseApi.post("chat", message).then((res) => res.data);
}
