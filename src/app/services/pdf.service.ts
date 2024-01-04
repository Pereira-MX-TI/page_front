import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  constructor() {}  

  generatePDF(name:any,content:any)
  {
    const byteArray = new Uint8Array(atob(content).split('').map(char => char.charCodeAt(0)));
    const blob = new Blob([byteArray], {type: 'application/pdf'});

    const download=document.createElement('a');
    const url = URL.createObjectURL(blob);
    if(navigator.userAgent.indexOf('Safari')!== -1 && navigator.userAgent.indexOf('Chrome')===-1)
      download.setAttribute('target','_blank');

    download.setAttribute('href',url);
    download.setAttribute('download',name+'.pdf');
    download.style.visibility="hidden";
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  }
}