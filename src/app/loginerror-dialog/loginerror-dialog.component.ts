import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-loginerror-dialog',
  templateUrl: './loginerror-dialog.component.html',
  styleUrls: ['./loginerror-dialog.component.css']
})
export class LoginerrorDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
