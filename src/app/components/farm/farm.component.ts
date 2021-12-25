import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'src/app/models/farm.model';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.sass']
})
export class FarmComponent implements OnInit {

  @Input() farm!: Farm;

  constructor() { }

  ngOnInit(): void { }

}
