https://github.com/ng-select/ng-select

<!--Using ng-option and for loop-->
<ng-select [(ngModel)]="selectedCar">
  <ng-option *ngFor="let car of cars" [value]="car.id">{{car.name}}</ng-option>
</ng-select>

<!--Using items input-->
<ng-select [items]="cars"
          bindLabel="name"
          bindValue="id"
          [(ngModel)]="selectedCar">
</ng-select>
