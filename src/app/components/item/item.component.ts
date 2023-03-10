import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../interfaces/iItem';
import { ShoppingListService } from '../../service/shoppingList.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  public item: Item = {
    id: 0,
    bought: false,
    date: '00/10/2000',
    name: 'Item name'
  }

  @Output()
  public editItemEmitter: EventEmitter<Item> = new EventEmitter();

  @Output()
  public deleteItemEmitter: EventEmitter<number> = new EventEmitter();


  faPen = faPen;
  faTrash = faTrash

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit(): void { }

  public editItem(): void {
    this.editItemEmitter.emit(this.item);
  }

  public deleteItem(): void {

    this.deleteItemEmitter.emit(this.item.id);

  }

  public toggleChecked(): void {
    this.shoppingListService.editItem(this.item);
  }

}
