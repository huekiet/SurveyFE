import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css'],
})
export class DisplayResultComponent implements OnInit {
  @Input()
  totalQuestion: number;
  @Input()
  correctAnswers: number;
  @Output()
  reviewClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  get score() {
    return Math.ceil((this.correctAnswers * 100) / this.totalQuestion);
  }

  retakeSurvey() {
    window.location.reload();
  }

  reviewAnswer() {
    this.reviewClick.emit(null);
  }
}
