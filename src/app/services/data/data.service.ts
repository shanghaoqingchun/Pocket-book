import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExpenseInterface } from 'src/app/interface/expenseinterface';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _expenses:BehaviorSubject<ExpenseInterface>
  constructor() {
    this._expenses = new BehaviorSubject<ExpenseInterface>(null)
   }

  async getExpenses():Promise<ExpenseInterface>{
    return this._expenses.getValue();
  }

  async setExpenses(expenses:ExpenseInterface):Promise<void>{
    return this._expenses.next(expenses);
  }

  getExpensesSubsciption():BehaviorSubject<ExpenseInterface>{
    return this._expenses;
  }

}
