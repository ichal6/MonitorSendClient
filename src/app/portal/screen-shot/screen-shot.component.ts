import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PortalService} from '../../service/portal.service';
import {interval, Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-screen-shot',
  templateUrl: './screen-shot.component.html',
  styleUrls: ['./screen-shot.component.css']
})
export class ScreenShotComponent implements OnInit, OnChanges {

  constructor(private portalService: PortalService) { }

  imageToShow: any;
  @Input() isImageLoading: boolean;
  subscription: Subscription;
  @Input() delay: number;
  @Input() isRun: boolean;
  @Input() serverAddress: string;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void{
    console.log(this.delay, this.isRun, this.isImageLoading);
    this.disableServer();
    if (this.isRun && this.delay != null && this.serverAddress != null) {
      this.loadScreenShot(this.delay, this.serverAddress);
    }
  }

  loadScreenShot(delay: number, serverAddress: string): void{
    this.isImageLoading = true;
    this.subscription = interval(delay).pipe(
      mergeMap(() => this.portalService.getScreenShot('http://' + serverAddress + ':8080')),
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

  disableServer(): void {
    if (this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

}
