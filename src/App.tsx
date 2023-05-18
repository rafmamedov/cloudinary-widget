import React, { useEffect, useState } from 'react';
import './App.css';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';
import axios from 'axios';

const URL = 'https://www.albedosunrise.com/images/getUrl/';
const GETIMAGES = 'https://www.albedosunrise.com/images/mainPage';

type Image = {
  publicId: string;
  imageUrl: string;
  currentRatio: number;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);

  const getImages = async () => {
    await axios.get(GETIMAGES)
      .then(response => {
        setImages(response.data);
  })};

  useEffect(() => {
    getImages();
  }, []);

  const getRatio05 = images.find(img => img.currentRatio === 0.5)?.imageUrl || '';

  const getRatio1 = images.find(img => img.currentRatio === 1)?.imageUrl || '';

  const getRatio15 = images.find(img => img.currentRatio === 1.5)?.imageUrl || '';

  const getRatio2 = images.find(img => img.currentRatio === 2)?.imageUrl || '';

  return (
    <div className="App">
      <header className="App-header">
        Cloudinary upload widget
        <CloudinaryUploadWidget />
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
