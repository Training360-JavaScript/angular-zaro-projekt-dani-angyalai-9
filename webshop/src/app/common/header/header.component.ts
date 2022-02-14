import { ConfigService } from './../../service/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = this.config.menuItems;

  constructor(
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
