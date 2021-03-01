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
  timeDelay: number;
  @Output() delayScreenEvent = new EventEmitter<number>();
  @Output() startScreenEvent = new EventEmitter<boolean>();

  screenShotForm = this.formBuilder.group({
    delay: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  inputValue(event): void {
    this.timeDelay = event.target.value;
  }

  runLoad(): void{
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
