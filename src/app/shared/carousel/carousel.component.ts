import { Component, OnInit, Input } from '@angular/core';
import { IAlbum } from '../../interfaces/IEntity';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() category : string;
  @Input() albums : IAlbum[];
  data : string;
  constructor() {
  }
  ngOnInit() {
    // this.realEstateService.getAllData().subscribe( data => this.realEstateData = data)
  }

}
