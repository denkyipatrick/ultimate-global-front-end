import { FormGroup, FormControl } from '@angular/forms';
import { DistributorService } from 'src/app/services/distributor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messageForm: FormGroup;

  constructor(private distributorService: DistributorService) {
    this.messageForm = new FormGroup({
      text: new FormControl(),
      senderUsername: new FormControl(this.distributorService.distributor.username)
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.distributorService.sendAdminMessage(this.messageForm.value)
    .subscribe(message => {
      alert('Message Sent!');
    }, error => {
      switch(error.status) {
        default: {

        }
      }
    });
  }

}
