import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import { ActionService } from 'src/app/services/action/action.service';
import { DatetimeService } from 'src/app/services/datetime/datetime.service';



@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  constructor(
    private modalController :ModalController,
    private actionService:ActionService,
    private dateTimeService:DatetimeService
    ) { 
    
   }

  ngOnInit() {
    console.log(this.addExpenseForm.value)
  }

  addExpenseForm = new FormGroup({
    amount:new FormControl('',Validators.required),
    description:new FormControl(''),
    type:new FormControl('',Validators.required),
    // createdOn:new FormControl('')
  })


  initCreateExpense(): void{
    const expense = this.addExpenseForm.value;
    expense.createdOn = this.dateTimeService.getCurrentDateTime();
    this.actionService.createExpense(expense).then(()=>{
      console.log('Expense was Created');
      this.dismissModal();
    }).catch((err)=>console.log(err));
  }

 
  dismissModal():void{
    this.modalController.dismiss().then().catch();
  }

}
