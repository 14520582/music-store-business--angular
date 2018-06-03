import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { IAlbum } from '../../interfaces/IEntity';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() category : string;
  @Input() section : any;
  @Input() albums : IAlbum[];
  data : string;
  constructor(
    private router: Router
  ) {
  }
  ngOnInit() {
    // this.realEstateService.getAllData().subscribe( data => this.realEstateData = data)
  }
  toSection() {
    this.router.navigate(['/section', {type: this.section.type, content: this.section.content}])
  }
}
