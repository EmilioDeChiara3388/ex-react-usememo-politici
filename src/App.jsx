import { useState, useEffect } from "react"

function App() {

  const [politicians, setPoliticians] = useState([])
  async function getList() {
    try {
      const response = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      const data = await response.json()
      setPoliticians(data)
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getList();
  }, [])

  return (
    <>
      <div className="container">
        <h1>Lista Politici</h1>
        <div className="row">
          {politicians && politicians.map((p, id) =>
            <div className="col" key={id}>
              <h3>{p.name}</h3>
              <img src={p.image} alt="" />
              <span><strong>{p.position}</strong></span>
              <p>{p.biography}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
