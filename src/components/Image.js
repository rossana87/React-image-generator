import { useState, useEffect } from 'react'
import axios from 'axios'

const Image = () => {

  const [image, setImage] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  })

  const [allImages, setAllImages] = useState([])

  useEffect(() => {

    const getImage = async () => {
      try {
        const { data } = await axios.get('https://api.imgflip.com/get_memes')
        console.log(data.data.memes)
        setAllImages(data.data.memes)
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [])

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * allImages.length)
    const url = allImages[randomNumber].url
    setImage((prevImage) => ({
      ...prevImage,
      randomImage: url,
    }))
    console.log(url)
    console.log('Updated image state:', image)
  }

  return (
    <main>
      <div className='form'>
        <input
          type='text'
          className='form--input'
          placeholder='Top text'
          
        />
        <input
          type='text'
          className='form--input'
          placeholder='Bottom text'
        />
        <button 
          className='form--button'
          onClick={getRandomImage}
        >
          Get new image 🖼
        </button>
      </div>
      <div className='image'>
        <img src={image.randomImage} alt="" className='image--box' />
      </div>
    </main>
  )
}

export default Image