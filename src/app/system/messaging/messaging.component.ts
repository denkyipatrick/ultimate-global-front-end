import { MatSnackBar } from '@angular/material/snack-bar';
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
  isSendingMessage: boolean = false;
  isErrorSendingMessage: boolean = false;

  constructor(
    private distributorService: DistributorService,
    private snackBar: MatSnackBar
    ) {
    this.messageForm = new FormGroup({
      text: new FormControl(),
      senderUsername: new FormControl(this.distributorService.distributor.username)
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.isSendingMessage = true;
    this.isErrorSendingMessage = false;

    this.distributorService.sendAdminMessage(this.messageForm.value)
    .subscribe(message => {
      this.isSendingMessage = false;
      this.messageForm.reset();
      this.messageForm.markAsUntouched();
      
      this.snackBar.open("Message Sent", "DONE", {
        duration: 7000
      })
    }, error => {
      this.isSendingMessage = false;
      this.isErrorSendingMessage = true;

      this.snackBar.open("Unable to send message", "TRY AGAIN", {
        duration: 7000
      })
      .onAction()
      .subscribe(() => this.sendMessage());

      switch(error.status) {
        default: {

        }
      }
    });
  }

}
