import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-messaging',
  templateUrl: './general-messaging.component.html',
  styleUrls: ['./general-messaging.component.scss']
})
export class GeneralMessagingComponent implements OnInit {
  latestNews: any;
  updateForm: FormGroup;

  isPosting: boolean;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {
    this.updateForm = new FormGroup({
      message: new FormControl()
    });
  }

  ngOnInit(): void {
    this.latestNews = JSON.parse(localStorage.getItem('latest-news'));

    if (!this.latestNews) {
      this.adminService.fetchLatestAdminNews()
      .subscribe(news => {
        this.latestNews = news;
        localStorage.setItem('latest-news', JSON.stringify(news));
      });
    }
  }

  postUpdate() {
    if (this.updateForm.invalid || this.isPosting) { return; }

    if (confirm('Are you sure about this?')) {
      this.isPosting = true;
  
      this.adminService.postGeneralNews(this.updateForm.value)
      .subscribe(news => {
        this.latestNews = news;
        this.isPosting = false;
        localStorage.setItem('latest-news', JSON.stringify(news));
        this.snackBar.open('Update Completed', 'CLOSE', { duration: 7000 });
      }, error => {
        this.isPosting = false;
        this.snackBar.open('Unable to post news.', 'TRY AGAIN', {
          duration: 7000
        })
        .onAction()
        .subscribe(() => {
          this.postUpdate();
        });
      });
    }
  }

}
