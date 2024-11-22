import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState([]);
  

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      fetchMetadata(); // Refresh file list
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  const fetchMetadata = async () => {
    const res = await axios.get('http://localhost:5000/files');
    setMetadata(res.data);
  }
  return (
    <div>&nbsp;
      <h1>File Upload</h1>&nbsp;
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Files</h2>
      <ul>
        {metadata.map(file => (
          <li key = {file._id}>{file.filename}</li>
        ))}
      </ul>
    </div>

  );
}

export default App;
