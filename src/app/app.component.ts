import { Component, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ShoppingListService } from './service/shoppingList.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'app-lista-de-compras';

  public shoppingList: Item[] = [];

  public editedItem!: Item;

  constructor(
    private shoppingListService: ShoppingListService
  ) { };

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList();
  };

  public editItem(item: Item): void {
    this.editedItem = item;
  }

  public deleteItem(id: number): void {
    this.shoppingListService.deleteItem(id);
  }

  public deleteAllItems(): void {
    this.shoppingList = [];
    this.shoppingListService.deleteAllItems();
  }

}
