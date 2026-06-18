import { CommonModule } from '@angular/common';
import { ihomeData } from '../Model/ihomeData';
import {Component, inject, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DownloadService } from '../service/download.service';
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HOMEComponent implements OnInit {
  router = inject(Router);
  download = inject(DownloadService);

  hd:ihomeData={
  name:" מלכה קנפלמכר ",
  phon:'',
  img:'5.jpg',
  text1:"Angular",
  text2:"REACT",
  text3:"C++",
  text4:"SQL",
  text5:"JAVA",
  text6:"AWS",
  text7:"NODE.JS",
  text8:"GIT",
  text9:"HTML",
  text10:"CSS",
  text11:"PYTHON",
  text12:"C#",
  text13:"N8N",
  text14:"GITHUB",

  }
  ngOnInit(): void {}
  gotoTasks(){
         this.router.navigate(['/main']);
    }
click(){
 this.hd.phon="📞053-3177526"
}
   openCV(){
      this.download.downloadCv().subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cv.pdf'; // ✅ Set desired file name
            a.click();
            window.URL.revokeObjectURL(url); // clean up
      });
    }
}


          


