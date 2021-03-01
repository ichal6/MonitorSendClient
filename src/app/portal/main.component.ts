import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  delay: number;
  isRunScreenShots: boolean;
  isFrozenLastImage: boolean;
  serverAddress: string;

  ngOnInit(): void {
  }

  runScreenShots(delay: number): void {
    this.delay = delay;
  }

}
