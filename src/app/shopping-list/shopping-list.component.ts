import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component ({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[];
    private igChangeSub: Subscription;
    
    constructor(private slService: ShoppingListService) {

    }

    ngOnInit() {
        this.ingredients = this.slService.getIngredients();
        this.igChangeSub = this.slService.ingredientsChanged
            .subscribe(
                 (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
            }
        );
    }

    onEditItem(index: number) {
        this.slService.startedEditing.next(index);
    }
    
    ngOnDestroy() {
        this.igChangeSub.unsubscribe();
    }
}