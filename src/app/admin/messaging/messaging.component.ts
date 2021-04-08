import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: any[];
  selectedMessage: any;

  constructor(
    private adminService: AdminService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchMessages();
  }

  onSelectMessage(message: any) {
    this.selectedMessage = message;
    localStorage.setItem('selected-message', JSON.stringify(message));

    this.router.navigate(['./', message.id], { relativeTo: this.route })
  }

  fetchMessages() {
    this.adminService.fetchMessages()
    .subscribe(messages => {
      this.messages = messages;
      console.log(messages);
    }, error => {
      console.log(error);
    });
  }

}
