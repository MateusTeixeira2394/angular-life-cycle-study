import { Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingList: Item[] = [
    {
      "id": 1,
      "name": "Queijo prato",
      "date": "Segunda-feira (31/10/2022) às 08:30",
      "bought": false
    },
    {
      "id": 2,
      "name": "Leite integral",
      "date": "Segunda-feira (31/10/2022) às 08:30",
      "bought": false
    },
    {
      "id": 3,
      "name": "Mamão papaia",
      "date": "Segunda-feira (31/10/2022) às 08:30",
      "bought": true
    },
  ];

  constructor() {
    this.shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
  };

  public getShoppingList() {
    return this.shoppingList;
  };

  private getNewId(): number {

    if (this.shoppingList.length === 0) return 1;

    return this.shoppingList[this.shoppingList.length - 1].id + 1;

  }

  private createItem(itemName: string): Item {

    return {
      id: this.getNewId(),
      name: itemName,
      date: new Date().toLocaleString('pt-BR'),
      bought: false
    };

  };

  public addItemToShoppingList(itemName: string): void {

    this.shoppingList.push(this.createItem(itemName));

    this.updateLocalStorage();

  };

  public editItem(item: Item): void {

    const index: number = this.shoppingList.findIndex(currItem => currItem.id === item.id);

    this.shoppingList.splice(index, 1, item);

    this.updateLocalStorage();

  };

  public deleteItem(id: number): void {

    const index: number = this.shoppingList.findIndex(currItem => currItem.id === id);

    this.shoppingList.splice(index, 1);

    this.updateLocalStorage();

  }

  public deleteAllItems(): void {

    this.shoppingList = [];

    this.updateLocalStorage();

  }

  private updateLocalStorage(): void {

    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));

  }

}
