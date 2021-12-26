import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Farm } from './models/farm.model';
import { FarmService } from './services/farm/farm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor() {}

}
