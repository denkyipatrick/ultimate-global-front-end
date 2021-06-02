import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OkCancelDialogComponent } from '../ok-cancel-dialog/ok-cancel-dialog.component';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.scss']
})
export class OkDialogComponent implements OnInit {
  @Output() close: EventEmitter<null>;
  @Output() accept: EventEmitter<null>;

  constructor(
    private dialogRef: MatDialogRef<OkCancelDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.close = new EventEmitter();
      this.accept = new EventEmitter();
    }

  ngOnInit(): void {
  }

  _close() {
    this.close.emit();
    this.dialogRef.close();
  }

}
