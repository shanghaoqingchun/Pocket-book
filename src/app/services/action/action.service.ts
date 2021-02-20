import { Injectable } from '@angular/core';
import { ExpenseInterface } from 'src/app/interface/expenseinterface';
import { DataService } from '../data/data.service';
import { DatetimeService } from '../datetime/datetime.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
    private dataServices:DataService,
    private storageService:StorageService,
    private dateTimeService:DatetimeService
    ) {
    
   }

   async createExpense(expense:ExpenseInterface):Promise<void>{
     const key = this.dateTimeService.getDateTimeISO(expense.createdOn)
     this.storageService.saveExpenseToLocal(expense);
     return this.dataServices.setExpenses(expense);
   }

   async getTodayExpensesFromLocal():Promise<ExpenseInterface[]>{
     return await this.storageService.getExpenseFromLocal().then((expenses:ExpenseInterface[])=>{
       return expenses;
     })
   }


}

