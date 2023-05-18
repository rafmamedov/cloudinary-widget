import React, { useState } from 'react';
import './App.css';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';
import axios from 'axios';

const URL = 'https://www.albedosunrise.com/images/getUrl/';

type Image = {
  ratio: number;
  url: string;
}

function App() {
  const [publicId, setPublicId] = useState('');
  const [images, setImages] = useState<Image[]>([]);

  const getImage = async () => {
    await axios.get(URL + publicId)
      .then(response => {
        setImages(current => [...current, response.data]);
  })};

  const getRatio05 = images.find(img => img.ratio === 0.5)?.url || '';

  const getRatio1 = images.find(img => img.ratio === 1)?.url || '';

  const getRatio15 = images.find(img => img.ratio === 1.5)?.url || '';

  const getRatio2 = images.find(img => img.ratio === 2)?.url || '';

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
        <div className="one"><img src={getRatio05} alt="" /></div>
        <div className="two"><img src={getRatio1} alt="" /></div>
        <div className="three"><img src={getRatio15} alt="" /></div>
        <div className="four"><img src={getRatio2} alt="" /></div>
      </section>
    </div>
  );
}

export default App;
