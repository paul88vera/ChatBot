import PriceCard from '../components/PriceCard';
import price from '../salesCardPrices';
import img2 from '/Users/paulvera/Desktop/ChatBot/app/landing/src/pages/pexels-fauxels-3182786.jpg'

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
      <div style={{display: "flex", flexDirection: "row", gap: "1rem", alignContent: "center", justifyContent: "center", color: "white", margin: "0 auto", maxWidth: "1440px", flexWrap: "nowrap", filter: "drop-shadow(0 0 0.75rem #1f1f1fc0)"}}>
       
          <PriceCard {...price[0]} mwidth={"350px"} />
          <PriceCard {...price[1]} mwidth={"350px"} />
          <PriceCard {...price[2]} mwidth={"350px"} />
      </div>

      {/* This will be a future feature */}
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0rem", alignContent: "center", justifyContent: "center", color: 'white', margin: "4rem auto 0 auto", maxWidth: "100%", backgroundColor: "#ffffffff", padding: "2rem 1.5rem", borderRadius: "50px", filter: "drop-shadow(0 0 0.75rem #212121ff)"}}>
          <div style={{display: "flex", flexDirection: "column", gap: "2rem", width: "60%", justifyContent: "start", alignContent: "start"}}>
            <h2 style={{fontSize: "3rem", color: "#000000ff", border: "1px white"}}>If your business wants to purchase the application for resale/whitelabel then this plan is for you.</h2>
            <div>
              <img src={img2} width="85%" style={{borderRadius: "5px", border: "2px solid black"}}/>
            </div>
          </div>
          <div>
            <PriceCard {...price[3]} mwidth={"400px"} />
          </div>
      </div>
    </div>
  );
};

export default Pricing;
