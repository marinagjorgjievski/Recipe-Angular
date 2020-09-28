import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Test Recipe', 
            'This is a test', 
            'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
            [   new Ingredient('Meat',1,'kg'),
                new Ingredient('French Fries',20, 'gr')  
            ]),
        new Recipe(
            'Second Test Recipe', 
            'This is a test', 
            'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
            [
                new Ingredient('Buns',2,'gr'),
                new Ingredient('Meat',1,'kg')
            ]),
        new Recipe(
            'Third Test Recipe', 
            'This is a test', 
            'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
            [
                new Ingredient('Breakfast',2,'kg'),
                new Ingredient('Soup',3,'gr')
            ])
    ];
    constructor(private slService:ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();//so slice dobivame samo kopija od listata na recepri, nemozeme da pristapime od nadvor
    }

    getRecipe(index:number) {
        return this.recipes[index];
    }
    
    addIngredientsToShoppingList(ingredients:Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}