import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AamComponentsService, ACTIONS } from 'aam-components';
import { Sort } from 'aam-components/lib/shared/table/table.component';
import { ApiRestService } from 'aam-core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss']
})
export class TecnicosComponent implements OnInit {

  page: number = 1;
  sort: Sort;
  limit: number = 10;
  tecnico: any;
  loading : boolean = true;
  searchText: string ='';


  constructor(
    private compService: AamComponentsService,
    private api : ApiRestService,
    private apiService: ApiRestService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.compService.navbarTitle('Tecnicos');
    this.getTecnicos();
  }
  getTecnicos(){
    this.loading = true;
    this.api.get('/tecnicos', {

      page: this.page,
      sort: this.sort ? this.sort.sort : undefined,
      order: this.sort ? this.sort.order : undefined,
      filter: this.searchText ? this.searchText : undefined,
      // limit: this.limit

    })
    .subscribe((res:any)=>{
      this.tecnico=res;
      console.log('variable tecnicos', res);
      this.loading = false;
    },(error)=>{
      this.loading=false;
      console.log('error al traer tecnicos')
    })
  }
  actionClicked(e:any){
    if(ACTIONS.UPDATE === e.action){
      this.router.navigate(['admin', 'admin', 'tecnico', e.el.id ])
    }else if(ACTIONS.CREATE === e.action){
      
      this.router.navigate(['admin/admin/tecnico'])
    }
  }
  addTecnico(){
    this.router.navigate(['admin/admin/tecnico']);
  }


}
