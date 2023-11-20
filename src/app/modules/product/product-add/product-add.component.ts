import { Component, OnInit} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SCIFService } from '../../shared/services/scif.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit{
  protected createNew = true;
  icon=faMagnifyingGlass;
  protected prod_sheet_list:any;

  constructor(protected scif:SCIFService){
    this.scif.getProductSheetData().subscribe({
      next: (res) => {
        this.prod_sheet_list = res;
      },
      error: (err) => {
        throw err;
      }
    });
  }
  
  ngOnInit(): void {

  }

  onFocus(event:Event){
    let target = (event.target as HTMLElement);
    let parent = target.parentElement;
    parent?.classList.add("pretty-border");
  }
  
  onBlur(event:Event){
    let target = (event.target as HTMLElement);
    let parent = target.parentElement;
    parent?.classList.remove("pretty-border");
  }

  showDropDown(){
    let dropdown = document.getElementById("myDropdown");

    if (dropdown?.classList.contains("show")) {
      dropdown?.classList.remove("show");  
      dropdown?.classList.add("dropdown-content");  
    } else {
      dropdown?.classList.remove("dropdown-content");
      dropdown?.classList.add("show");
    }
  }

  getSpecSheet() {
    let input = document.getElementById("myInput");
    return input;
  }

  setSpecSheetVal(value:any) {
    let input = document.getElementById("myInput");
    (input as HTMLInputElement).value = value;
  }
  createSpecSheet() {
    let input = this.getSpecSheet();
    // call component spec sheet 
    (input as HTMLInputElement).disabled = true;

    this.showDropDown();
  }

  specSelected(spec_selected:any) {
    this.setSpecSheetVal(spec_selected);
    this.showDropDown();
  }

  filterFunction(){
    let input = document.getElementById("myInput");
    let list = document.getElementById("dpList");
    let listChildren = list?.getElementsByTagName("li");

    let listChildrenLen = listChildren?.length;
    let nonExistantCount = 0;

    let value = (input as HTMLInputElement).value.toUpperCase();
    
    Array.from(listChildren!).forEach(elem => {
      if (elem.innerHTML.toUpperCase().indexOf(value) > -1) {
        (elem as HTMLElement).style.display = "";
      } else{
        (elem as HTMLElement).style.display = "none";
        nonExistantCount++;
      }
    });

    if (nonExistantCount == listChildrenLen) {
      this.createNew = false;
    }else{
      this.createNew = true;
    }
  }
}
