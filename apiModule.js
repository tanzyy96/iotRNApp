import { Alert } from "react-native";

const URL = 'http://20.198.225.105:5000/test'

const testURL = "http://20.198.225.105:5000/"

const formData = new FormData();

// formData.append('file', fileInput.files[0]);

//     const options = {
//       method: 'POST',
//       body: formData,
//       // If you add this, upload won't work
//       // headers: {
//       //   'Content-Type': 'multipart/form-data',
//       // }
//     };
    
//     fetch('your-upload-url', options);

export const testEndpoint = async () => {
  fetch(testURL)
  .then((resp) => resp.text()) 
  .then((resp) => {
    console.log("It's testing working!", resp)
  })
}

export const sendPicture = async (filepath, setResp) => {

  const formData = new FormData()

  formData.append('testImage', {uri: filepath, name: 'test.png',filename :'test.png',type: 'image/png'})
  formData.append('testString', 'answer')
  // formData.append('testImage', {uri: filepath,name: 'test.png',filename :'test.png',type: 'image/png'})

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  })
  .then((resp) => resp.text())
  .then((resp) => Alert.alert(resp))
  .catch((error) => {
    console.error(error);
    Alert.alert("error!")
});
}