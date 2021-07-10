import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AamComponentsService } from 'aam-components';
import { AamCoreService, ApiRestService } from 'aam-core';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/shared/models/estado';
import { Juzgado } from 'src/app/shared/models/juzgado';
import { Rol } from 'src/app/shared/models/rol';
import { Sumario } from 'src/app/shared/models/sumario';
import { Tecnico } from 'src/app/shared/models/tecnico';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-sumario',
  templateUrl: './sumario.component.html',
  styleUrls: ['./sumario.component.scss']
})
export class SumarioComponent implements OnInit {

  formGroup: FormGroup;
  sumario: Sumario = new Sumario();
  codes: [];
  loading: boolean = true;
  sumarioId: number;
  user: User;
  roles: Rol[] = [];
  invalidDates: boolean;
  juzgados: Juzgado[];
  tecnicos: Tecnico[];
  estados: Estado[];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiRestService,
    private compService: AamComponentsService,
    private toastr: ToastrService,
    private coreService: AamCoreService
  ) { }

  ngOnInit(): void {
    this.loading=true;
    
    this.user = this.coreService.getUserLogged();
    console.log('user', this.user);
    this.getJuzgados();
    this.getTecnicos();
    this.getEstados();
    this.buildForm();
    this.route.params.subscribe((p: { id: number }) => {
      if (p.id) {
        this.sumarioId = p.id;
        this.compService.navbarTitle('Editar sumario');
        this.getSumarioById(this.sumarioId);
        this.loading=true;
      }else{
        
        this.compService.navbarTitle('Agregar sumario');
        this.loading = false;
      }
    });
    
  }
  buildForm(){
    this.formGroup = this.formBuilder.group({
      numeroSumario: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: [''],
      causa: [''],
      act_sum:[''],
      act_com:[''],
      caratula:[''],
      juzgado:[''],
      tecnico:[''],
      estado:[''],
      comentarios:[''],
    });
  }

  getSumarioById(id: number){
      this.loading = true;
      this.apiService.get(`/sumarios/${id}`)
      .subscribe((res: any) => { 
        this.sumario = res.data;
        console.log("res > ",res);
        this.setValues();
        this.loading = false;
      }, 
      (err)=> {
        console.log("error sumario > ", err);
       this.loading = false;
      })
  }
  
  // changeStatus(e: boolean){
  //   if(e){
  //     this.sumario.status = 1;
  //   }else{
  //     this.sumario.status = 0;
  //   }  
    // setTimeout(() => {
    //   this.addOrEditSumario();
    // }, 1000);
  //   console.log('sumario estado > ', this.sumario);
  // }
  getEstados() {
    this.apiService.get(`/estados/getEstados`).subscribe(
      (res: any) => {
        this.estados = res;
        console.log(this.estados, 'trajo estados con exito');
      // console.log(this.estados, 'trajo estados con exito');
      },
      (err) => {
        console.log('error al traer estado', err);
      }
    );
  }
  changeEstado(event) {
    console.log(event);
    this.sumario.estado_id = parseInt(event);
    //console.log(this.sumario.estado_id=1, 'estadoooooooosssss')
  }

  getTecnicos() {
    this.apiService.get(`/tecnicos/getAll`).subscribe(
      (res: any) => {
        this.tecnicos = res;
        console.log(this.tecnicos, 'trajo tecnicos con exito');
      },
      (err) => {
        console.log('error al traer tecnico', err);
      }
    );
  }
  changeTecnico(event) {
    console.log(event);
    this.sumario.tecnico_id = parseInt(event);
  }

  getJuzgados() {
    this.apiService.get(`/juzgados/getAll`).subscribe(
      (res: any) => {
        this.juzgados = res;
        console.log(this.juzgados, 'trajo juzgados con exito');
      },
      (err) => {
        console.log('error al traer paise', err);
      }
    );
  }
  changeJuzgado(event) {
    console.log(event);
    this.sumario.juzgado_id = parseInt(event);
  }

 
   setValues(){
    this.formGroup.controls['numeroSumario'].setValue(this.sumario.numeroSumario);
    this.formGroup.controls['anio'].setValue(this.sumario.anio);
    this.formGroup.controls['causa'].setValue(this.sumario.causa);
    this.formGroup.controls['act_sum'].setValue(this.sumario.act_sum);
    this.formGroup.controls['act_com'].setValue(this.sumario.act_com);
    this.formGroup.controls['caratula'].setValue(this.sumario.caratula);
    this.formGroup.controls['comentarios'].setValue(this.sumario.comentarios);
    this.formGroup.controls['fecha_inicio'].setValue(this.sumario.fecha_inicio.toString().trim());
    this.formGroup.controls['fecha_fin'].setValue(this.sumario.fecha_fin.toString().trim());
    this.formGroup.controls['estado'].setValue(this.sumario.estado_id);   
    this.formGroup.controls['juzgado'].setValue(this.sumario.juzgado_id); 
    this.formGroup.controls['tecnico'].setValue(this.sumario.tecnico_id);
  }

  addOrEditSumario(){
   this.loading = true;
    this.setRawValue();
    if(this.sumarioId){
    
    // this.sumario.updated_by = this.user.email;
     this.apiService.put(`/sumarios/${this.sumarioId}`, this.sumario)
     .subscribe((res:any)=>{
        console.log('editado correctamente');
        this.router.navigate(['admin/admin/sumarios'])
        this.loading=false;
        this.toastr.success('Sumario editado', 'exito');
     },(error)=>{
      this.loading=false;
       console.log('error al actualizar');
       this.toastr.error('error al editar editado', 'error');
     })
     } 
     else{
       
      this.loading=true;
    // this.sumario.created_by = this.user.email;
       this.apiService.post(`/sumarios`, this.sumario)
       .subscribe((res:any)=>{
          console.log('agregado con exito' , res.sumario)
          this.router.navigate(['admin/admin/sumarios'])
          this.loading=false;
          this.toastr.success('sumario agregado', 'exito');
       },(error)=>{
         this.loading=false;
         console.log('error al agregar');
          this.toastr.error('error al agregar', 'error');
       })
     }
   }
   setRawValue(){
    this.sumario.numeroSumario = this.formGroup.get('numeroSumario').value;
    this.sumario.anio = this.formGroup.get('anio').value;
    this.sumario.causa = this.formGroup.get('causa').value;
    this.sumario.act_com = this.formGroup.get('act_com').value;
    this.sumario.act_sum = this.formGroup.get('act_sum').value;
    this.sumario.comentarios = this.formGroup.get('comentarios').value;
    this.sumario.caratula = this.formGroup.get('caratula').value;
    //this.sumario.status =this.formGroup.get('status').value;
    this.sumario.fecha_inicio = this.formGroup.get('fecha_inicio').value;
    this.sumario.fecha_fin = this.formGroup.get('fecha_fin').value;
    
   }

dateChange(){
    this.setRawValue();
    var fecha_inicio = new Date(this.sumario.fecha_inicio);
    var fecha_fin = new Date(this.sumario.fecha_fin);
    // if(fecha_inicio > fecha_fin){
    //   this.invalidDates = true;
    // }else{
    //   this.invalidDates = false;
    // }
  }

  goToSumario() {
   // this.loading=true;
  
    this.router.navigate(['admin/admin/sumarios']);
   // this.loading=false;
  }
  
}
