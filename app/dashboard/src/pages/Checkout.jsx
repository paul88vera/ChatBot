// Checkout.jsx

import { useParams } from "react-router-dom";

export default function Checkout() {
  const { productId } = useParams();

  const handleCheckout = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      },
    );

    const data = await response.json();

    window.location.href = data.url;
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen card bg-base-100 shadow-xl">
        <h1>Free Plan</h1>

        <p>Product ID: {productId}</p>

        <button onClick={handleCheckout}>Continue</button>
      </div>
    </div>
  );
}
