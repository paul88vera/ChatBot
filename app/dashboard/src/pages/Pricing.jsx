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
    </div>
  );
};

export default Pricing;
