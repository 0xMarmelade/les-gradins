import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChansonService } from 'src/app/modeles/chanson.service';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss']
})
export class HomeButtonComponent implements OnInit, OnDestroy {
  personnage: string;
  sub: Subscription;
  constructor(private chansonService: ChansonService, private router: Router) {
    this.sub = this.chansonService.getSelectedPersonnage().subscribe(p => {
      this.personnage = p;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  retourAuMenu(): void{
    if (this.personnage === 'Kirouac'){
      this.router.navigateByUrl('menu/chapitres');
    } else {
      this.router.navigateByUrl('menu/saisons');
    }
  }

}
