import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AamComponentsService, ACTIONS } from 'aam-components';
import { Sort } from 'aam-components/lib/shared/table/table.component';
import { ApiRestService } from 'aam-core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {

  page: number = 1;
  sort: Sort;
  limit: number = 10;
  estado: any;
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
    this.compService.navbarTitle('Estados');
    this.getEstados();
  }
  getEstados(){
    this.loading = true;
    this.api.get('/estados', {

      page: this.page,
      sort: this.sort ? this.sort.sort : undefined,
      order: this.sort ? this.sort.order : undefined,
      filter: this.searchText ? this.searchText : undefined,
      // limit: this.limit

    })
    .subscribe((res:any)=>{
      this.estado=res;
      console.log('variable estados', res);
      this.loading = false;
    },(error)=>{
      this.loading=false;
      console.log('error al traer estados')
    })
  }
  actionClicked(e:any){
    if(ACTIONS.UPDATE === e.action){
      this.router.navigate(['admin', 'admin', 'estado', e.el.id ])
    }else if(ACTIONS.CREATE === e.action){
      
      this.router.navigate(['admin/admin/estado'])
    }
  }
  addEstado(){
    this.router.navigate(['admin/admin/estado']);
  }


}
