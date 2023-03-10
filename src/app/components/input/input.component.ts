import { ShoppingListService } from './../../service/shoppingList.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../../interfaces/iItem';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  private readonly EDIt_ITEM: string = 'Edit item';

  private readonly ADD_ITEM: string = 'Add item';

  public itemName: string = '';

  public buttonName: string = this.ADD_ITEM;

  public editMode: boolean = false;

  @Input()
  public editedItem: Item = {
    id: 0,
    name: '',
    bought: false,
    date: ''
  }

  constructor(
    private shoppingListService: ShoppingListService
  ) { };

  ngOnInit(): void { };

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['editedItem'].firstChange) {
      this.itemName = this.editedItem?.name;
      this.buttonName = this.EDIt_ITEM;
      this.editMode = true;
    };
  };

  public addItem(): void {
    this.shoppingListService.addItemToShoppingList(this.itemName);
    this.clearInputField();
  };

  public editItem(): void {
    this.shoppingListService.editItem({ ...this.editedItem, name: this.itemName });
    this.buttonName = this.ADD_ITEM;
    this.editMode = false;
    this.itemName = '';
  };

  private clearInputField(): void {
    this.itemName = '';
  };
}
