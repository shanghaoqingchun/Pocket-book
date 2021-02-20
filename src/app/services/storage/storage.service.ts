import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ExpenseInterface } from 'src/app/interface/expenseinterface';
import { DatetimeService } from '../datetime/datetime.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dateTimeService:DatetimeService) { }

  async saveExpenseToLocal(expense:ExpenseInterface):Promise<void>{
    const key = this.dateTimeService.getDateTimeISO();
    let todaysExpenses : ExpenseInterface[] = [];
    this.getFromLocalStorage(key).then((expenses:ExpenseInterface[])=>{

      if( expenses ==null){
        todaysExpenses.push(expense);
      }
      else{
        todaysExpenses = expenses;
        todaysExpenses.push(expense);
      }
    }).then(()=>{
      this.saveToLocalStorage(key,todaysExpenses);
      
    }).catch((err)=>console.log(err))
    
  }

  async getExpenseFromLocal(date?:Date):Promise<ExpenseInterface[]>{
    const key = date ? this.dateTimeService.getDateTimeISO(date):this.dateTimeService.getDateTimeISO();
    return await this.getFromLocalStorage(key).then((expenses:ExpenseInterface[])=>{
      return expenses;
    })
  }


  async saveToLocalStorage(key:string,value:ExpenseInterface[]):Promise<void> {
    await Plugins.Storage.set({
      key, 
      value: JSON.stringify(value)
    });
  }
  
  // JSON "get" example
  async getFromLocalStorage(key:string):Promise<any> {
    const ret = await Plugins.Storage.get({key});
    return JSON.parse(ret.value);
  }

  async removeFromLocalStorage(key:string):Promise<void>{
   return await Plugins.Storage.remove({key})
  }

  async clearLocalStorage():Promise<void>{
    return await Storage.clear();
  }
  
}
