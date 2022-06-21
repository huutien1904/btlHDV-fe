import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-send-successs',
  templateUrl: './notification-send-successs.component.html',
  styleUrls: ['./notification-send-successs.component.scss']
})
export class NotificationSendSuccesssComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }
  cancel(){
    this._router.navigate(['/pages/authentication/form-request']);
  }
}
