import React, { useState } from 'react';
import './App.css';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';
import axios from 'axios';

const URL = 'https://www.albedosunrise.com/images/getUrl/';

function App() {
  const [publicId, setPublicId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const getImage = async () => {
    await axios.get(URL + publicId)
      .then(response => {
        setImageUrl(response.data.url);
  })};

  return (
    <div className="App">
      <header className="App-header">
        Cloudinary upload widget
        <CloudinaryUploadWidget
          setPublicId={setPublicId}
          getImage={getImage}
        />
      </header>

      <section className="gallery">
        <div className="one"><img src="" alt="" /></div>
        <div className="two"><img src="" alt="" /></div>
        <div className="three"><img src="" alt="" /></div>
        <div className="four"><img src={imageUrl} alt="" /></div>
      </section>
    </div>
  );
}

export default App;
