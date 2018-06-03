import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onActivate(event) {
    window.scroll(0, 0);
  }
}
