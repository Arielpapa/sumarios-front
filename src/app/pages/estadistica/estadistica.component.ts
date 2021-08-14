import { Component, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

import { Router } from '@angular/router';
import { AamComponentsService, } from 'aam-components';
import { ToastrService } from 'ngx-toastr';
import { ApiRestService } from 'aam-core';
import { Sumario } from 'src/app/shared/models/sumario';


import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    //Object.assign(this, { single });
   }

  ngOnInit(): void {
    this.compService.navbarTitle('Estadistica');
    //this.getSumarios();
    
    this.getEstadistica();
   
  }


  getEstadistica(){
    this.loading=true;  
    this.api.get('/sumarios', {
    })
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
          
         this.doughnutChartData= [[this.abierto2021 , this.cerrado2021]];

         this.doughnutChartData2020 = [[this.abierto2020 , this.cerrado2020]];

         this.single2021 = [
          {
            "name": "Abiertos",
            "value": this.abierto2021
          },
          {
            "name": "Cerrados",
            "value": this.cerrado2021
          }
        ];

        this.single2020 = [
          {
            "name": "Abiertos",
            "value": this.abierto2020
          },
          {
            "name": "Cerrados",
            "value": this.cerrado2020
          }
        ];
      
        

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
///////////////////////////////////////////////

//single: any[];
  view: [number,number] = [1200, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['red', 'green']
  };

 
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
   
    

    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

 single2021 = [
    {
      "name": "Abiertos",
      "value": 50
    },
    {
      "name": "Cerrados",
      "value": 25
    }
  ];
  single2020 = [
    {
      "name": "Abiertos",
      "value": 50
    },
    {
      "name": "Cerrados",
      "value": 25
    }
  ];


/////////////////////////////////////////////// 

  public doughnutChartLabels: Label[] = ['Abiertos', 'Cerrados',];

  public doughnutChartData2020: MultiDataSet = [
    
    [400, 232]
   
  ];
  public doughnutChartData: MultiDataSet = [
    
    [400, 232]
   
  ];
  
  public colors:Color []=[{
    backgroundColor:['red', 'green']
  }];

  public doughnutChartType: ChartType = 'doughnut';

  
}
