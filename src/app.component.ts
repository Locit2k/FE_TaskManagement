import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './app/core/services/spinner/spinner.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule,CommonModule,RouterOutlet,ToastModule],
    providers:[MessageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    loading$:BehaviorSubject<boolean>;
    constructor(
      private spinnerService:SpinnerService
    )
    {
      this.loading$ = spinnerService.spinner$;
    }
  }
