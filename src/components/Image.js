import { useState, useEffect } from 'react'
import axios from 'axios'


const Image = () => {

  const [image, setImage] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/1c1uej.jpg',
  })

  const [allImages, setAllImages] = useState([])

  useEffect(() => {

    const getImage = async () => {
      try {
        const { data } = await axios.get('https://api.imgflip.com/get_memes')
        setAllImages(data.data.memes)
      } catch (error) {
        console.log(error)
      }
    }
    getImage()
  }, [])

  const getRandomImage = () => {
    if (allImages.length > 0) {
      const randomNumber = Math.floor(Math.random() * allImages.length)
      const url = allImages[randomNumber].url
      setImage((prevImage) => ({
        ...prevImage,
        randomImage: url,
      }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setImage(prevImage => ({
      ...prevImage,
      [name]: value,
    }))
  }

  return (
    <main>
      <div className='form'>
        <input
          type='text'
          className='form--input'
          placeholder='Top text'
          name='topText'
          onChange={handleChange}
          value={image.topText}
        />
        <input
          type='text'
          className='form--input'
          placeholder='Bottom text'
          name='bottomText'
          onChange={handleChange}
          value={image.bottomText}
        />
        <button 
          className='form--button'
          onClick={getRandomImage}
        >
          Get new image 🖼
        </button>
      </div>
      <div className='image'>
        <img src={image.randomImage} 
          className='image--box' 
        />
        <h2 className="image--text top">{image.topText}</h2>
        <h2 className="image--text bottom">{image.bottomText}</h2>
      </div>
    </main>
  )
}

export default Image