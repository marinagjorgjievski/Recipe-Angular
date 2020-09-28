import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
//ako sakame dropdownot da se zatvori i koga ke klikneme na strana 
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    constructor(private elRef: ElementRef){}
}