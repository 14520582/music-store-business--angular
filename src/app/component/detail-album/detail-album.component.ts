import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../service/album.service';
import { ActivatedRoute } from '@angular/router';
import { IAlbum } from '../../interfaces/IEntity';

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.scss']
})
export class DetailAlbumComponent implements OnInit {
  item : IAlbum;
  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { 
    this.route.params.subscribe( params => {
      this.albumService.getById(params.id).subscribe( data => {
        this.item = data;
      })
     console.log(params.id)
    });
  }

  ngOnInit() {
  }

}
