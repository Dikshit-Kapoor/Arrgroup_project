import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
downloadpdf(){
  this.http.get('').subscribe(res=>{
   
  const byteArray = new Uint8Array(
    atob(JSON.stringify(res))
      .split("")
      .map(char => char.charCodeAt(0))
  );
  const file = new Blob([byteArray], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);
  let pdfName = "reports.pdf";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, pdfName);
  } else {
    
    let link = document.createElement("a");
    link.download = pdfName;
    link.target = "_blank";

   
    link.href = fileURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
})
}}
