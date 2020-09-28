import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component ({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})

export class ShoppingEditComponent implements OnInit, OnDestroy{
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private slService: ShoppingListService){}

    ngOnInit() {
        this.subscription = this.slService.startedEditing
        .subscribe(
            (index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.slService.getIngredient(index);
                //so ova dolu, koga ke klikneme na itemot pravime avtomatski da se popolni so starite vrednosti
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount,
                    density: this.editedItem.density
                })
            }
        );
    }
    onAddItem(form: NgForm){
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount, value.density);
        if(this.editMode) {
            this.slService.updateIngredient(this.editedItemIndex, newIngredient)
        } else {
            this.slService.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.slService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
}