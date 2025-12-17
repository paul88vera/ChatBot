import PriceCard from '../components/PriceCard';
import price from '../salesCardPrices';

const Pricing = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: '2rem' , margin: "0 0 2rem 0"}}>
      <div className="hero hero-2" style={{marginBottom: "-8rem"}}>
        <div className="hero-content" style={{color: "white", fontSize: "3rem"}}>
          <h1>
          Pricing List
          </h1>
          <p>It's a list of prices...</p>
          </div>
      </div>
      <div style={{display: "flex", flexDirection: "row", gap: "1rem", alignContent: "center", justifyContent: "center", color: 'white', margin: "0 auto", maxWidth: "1440px", flexWrap: "nowrap"}}>
       
          <PriceCard {...price[0]} />
          <PriceCard {...price[1]} />
          <PriceCard {...price[2]} />
      </div>

      {/* This will be a future feature */}
      {/* <div style={{display: "flex", flexDirection: "row", gap: "1rem", alignContent: "center", justifyContent: "center", color: 'white', margin: "0 auto", maxWidth: "1200px", flexWrap: "nowrap"}}>

          <h2>If your business wants to purchase the application for resale/whitelabel then this plan is for you.</h2>
          <PriceCard {...price[3]} />
      </div> */}
    </div>
  );
};

export default Pricing;
