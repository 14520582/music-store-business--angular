import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-filter',
  templateUrl: './tab-filter.component.html',
  styleUrls: ['./tab-filter.component.scss']
})
export class TabFilterComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  toSearchResult(){
      this.router.navigate(['/search-result/']);
  }
}
