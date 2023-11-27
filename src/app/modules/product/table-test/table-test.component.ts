import { Component, OnInit} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.scss']
})
export class TableTestComponent implements  OnInit{

  protected data:any;
  protected ogData:any;
  protected search = faSearch;

  searchFn(event: Event){
    let target = (<HTMLInputElement>event.target);
    let newData:any = [];

    if (target.value.trim() == '') {
      this.data = this.ogData;
    } else {
      this.data.forEach((elem:any) => {
        let lCaseName = elem.name.toLowerCase();
        let lCaseDesc = elem.description.toLowerCase();
        if (lCaseName.indexOf(target.value.toLowerCase()) > -1 || lCaseDesc.indexOf(target.value.toLowerCase()) > -1) {
          newData.push(elem);
        }
      });

      if (newData.length == 0) {
        console.log("it is");
      }
      this.data = newData;
    }
  }

  ngOnInit(): void {
    this.data = [
      {
        "id": 1,
        "name": "Test",
        "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, alias? asfasjfbasfvagsfasfasfasf"
      },
      {
        "id": 2,
        "name": "Prueba",
        "description": "Lorem ipsum dolor sit amet."
      }
    ];

    this.ogData = this.data;
  }

}
