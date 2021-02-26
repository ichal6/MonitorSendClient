import { Component, OnInit } from '@angular/core';
import {PortalService} from '../service/portal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private portalService: PortalService) { }

  imageToShow: any;
  isImageLoading: boolean;

  ngOnInit(): void {
    this.loadScreenShot();
  }

  loadScreenShot(): void{
    this.isImageLoading = true;
    this.portalService.getScreenShot('http://localhost:8080').subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
