import PriceCard from '../components/PriceCard';
import price from '../salesCardPrices';
import img2 from '/Users/paulvera/Desktop/ChatBot/app/landing/src/pages/pexels-fauxels-3182786.jpg'

const Pricing = () => {
  return (
    <div className='pricing-container'>
      <div className="hero hero-2 hero-pricing">
        <div className="hero-content">
          <h1>
          Pricing List
          </h1>
          <p>Powerful AI chat solutions, priced for every stage.</p>
          </div>
      </div>
      <div className='pricing-cards'>
       
          <PriceCard {...price[0]} mwidth={"350px"} />
          <PriceCard {...price[1]} mwidth={"350px"} />
          <PriceCard {...price[2]} mwidth={"350px"} />
      </div>

      {/* This will be a future feature */}
      <div className='pricing-feature'>
        <div className='pricing-feature-inner'>
          <div className='pricing-feature-title'>
            <h2>If your business wants to purchase the application for resale/whitelabel then this plan is for you.</h2>
            <div>
              <img src={img2} />
            </div>
          </div>
          <div className='pricing-feature-card'>
            <PriceCard {...price[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
