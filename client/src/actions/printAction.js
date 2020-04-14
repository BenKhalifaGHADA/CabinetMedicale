import axios from 'axios';
import { saveAs } from 'file-saver';

export const createAndDownloadPdf = async () => {
        
  axios.post('/api/profile/create-pdf', 15,14,13)
  .then(() => axios.get('/api/profile/fetch-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'newPdf.pdf');
  })
  
          
      };    
