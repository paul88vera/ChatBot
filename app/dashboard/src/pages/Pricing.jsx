import PriceCard from "../components/PriceCard";
import price from "../salesCardPrices";
import img2 from "./pexels-fauxels-3182786-CscstPyH.webp";

import { PricingTable } from "@clerk/clerk-react";

function PricingScreen() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
      <PricingTable for="organization" />
    </div>
  );
}

const Pricing = () => {
  return (
    <div className="pricing-container">
      <div className="hero hero-2 hero-pricing">
        <div className="hero-content">
          <h1>Pricing List</h1>
          <p>
            Powerful AI chat solutions, priced for every stage. Choose the plan
            that fits your business today—and scales tomorrow.
          </p>
        </div>
      </div>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id="prctbl_1Tql3K6baMArmzIID7hfhwYU"
        publishable-key={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}></stripe-pricing-table>
      {/* <div className='pricing-cards'>
       
          <PriceCard {...price[0]} mwidth={"350px"} />
          <PriceCard {...price[1]} mwidth={"350px"} />
          <PriceCard {...price[2]} mwidth={"350px"} />
      </div>

      {/* This will be a future feature }
      <div className='pricing-feature'>
        <div className='pricing-feature-inner'>
          <div className='pricing-feature-title'>
            <h2>If your business wants to purchase the application for resale/whitelabel then this plan is for you.</h2>
            <div className='pricing-feature-img-container'>
              <img src={img2} />
            </div>
          </div>
          <div className='pricing-feature-card'>
            <PriceCard {...price[3]} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Pricing;
