import { useEffect, useState } from 'react';

export default function App() {
  // State variables
  const [count, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
    const[secret, setSecretPhrase] =useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

const people = [
  "Shashi Koshy",
  "Dhriti Taneja",
  "Dipa Mishra",
  "Ansh Thakkar",
  "Lakshmi Thaker",
  "Sushila Matthai",
  "Shresth Nigam",
  "Bhavana Biswas",
  "Vasudha Mangat",
  "Priya Saran"
];
  // Fetch data from API
  const fetchData = async (url) => {
    try {
      let result = await fetch(url);
      let responseData = await result.json();
      setData(responseData.data); // Update data state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle counter increment
  const handleIncrement = () => {
    setCounter(count + 1);
  };

  // Handle input change for search text
  const handleInputChange = (event) => {
    setText(event.target.value);
  };
// Handle for users
     const handleUserChanges = (event) => {
       setSearchTerm(event.target.value)
    
  };

      useEffect(()=>{
         let result =  people.filter((element)=>{
             return  element.toLowerCase().includes(searchTerm.toLowerCase())
          })
          setSearchResults(result)
    },[searchTerm])
    
    // Handle Secret Phrase
    const HandleSecretPhrase = (event)=>{
        setSecretPhrase(event.target.value)
    }

    useEffect(()=>{
            if (secret === 'Hello React'){
                alert('You may Pass !')
            }
    },[secret])

  // Fetch data once when the component mounts
  useEffect(() => {
    fetchData('https://reqres.in/api/users');
  }, []);

  // Render the fetched data
  const renderUserData = () => {
    return data.map((element) => (
      <p key={element.id}>
        {element.first_name} {element.last_name}
      </p>
    ));
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment Count</button>

      <div>
        <h2>User Data:</h2>
        {renderUserData()}
      </div>

      <div>
        <h1>Searched Keyword: {text}</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleInputChange}
        />
          <h1> Enter the Secret phrase: <input
          type="text"
          placeholder="Search..."
          onChange={HandleSecretPhrase}
        /></h1>
          <p>Hint it's Hello React</p>
          <h1>Searched Users: </h1> {people}
        <input
          type="text"
          placeholder="Search Usersssss..."
          onChange={handleUserChanges}
        />
           <ul>
        {searchResults.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}
