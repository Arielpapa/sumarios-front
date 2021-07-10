import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/shared/models/tecnico';
import { AamComponentsService } from 'aam-components';
import { ApiRestService } from 'aam-core';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.scss']
})
export class TecnicoComponent implements OnInit {

  formGroup: FormGroup;
  tecnico: Tecnico = new Tecnico();
  tecnicoName: string;
  //juzgado:Juzgado;
  loading:boolean = true;
  tecnicoId:number

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiRestService,
    private compService: AamComponentsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe((p:{id:number})=>{
      if(p.id){
        this.tecnicoId = p.id;

        this.compService.navbarTitle('Editar Tecnico');
        this.getTecnicoById(p.id)
      }else{
        this.compService.navbarTitle('Agregar Tecnico');
        this.loading=false;
      }
    })
  }
  buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: [''],
      lp: [''],
      jerarquia:[''],

    })
  }

    getTecnicoById(id: number){
      this.apiService.get(`/tecnicos/${id}`)
        .subscribe((res: any) => {
          
          this.tecnico = res.data;
          console.log("tecnico ", this.tecnico);
          this.setValues();
          this.loading = false;
        }, 
        (err)=> {
          console.log("error tecnico > ", err);
          this.loading = false;
        })
    }

    setValues(){
      this.formGroup.controls['nombre'].setValue(this.tecnico.nombre);
      this.formGroup.controls['apellido'].setValue(this.tecnico.apellido);
      this.formGroup.controls['lp'].setValue(this.tecnico.lp);
      this.formGroup.controls['jerarquia'].setValue(this.tecnico.jerarquia);  
    }
    
  addOrEditTecnico(){
    this.loading = true;
    this.setRawValue();
    if(this.tecnicoId){
     this.apiService.put(`/tecnicos/${this.tecnicoId}`, this.tecnico)
     .subscribe((res:any)=>{
        console.log('editado correctamente');
        this.loading=false;
        this.router.navigate(['admin/admin/tecnicos'])
        this.toastr.success('tecnico editado', 'Éxito!');
     },(error)=>{
       this.loading=false;
       console.log('error al actualizar');
       this.toastr.error('Error al actualizar tecnico', 'Error!');
     })
     } 
     else{
       this.apiService.post(`/tecnicos`, this.tecnico)
       .subscribe((res:any)=>{
          console.log('agregado con exito' , res.tecnico)
          this.loading=false;
          this.toastr.success('tecnico Agregado', 'Éxito!');
        this.router.navigate(['admin/admin/tecnicos'])
       },(error)=>{
         this.loading=false;
         console.log('error al agregar');
         this.toastr.error('Error al agregar tecnico', 'Error!');
       })
     }
   
   }
   setRawValue(){
    this.tecnico.nombre = this.formGroup.get('nombre').value;
    this.tecnico.apellido = this.formGroup.get('apellido').value;
    this.tecnico.lp = this.formGroup.get('lp').value;
    this.tecnico.jerarquia = this.formGroup.get('jerarquia').value;
 
  }
   goToTecnicos(){
    this.router.navigate(['admin/admin/tecnicos']);
  }




}
