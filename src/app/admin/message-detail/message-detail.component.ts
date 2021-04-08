import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
  message: any;
  messageId: string;

  messageDate: string;
  messageTime: string;

  messageForm: FormGroup;

  constructor(
    private adminService: AdminService, 
    private route: ActivatedRoute) {
      this.messageForm = new FormGroup({
        message: new FormControl(),
        receiverUsername: new FormControl()
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.messageId = params['id'];
      this.message = JSON.parse(localStorage.getItem('selected-message'));
      
      const realMessageDate = new Date(this.message.createdAt);
      this.messageDate = realMessageDate.toDateString();
      this.messageTime = `${realMessageDate.getHours()}:` + 
      `${realMessageDate.getMinutes()}:${realMessageDate.getSeconds()}`
    })
  }

  setMessageAsViewed() {
  }

  replyMessage() {
    if (this.messageForm.invalid) { return; }

    this.messageForm.patchValue({receiverUsername: this.message?.sender?.username})
    this.adminService.replyMessage(this.messageForm.value)
    .subscribe(newNotification => {
      alert("Successful");
    }, error => {
      console.log(error);
    });
  }

}
