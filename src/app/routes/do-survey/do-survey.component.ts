import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/get-question-response';
import { SubmitAnswerResponse } from 'src/app/models/submit-answer-response';

@Component({
  selector: 'app-do-survey',
  templateUrl: './do-survey.component.html',
  styleUrls: ['./do-survey.component.css'],
})
export class DoSurveyComponent implements OnInit {
  questionList: Array<Question>;
  currentQuestionIndex: number;
  currentQuestion: Question;
  submittedAnswers: any = {};
  submitted: boolean;
  showResult: boolean;
  answerResponse: Array<SubmitAnswerResponse>;
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAllQuestion();
    this.submitted = false;
    this.showResult = false;
  }

  loadAllQuestion() {
    this.questionService.getQuestion().subscribe(
      (response) => {
        if (response.success) {
          this.questionList = response.sendQuestion;
          this.currentQuestionIndex = 0;
          this.currentQuestion = this.questionList[this.currentQuestionIndex];
          this.questionList.forEach((question) => {
            this.submittedAnswers[question._id] = '';
          });
        } else {
          this.toastrService.error('Can not load questions');
        }
      },
      (err) => {
        this.toastrService.error('Can not load questions');
      }
    );
  }

  switchQuestion(questionIndex) {
    this.currentQuestionIndex = questionIndex;
    this.currentQuestion = this.questionList[questionIndex];
    if (this.submitted) {
      this.showResult = false;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionList.length) {
      this.switchQuestion(this.currentQuestionIndex + 1);
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.switchQuestion(this.currentQuestionIndex - 1);
    }
  }

  isFirstQuestion() {
    return this.currentQuestionIndex === 0;
  }

  isLastQuestion() {
    return this.currentQuestionIndex === this.questionList?.length - 1;
  }

  displayResult() {
    this.showResult = true;
  }

  submitAnswer() {
    this.questionService.submitAnswer(this.submittedAnswers).subscribe(
      (response) => {
        if (response !== null && response.length > 0) {
          this.submitted = true;
          this.showResult = true;
          this.answerResponse = response;
          this.currentQuestionIndex = -1;
        } else {
          this.toastrService.error('Can not submit answers!');
        }
      },
      (err) => {
        if (err.status === 401) {
          this.toastrService.error('Session expired');
          this.router.navigate(['auth/login']);
        } else {
          this.toastrService.error('Can not submit answers!');
        }
      }
    );
  }

  get numberOfCorrectAnswers() {
    return this.answerResponse.filter((answer) => answer.result).length;
  }

  getStatusOfAnswer(index) {
    let status: any = {
      done: false,
      notdone: false,
      correct: false,
      incorrect: false,
    };
    status.active = this.currentQuestionIndex === index && !this.showResult;

    let answerOfQuestion = '';
    if (this.questionList && index > -1) {
      answerOfQuestion = this.submittedAnswers[this.questionList[index]._id];
    }

    if (answerOfQuestion !== '') {
      status.done = true;
    } else {
      status.notdone = true;
    }

    if (this.answerResponse && index > -1) {
      if (this.answerResponse[index].result) {
        status.correct = true;
      } else {
        status.incorrect = true;
      }
    }
    return status;
  }
}
