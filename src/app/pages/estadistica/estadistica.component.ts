import { Component, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import { Router } from '@angular/router';
import { AamComponentsService, } from 'aam-components';
import { ToastrService } from 'ngx-toastr';
import { ApiRestService } from 'aam-core';
import { Sumario } from 'src/app/shared/models/sumario';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {
  loading : boolean = true;
  total:any;
  activo:any;
  cerrado:any;
  sumarioEstadistica:any;
  sumarios:any;
  sumario: Sumario = new Sumario();

  total2020:any;
  abierto2020:any;
  cerrado2020:any;

  total2021:any;
  abierto2021:any;
  cerrado2021:any;

  constructor(
    private compService: AamComponentsService,
    private api : ApiRestService,
    private apiService: ApiRestService,
    private toastr: ToastrService,
    private router: Router,
   
  ) {
    
   }

  ngOnInit(): void {
    this.compService.navbarTitle('Estadistica');
    //this.getSumarios();
    
    this.getEstadistica();
   // this.ariel();

  }

  
  // getSumarios(){
  //   this.loading=true;
  //   this.api.get('/sumarios', {
  
      
  //   })
  //   .subscribe((res:any)=>{
  //    // console.log('user', res)
  //     this.sumarios = res;
  //     // console.log('variable sumario', res.data);
  //     // console.log('solo la length', res.data.length);
  //     // console.log('solo la res', res.length)
  //     // console.log('sumarios data',res.sumario)
   
  //     this.loading = false;
  //   },(error)=>{
  //     this.loading = false;
  //     console.log('error al traer sumario')
  //   })
  
  //   console.log('ariel', );
  // }

  getEstadistica(){
   this.loading=true;
   
      
    this.api.get('/sumarios', {
    }    )
    .subscribe((res:any)=>{
     
      this.sumarioEstadistica = res;
      console.log('variable estadistica', res.data);
      console.log('solo la length estadistica', res.data.length);
      
        this.total= res.data.length;
        this.activo= res.data.filter((sumarios) => sumarios.estado_id == 1).length;
        this.cerrado= res.data.filter((sumarios) => sumarios.estado_id == 2).length;
          
        this.total2020= res.data.filter((sumarios) => sumarios.anio == '2020').length;
        this.abierto2020=res.data.filter((sumarios) => sumarios.estado_id == 1 && sumarios.anio == '2020').length;
        this.cerrado2020= res.data.filter((sumarios) => sumarios.estado_id == 2 && sumarios.anio == '2020').length;
          
        this.total2021= res.data.filter((sumarios) => sumarios.anio == '2021').length;
        this.abierto2021=res.data.filter((sumarios) => sumarios.estado_id == 1 && sumarios.anio == '2021').length;
        this.cerrado2021= res.data.filter((sumarios) => sumarios.estado_id == 2 && sumarios.anio == '2021').length;
          
      console.log('abiertos', this.activo);
      console.log('cerrados', this.cerrado); 

      console.log('total 2020', this.total2020);
      console.log('abiertos 2020', this.abierto2020);
      console.log('cerrados 2020', this.cerrado2020);

      console.log('total 2021', this.total2021);
      console.log('abiertos 2021', this.abierto2021);
      console.log('cerrados 2021', this.cerrado2021);
      this.loading = false;
      //return (this.activo, this.cerrado)
      
    },(error)=>{
      this.loading = false;
      console.log('error al traer sumario')
    })  
 
  }

 
  
  public doughnutChartLabels: Label[] = ['Abiertos', 'Cerrados',];

  public doughnutChartData: MultiDataSet = [
    
    [2000, 232]
   
  ];


  public doughnutChartType: ChartType = 'doughnut';

  
}
