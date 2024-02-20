import axios from 'axios';



const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

const callGemini= async ({image, prompt})=>{
    const API_KEY = 'AIzaSyAl4rFhNir1Du_yQFY331nfgDzJGGfhWtc';
    const mimetype=image.type;
    
    console.log(image, prompt)

    const formData = new FormData();
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

    if(image!=null){
        const b64=await convertToBase64(image)
        formData.append('image',b64);
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
      
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro-vision-latest:generateContent?key=' + API_KEY, requestBody, {
              headers: {
                'Content-Type': 'aplication/json',
              },
            });
      
            const res =response.data.candidates[0].content.parts[0].text;


            // const response = await axios.get('http://127.0.0.1:5000/', {
            //   headers: {
            //     'Content-Type': 'aplication/json',
            //   },
            // });
      
            // const res =response.data.data.text_content;

            
            return res;
          } catch (error) {
            console.error('Error generating description:', error);
            return null;
          }
    }else{
        const requestBody = {
            contents: [
              {
                parts: [
                  {
                    text: formData.get('prompt')
                  }
                ]
              }
            ],
            generationConfig: JSON.parse(formData.get('generationConfig')),
            safetySettings: JSON.parse(formData.get('safetySettings'))
          }
          console.log(requestBody)
      
          try {
      
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=' + API_KEY, requestBody, {
              headers: {
                'Content-Type': 'aplication/json',
              },
            });

      
            const res =response.data.candidates[0].content.parts[0].text;
            return res;
          } catch (error) {
            console.error('Error generating description:', error);
            return null;
          }
    }


}
export default callGemini;