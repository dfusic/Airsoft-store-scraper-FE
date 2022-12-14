import { useEffect, useState } from "react"
import axios from "axios";
import "./App.css"
const App = () => {

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleSearch = () => {
    axios.get(`http://localhost:3000/?search=${inputValue}`).then(response => {
      setItems(response.data);
    })
  }
  const handleSort = (e) => {
    axios.get(`http://localhost:3000/?sort=${e.target.value}`).then(response => {
      setItems(response.data);
    })
  }
  const handleReset = () => {
    axios.get('http://localhost:3000/').then(response => {
      setItems(response.data);
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/').then(response => {
      setItems(response.data);
    })
  }, [])

  return (
    <div>
      <h1>Hristo scraper</h1>
      <input type="text" onChange={handleInputChange} value={inputValue} />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleSort} value='asc'>Ascending</button>
      <button onClick={handleSort} value='desc'>Descending</button>
      <button onClick={handleReset}>Reset filters</button>
      <div id="hristo">
      {items.map(item => (
            <ul className='item'>
              <li className='item-title' style={{color: item.available ? 'green' : 'red'}}>{item.title}</li>
              <li>{item.priceEuro}</li>
              <li>discounted: {String(item.isDiscounted)}</li>
              <li>available: {String(item.available)}</li>
              <li>
                <a href={item.url} target='_blank'>{item.url}</a>
              </li>
            </ul>
        ))}
      </div>

    </div>
  )
}

export default App