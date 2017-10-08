import { Component,
         Inject } from '@angular/core';
import { MdDialog,
         MdDialogRef, 
         MD_DIALOG_DATA }  from '@angular/material';

@Component({
    selector: 'message-dialog',
    templateUrl: 'message-dialog.component.html',
    styleUrls: ['./message-dialog.component.css']    
  })
  export class MessageDialogComponent {

    constructor(
        public dialogRef: MdDialogRef<MessageDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) { }
    
      onNoClick(): void {
        this.dialogRef.close();
      }

  }