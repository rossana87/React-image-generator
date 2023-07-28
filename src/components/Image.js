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

  return (
    <main>
      <div className='form'>
        <input
          type='text'
          className='form--input'
          
        />
        <input
          type='text'
          className='form--input'
        />
        <button 
          className='form--button'
          
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