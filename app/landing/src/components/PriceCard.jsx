import { IoShieldCheckmarkSharp } from "react-icons/io5";

const PriceCard = ({
    id,
    name,
    color,
    who,
    range,
    list,
    mwidth
}) => {


  return (
    <div className="enterprise-card" key={id} style={{display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "space-between", alignContent: "center", textAlign: "center", padding: "2rem", width: "100%", maxWidth: `${mwidth}`, border: `2px solid #3b3b3bff`, borderRadius: "10px", backgroundFilter: "blur(20px)", backgroundColor: "#000000"}}>

          <div>
          <h2 style={{padding: ".5rem", borderRadius: "100px", fontWeight: "400", width: "100%", maxWidth: "200px", border: `2px solid ${color}`, color: `${color}`, margin: "0 auto"}}>{name}</h2>

          <div style={{margin: "1.5rem 0"}}>
          <span style={{fontSize: "3rem", fontWeight: 'bold'}}>{range}</span>
          <span>/ monthly</span>
          </div>

          <p style={{fontSize: "1.2rem"}}>{who}</p>
          </div>

          <div style={{display: 'flex', justifyContent: "start", alignContent: "start", height: "auto"}}>
          <ul style={{textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.9rem", listStyle: "none", marginBottom: "1rem"}}>
            {list.map((item, i) => <li key={i}><IoShieldCheckmarkSharp style={{fontSize: "1.2rem", marginTop: "1rem", marginBottom: "-.8rem", marginRight: ".5rem", border: "1px solid #3b3b3bff", padding: ".5rem", borderRadius: "5px"}} />{" "}{item}</li>)}
          </ul>
          </div>

          <button style={{backgroundColor: `${color}`, padding: "0.5rem 1rem", borderRadius: "100px", border: `2px solid ${color}`, cursor: "pointer", color: "black", fontWeight: "bold", fontSize: "1.125rem"}}>Get Started</button>
        </div>
  )
}

export default PriceCard
