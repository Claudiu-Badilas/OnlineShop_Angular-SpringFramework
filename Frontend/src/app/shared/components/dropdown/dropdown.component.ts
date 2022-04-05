import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Output() editClicked = new EventEmitter<boolean>();
  @Output() deleteClicked = new EventEmitter<boolean>();

  constructor() {}

  onEditClicked() {
    this.editClicked.emit(true);
  }
  onDeleteClicked() {
    this.deleteClicked.emit(true);
  }
}
