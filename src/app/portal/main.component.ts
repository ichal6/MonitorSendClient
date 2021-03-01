import { Component, OnInit } from '@angular/core';
import {PortalService} from '../service/portal.service';
import {interval, Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private portalService: PortalService) { }

  imageToShow: any;
  isImageLoading: boolean;
  subscription: Subscription;
  timeDelay = 300;

  ngOnInit(): void {
  }

  inputValue(event): void {
   this.timeDelay = event.target.value;
   console.log(this.timeDelay);
  }

  runLoad(): void{
    this.loadScreenShot(this.timeDelay);
  }

  loadScreenShot(delay: number): void{
    this.isImageLoading = true;
    this.subscription = interval(delay).pipe(
      mergeMap(() => this.portalService.getScreenShot('http://localhost:8080')),
    ).subscribe(data => {
      this.createImageFromBlob(data);
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

  disableServer(): void{
    this.isImageLoading = false;
    this.subscription.unsubscribe();
  }

}
