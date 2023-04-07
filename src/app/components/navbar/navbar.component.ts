import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() logoutActived = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutActived.emit(true);
  }

}
