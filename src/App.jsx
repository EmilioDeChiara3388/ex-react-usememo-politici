import React, { useState, useEffect } from "react"

const PoliticiansCard = React.memo(({ name, image, position, biography }) => {
  console.log("Render PoliticiansCards :", name)
  return (
    <>
      <div className="col">
        <h3>{name}</h3>
        <img src={image} alt="" />
        <span><strong>{position}</strong></span>
        <p>{biography}</p>
      </div>
    </>)
})

function App() {

  const [politicians, setPoliticians] = useState([])
  const [search, setSearch] = useState("")

  async function getList() {
    try {
      const response = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      const data = await response.json()
      setPoliticians(data)
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
            <PoliticiansCard key={id} {...p} />
          )}
        </div>
      </div>
    </>
  )
}

export default App
