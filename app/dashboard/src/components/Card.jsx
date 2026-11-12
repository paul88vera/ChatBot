const Card = ({name, role, review}) => {
  return (
    <div className="card">
            <div className="card-title">
              <h3>{name}</h3>
              <h4>{role}</h4>
            </div>
            <div className="card-content">
              <p>
                "{review}"
              </p>
            </div>
          </div>
  )
}

export default Card
