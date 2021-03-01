import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Output() displayLastScreenEvent = new EventEmitter<boolean>();
  @Output() delayScreenEvent = new EventEmitter<number>();
  @Output() startScreenEvent = new EventEmitter<boolean>();
  @Output() changeServerAddress = new EventEmitter<string>();
  timeDelay: number;
  @Output() serverAddress: string;

  screenShotForm = this.formBuilder.group({
    delay: '',
    server: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  inputValue(event): void {
    this.timeDelay = event.target.value;
  }

  fillServerAddress(event): void {
    this.serverAddress = event.target.value;
  }

  runLoad(): void{
    this.changeServerAddress.emit(this.serverAddress);
    this.startScreenEvent.emit(true);
    this.delayScreenEvent.emit(this.timeDelay);
  }

  stopLoad(): void{
    this.displayLastScreenEvent.emit(false);
    this.startScreenEvent.emit(false);
  }

  frozenScreen(): void{
    this.displayLastScreenEvent.emit(true);
  }

}
