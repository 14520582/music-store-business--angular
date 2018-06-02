import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../service/album.service';
import { IAlbum } from '../../interfaces/IEntity';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  kpopAlbum: IAlbum[];
  usukAlbum: IAlbum[];
  japanAlbum: IAlbum[];
  vpopAlbum: IAlbum[];
  constructor(
    private albumService: AlbumService
  ) {
    this.albumService.getNewReleaseCountry(0, 8, 'South Korea').subscribe(data => {
      this.kpopAlbum = data.content;
      console.log(data)
    },
    error => {
      console.log(error)
    })
    this.albumService.getNewReleaseCountry(0, 8, 'United').subscribe(data => {
      this.usukAlbum = data.content;
    },
    error => {
      console.log(error)
    })
    this.albumService.getNewReleaseCountry(0, 8, 'Japan').subscribe(data => {
      this.japanAlbum = data.content;
    },
    error => {
      console.log(error)
    })
    this.albumService.getNewReleaseCountry(0, 8, 'Viet Nam').subscribe(data => {
      this.vpopAlbum = data.content;
    },
    error => {
      console.log(error)
    })
  }
  ngOnInit() {
  }

}
