import React, { useState } from 'react';
import axios from 'axios';

function ImageDescriptionGenerator() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [mimetype, setmimetype]=useState('image/jpeg')
  
  const API_KEY = 'AIzaSyAl4rFhNir1Du_yQFY331nfgDzJGGfhWtc'

  const handleImageChange = (event) => {
    const file= event.target.files[0]
    if (file ) {
      setImage(file);
      setmimetype(file.type)
      
    } else {
      // Notify the user that only JPEG files are allowed
      alert('Please select a image file.');
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  const generateDescription = async () => {
    if (!image) {
      alert('Please upload an image.');
      return;
    }

    const formData = new FormData();
    const b64=await convertToBase64(image)
    formData.append('image',b64);
    formData.append('prompt', prompt);
    formData.append('generationConfig', JSON.stringify({
      temperature: 0.9,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
      stopSequences: []
    }));
    formData.append('safetySettings', JSON.stringify([
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH"
      }
    ]));

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: formData.get('prompt')
            },
            {
              inlineData: {
                mimeType: mimetype,
                data: formData.get('image')  // Get base64 image data
              }
            }
          ]
        }
      ],
      generationConfig: JSON.parse(formData.get('generationConfig')),
      safetySettings: JSON.parse(formData.get('safetySettings'))
    }
    console.log(requestBody)

    try {

      const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + API_KEY, requestBody, {
        headers: {
          'Content-Type': 'pplication/json',
        },
      });

      setDescription(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error generating description:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Image Description Generator</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <textarea
        placeholder="Enter prompt..."
        value={prompt}
        onChange={handlePromptChange}
      ></textarea>
      <button onClick={generateDescription}>Generate Description</button>
      {description && (
        <div>
          <h3>Generated Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default ImageDescriptionGenerator;
