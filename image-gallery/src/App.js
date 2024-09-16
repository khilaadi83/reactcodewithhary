import React, { useState, useEffect } from 'react'
import Image from './components/Image';
export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [term, setTerm] = useState('nature')
  var url = `https://pixabay.com/api/?key=${process.env.REACT_APP_SECRET_KEY}&q=${term}&image_type=photo&pretty=true`;

  useEffect(() => {
    console.log(url)
    const apiCall = async () => {
      try {
        const result = await fetch(url)
        const response = await result.json();
        setImages(response.hits);
        setLoading(false)

        
        console.log(response);
      } catch (e) {
        console.log('some error occured', e)
      }
    }
    apiCall()
  }, [url])



  return (
  
    <Image setTerm={setTerm} images={images}/>
 
  )
}