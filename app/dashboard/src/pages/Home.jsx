import Card from "../components/Card";

const Home = () => {
  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-content">
          <h1>More than replies — true AI-driven customer support.</h1>
          <p>
            ChatBox gives you a fully customizable, AI-powered communication
            platform — so you can support customers faster, enhance engagement,
            and stay focused on growing your business.
          </p>
        </div>
      </div>

      <div className="why-you-need-ai">
        <div className="why-you-need-ai-content">
          <h2>Why Every Business Needs an AI Chatbot on Their Website</h2>
          <div className="two-column-para">
            <p>
              Having an AI chatbot on your website is no longer just a nice
              extra—it's one of the smartest investments a modern business can
              make. An AI chatbot works around the clock, delivering instant
              answers, guiding customers, and helping them find exactly what
              they need without delay. This eliminates long response times,
              reduces support overload, and creates a smoother, more
              professional customer experience from the moment someone visits
              your site. With tools like ChatBox, businesses can offer fast,
              reliable assistance that feels personalized and human, even when
              the team is offline.
            </p>
            <p>
              Beyond customer support, an AI chatbot becomes a powerful engine
              for growth. It captures leads, qualifies prospects, and provides
              tailored recommendations based on user needs—increasing
              conversions without adding extra workload to your staff. For small
              businesses, it acts like an additional team member; for larger
              companies, it scales to handle massive traffic effortlessly. With
              customizable branding, behaviors, and responses, your chatbot
              becomes a seamless part of your business's identity. In a world
              where customers expect immediate service, an AI chatbot gives your
              business the competitive edge it needs to stand out.
            </p>
          </div>
        </div>
      </div>

      <div className="reviews">
        <div className="reviews-content">
          <Card name="Paul"
            role="Lead Systems Engineer"
            review="We embedded the ChatBox widget into our website in under five
                minutes, and it immediately started answering common questions
                for our customers. The ability to customize responses and
                behavior for our organization is a huge win. Highly recommend!" />
          
          <Card name="Lori"
            role="Senior Web Developer"
            review="We love how lightweight and flexible the ChatBox chatbot is.
                Since it runs on GROK AI, the responses are fast and accurate.
                The React-based design makes it smooth, clean, and perfect for
                modern sites. Great tool for any business!" />
          
          <Card name="Crystal"
            role="Freelance WordPress Developer"
            review="ChatBox Inc. created a scalable chatbot solution we could
                customize with our branding and tone. It integrates directly
                into our HTML with no hassle. Our team has seen a reduction in
                support load and customers enjoy quick, friendly help." />
          
        </div>
      </div>
    </div>
  );
};

export default Home;
