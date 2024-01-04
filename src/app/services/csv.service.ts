import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {


  constructor() { 
  }
  generateCSV(name:any,content:any)
  {
    const blob = new Blob(['\ufeff',content], { type: 'text/csv;charset=utf-8' });
    const download=document.createElement('a');
    const url = URL.createObjectURL(blob);
    if(navigator.userAgent.indexOf('Safari')!== -1 && navigator.userAgent.indexOf('Chrome')===-1)
      download.setAttribute('target','_blank');

    download.setAttribute('href',url);
    download.setAttribute('download',name+'.csv');
    download.style.visibility="hidden";
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
  }
}
