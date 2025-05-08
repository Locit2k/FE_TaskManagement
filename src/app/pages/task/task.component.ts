import { Component } from '@angular/core';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-task',
  imports: [ScheduleModule],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  //views:string[] = ["Day","Week","WorkWeek","Month","Agenda"]
  currentView:string = "WorkWeek";
  selectedDate:Date = new Date();

  constructor(){}
}
