import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AamComponentsService, ACTIONS } from 'aam-components';
import { Sort } from 'aam-components/lib/shared/table/table.component';
import { ApiRestService } from 'aam-core';
import { ToastrService } from 'ngx-toastr';
import { Sumario } from 'src/app/shared/models/sumario';
import { Tecnico } from 'src/app/shared/models/tecnico';

@Component({
  selector: 'app-sumarios',
  templateUrl: './sumarios.component.html',
  styleUrls: ['./sumarios.component.scss']
})
export class SumariosComponent implements OnInit {
  nn:any;
  page: number = 1;
  sort: Sort;
  limit: number = 10;
  loading : boolean = true;
  searchText: string ='';
  sumarios:any;
  tecnicos: Tecnico[];
  sumarioId: number;
  //sumario: Sumario[];
  sumario: Sumario = new Sumario();
  total:any;
  activo:any;
  cerrado:any;
  sumarioEstadistica:any;

  constructor(
    private compService: AamComponentsService,
    private api : ApiRestService,
    private apiService: ApiRestService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.compService.navbarTitle('Sumarios');
    this.getSumarios();
    this.getEstadistica();
    //this.getTecnicos();

}
getEstadistica(){
  this.loading=true;
  this.api.get('/sumarios', {
  })
  .subscribe((res:any)=>{
   // console.log('user', res)
    this.sumarioEstadistica = res;
    console.log('variable estadistica', res.data);
    console.log('solo la length estadistica', res.data.length);
    //console.log('solo la res', res.length)
    //console.log('sumarios data',res.sumario)
    this.total= res.data.length;
    this.activo= res.data.filter((sumario) => sumario.estado_id == 1).length;
    this.cerrado= res.data.filter((sumarios) => sumarios.estado_id == 2).length;
    //var difficult_tasks = tasks.filter((task) => task.duration >= 120 );
    console.log('abiertos', this.activo);
    console.log('cerrados', this.cerrado);

    
    this.loading = false;
  },(error)=>{
    this.loading = false;
    console.log('error al traer sumario')
  })
}


getSumarios(){
  this.loading=true;
  this.api.get('/sumarios', {

    page: this.page,
    sort: this.sort ? this.sort.sort : undefined,
    order: this.sort ? this.sort.order : undefined,
    filter: this.searchText ? this.searchText : undefined,
    limit: this.limit,
   
  })
  .subscribe((res:any)=>{
   // console.log('user', res)
    this.sumarios = res;
    console.log('variable sumario', res.data);
    console.log('solo la length', res.data.length);
    console.log('solo la res', res.length)
    console.log('sumarios data',res.sumario)
    //this.total= res.data.length;
    //this.activo= res.data.filter((sumarios) => sumarios.estado_id ==1);
    //this.cerrado= res.data.filter((sumarios) => sumarios.estado_id == 2);
    //var difficult_tasks = tasks.filter((task) => task.duration >= 120 );
    //console.log('abiertos', this.activo.length);
    //console.log('cerrados', this.cerrado.length);

    
    this.loading = false;
  },(error)=>{
    this.loading = false;
    console.log('error al traer sumario')
  })

  
  console.log('ariel', );
}
actionClicked(e:any){
  if(ACTIONS.DESTROY === e.action ){
    this.loading=true;
    //console.log( 'ID',e);
    this.apiService.delete('/sumarios/' + e.el.id)
    .subscribe((res: any)=>{
    console.log('sumario eliminado', res);
    this.getSumarios();
    this.toastr.success('Sumario Eliminado', 'exito');
    this.loading=false;
    },(error:any)=>{
       this.loading=false;
       this.toastr.error('no se pudo eliminar el sumario', 'Error')
      console.log('no se pudo eliminar el sumario');

    })
  }else if(ACTIONS.UPDATE === e.action){
    this.router.navigate(['admin','admin','sumario',e.el.id ])
   }
   else if(ACTIONS.CREATE === e.action){
    
     this.router.navigate(['admin/admin/sumario'])
   }
}

goToAdd(){
  
  this.router.navigate(['admin/admin/sumario'])
  
}
}