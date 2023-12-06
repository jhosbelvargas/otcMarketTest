"use client";
import { useState } from 'react';

const ImageEdit = () => {
  const [originalImage, setOriginalImage] = useState('');
  const [frameImage, setFrameImage] = useState('');
  const [text, setText] = useState('');
  const [editedImage, setEditedImage] = useState('');

  const applyFrameAndText = async () => {
    if (originalImage && frameImage) {
      const originalImageElement = document.createElement('img');
      originalImageElement.src = originalImage;

      const frameImageElement = document.createElement('img');
      frameImageElement.src = frameImage;

      frameImageElement.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = originalImageElement.width;
        canvas.height = originalImageElement.height;

        const context = canvas.getContext('2d');

        // Dibuja la imagen original primero
        context.drawImage(originalImageElement, 0, 0, originalImageElement.width, originalImageElement.height);

        // Luego, dibuja el marco encima
        context.drawImage(frameImageElement, 0, 0, originalImageElement.width, originalImageElement.height);

        // Agrega texto en el centro inferior de la imagen
        if (text) {
          context.font = '20px Arial';
          context.fillStyle = 'white';

          const textWidth = context.measureText(text).width;
          const x = (originalImageElement.width - textWidth) / 2;
          const y = originalImageElement.height - 100; // 10 es la distancia desde la parte inferior

          context.fillText(text, x, y);
        }

        const editedImageUrl = canvas.toDataURL('image/jpeg');
        setEditedImage(editedImageUrl);
        localStorage.setItem('imagenTest', editedImageUrl)
      };
    }
  };

  const handleOriginalImageChange = (event) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setOriginalImage(fileReader.result);
    };

    fileReader.readAsDataURL(event.target.files[0]);
  };

  const handleFrameImageChange = (event) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setFrameImage(fileReader.result);
    };

    fileReader.readAsDataURL(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="file" onChange={handleOriginalImageChange} accept="image/*" />
      <input type="file" onChange={handleFrameImageChange} accept="image/*" />
      <input type="text" value={text} onChange={handleTextChange} placeholder="Add Text" />
      {originalImage && <img src={originalImage} alt="Original Image" />}
      {frameImage && <img src={frameImage} alt="Frame Image" />}
      <button onClick={applyFrameAndText}>Apply Frame and Text</button>
      {editedImage && <img src={editedImage} alt="Edited Image" />}
    </div>
  );
};

export default ImageEdit;
/* import { useState } from 'react';

const ImageEdit = () => {
  const [originalImage, setOriginalImage] = useState('');
  const [frameImage, setFrameImage] = useState('');
  const [editedImage, setEditedImage] = useState('');

  const applyFrame = async () => {
    if (originalImage && frameImage) {
      const originalImageElement = document.createElement('img');
      originalImageElement.src = originalImage;

      const frameImageElement = document.createElement('img');
      frameImageElement.src = frameImage;

      frameImageElement.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = originalImageElement.width;
        canvas.height = originalImageElement.height;

        const context = canvas.getContext('2d');

        // Dibuja la imagen original primero
        context.drawImage(originalImageElement, 0, 0, originalImageElement.width, originalImageElement.height);

        // Luego, dibuja el marco encima
        context.drawImage(frameImageElement, 0, 0, originalImageElement.width, originalImageElement.height);

        const editedImageUrl = canvas.toDataURL('image/jpeg');
        setEditedImage(editedImageUrl);
      };
    }
  };

  const handleOriginalImageChange = (event) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setOriginalImage(fileReader.result);
    };

    fileReader.readAsDataURL(event.target.files[0]);
  };

  const handleFrameImageChange = (event) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setFrameImage(fileReader.result);
    };

    fileReader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleOriginalImageChange} accept="image/*" />
      <input type="file" onChange={handleFrameImageChange} accept="image/*" />
      {originalImage && <img src={originalImage} alt="Original Image" />}
      {frameImage && <img src={frameImage} alt="Frame Image" />}
      <button onClick={applyFrame}>Apply Frame</button>
      {editedImage && <img src={editedImage} alt="Edited Image" />}
    </div>
  );
};

export default ImageEdit; */