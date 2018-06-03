import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-filter',
  templateUrl: './tab-filter.component.html',
  styleUrls: ['./tab-filter.component.scss']
})
export class TabFilterComponent implements OnInit {
  term : string = ''
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  toSearchResult(){
      this.router.navigate(['/section', {type: 0, content: this.term}]);
  }
}
