import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../service/album.service';
import { ActivatedRoute } from '@angular/router';
import { IAlbum, IDetailsOrder } from '../../interfaces/IEntity';
import { OrderService } from '../../service/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.scss']
})
export class DetailAlbumComponent implements OnInit {
  item : IAlbum;
  sameArtist: IAlbum[];
  newRelease: IAlbum[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private albumService: AlbumService
  ) { 
    this.route.params.subscribe( params => {
      this.albumService.getById(params.id).subscribe( data => {
        this.item = data;
        this.albumService.getPageByArtist(0, 10, data.artist.id).subscribe(data => {
          this.sameArtist = data.content
        },
        error => {
          console.log(error)
        })
      })
     console.log(params.id)
    });
    this.albumService.getPageNewRelease(0, 10).subscribe(data => {
      this.newRelease = data.content
    },
    error => {
      console.log(error)
    })
  }
  toSection() {
    this.router.navigate(['/section', {type: 1, content: this.item.artist.id}])
  }
  ngOnInit() {
  }
  addToCart() {
    const detail : IDetailsOrder = {
      album: this.item,
      quantity: 1,
    }
    this.orderService.addCart(detail);
  }
}
