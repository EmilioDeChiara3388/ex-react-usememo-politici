import { useState, useEffect } from "react"

function App() {

  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

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

  const filteredResults = search ? politicians.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.biography.toLowerCase().includes(search.toLowerCase())
  ) : politicians;

  return (
    <>
      <div className="container">
        <h1>Lista Politici</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Cerca per nome o biografia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="row">
          {filteredResults && filteredResults.map((p, id) =>
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
