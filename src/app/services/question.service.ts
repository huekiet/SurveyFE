import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { GetQuestionResponse } from '../models/get-question-response';
import { AppConstant } from '../_constant/app-constant';
import { SubmitAnswerResponse } from '../models/submit-answer-response';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private baseService: BaseService) {}

  getQuestion(): Observable<GetQuestionResponse> {
    return this.baseService.get<GetQuestionResponse>(
      `${AppConstant.API_URL}/questions`
    );
  }

  submitAnswer(data): Observable<Array<SubmitAnswerResponse>> {
    return this.baseService.post<Array<SubmitAnswerResponse>>(
      `${AppConstant.API_URL}/questions/submit`,
      data
    );
  }
}
