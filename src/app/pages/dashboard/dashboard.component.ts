import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
import { ExpenseInterface } from 'src/app/interface/expenseinterface';
import { ActionService } from 'src/app/services/action/action.service';
import { DataService } from 'src/app/services/data/data.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AddExpenseComponent } from 'src/app/shared/components/add-expense/add-expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy {

  expenses:ExpenseInterface[];
  subscription:SubscriptionLike;

  constructor(
    private modalController:ModalController,
    private dataService : DataService,
    private actionsService : ActionService
    ) {
      this.expenses = [];  
      this.actionsService.getTodayExpensesFromLocal().then((value => this.expenses = value))
    }

  ngOnInit() {
    this.subscription=this.dataService.getExpensesSubsciption().subscribe({
      next:(expense)=>{
        if(expense!= null){
          
          if(Array.isArray(this.expenses)){
            this.expenses.push(expense);
          }
          else{
            this.expenses = []
            this.expenses.push(expense);
          }
          
        }
      },
      error:(err) => {console.log(err)},
      complete:()=>{}
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddExpenseComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  ngOnDestroy():void{

  }
  
}
