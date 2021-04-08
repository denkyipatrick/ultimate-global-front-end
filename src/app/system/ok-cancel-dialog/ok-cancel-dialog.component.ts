import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ok-cancel-dialog',
  templateUrl: './ok-cancel-dialog.component.html',
  styleUrls: ['./ok-cancel-dialog.component.scss']
})
export class OkCancelDialogComponent implements OnInit {
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

  _accept() {
    this.accept.emit();
    this.dialogRef.close();
  }

  _close() {
    this.close.emit();
    this.dialogRef.close();
  }

}
