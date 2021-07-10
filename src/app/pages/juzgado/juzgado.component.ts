import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Juzgado } from 'src/app/shared/models/juzgado';
import { ApiRestService } from 'aam-core';
import { AamComponentsService } from 'aam-components';

@Component({
  selector: 'app-juzgado',
  templateUrl: './juzgado.component.html',
  styleUrls: ['./juzgado.component.scss']
})
export class JuzgadoComponent implements OnInit {

  formGroup: FormGroup;
  juzgado: Juzgado = new Juzgado();
  juzgadoName: string;
  //juzgado:Juzgado;
  loading:boolean = true;
  juzgadoId:number

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
        this.juzgadoId = p.id;

        this.compService.navbarTitle('Editar Juzgado');
        this.getJuzgadoById(p.id)
      }else{
        this.compService.navbarTitle('Agregar Juzgado');
        this.loading=false;
      }
    })
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: [''],
      direccion: [''],
      email:[''],

    })
  }

  // addOrEditJuzgado(){
  //   this.loading = true;
  //   if(this.juzgadoId){
  //    this.apiService.put(`/juzgados/${this.juzgadoId}`, {nombre:this.juzgadoName})
  //    .subscribe((res:any)=>{
       
  //        console.log('editado correctamente');
  //        this.router.navigate(['admin/admin/juzgados'])
  //        this.loading=false;
  //    },(error)=>{
  //      this.loading=false;
  //      console.log('error al actualizar');
  //    })
  //    } else{
  //      this.apiService.post(`/juzgados`, {nombre: this.juzgadoName})
  //      .subscribe((res:any)=>{
  //        console.log('agregado con exito')
  //        this.router.navigate(['admin/admin/juzgados'])
  //        this.loading=false;
  //      },(error)=>{
  //        this.loading=false;
  //        console.log('error al agregar');
  //      })
  //    }
   
  //  }
  //  getJuzgadoById(id:number){
  //    this.apiService.get(`/juzgados/${id}`)
  //    .subscribe((c:any) =>{
   
  //      this.juzgado=c.data
  //      console.log(this.juzgado.nombre);
  //      this.juzgadoName= this.juzgado.nombre;
  //      this.loading=false;
   
  //    })
  //   }

    getJuzgadoById(id: number){
      this.apiService.get(`/juzgados/${id}`)
        .subscribe((res: any) => {
          
          this.juzgado = res.data;
          console.log("juzgado ", this.juzgado);
          this.setValues();
          this.loading = false;
        }, 
        (err)=> {
          console.log("error juzgado > ", err);
          this.loading = false;
        })
    }
    setValues(){
      this.formGroup.controls['nombre'].setValue(this.juzgado.nombre);
      this.formGroup.controls['telefono'].setValue(this.juzgado.telefono);
      this.formGroup.controls['direccion'].setValue(this.juzgado.direccion);
      this.formGroup.controls['email'].setValue(this.juzgado.email);  
    }
    
  addOrEditJuzgado(){
    this.loading = true;
    this.setRawValue();
    if(this.juzgadoId){
     this.apiService.put(`/juzgados/${this.juzgadoId}`, this.juzgado)
     .subscribe((res:any)=>{
        console.log('editado correctamente');
        this.loading=false;
        this.router.navigate(['admin/admin/juzgados'])
        this.toastr.success('juzgado editado', 'Éxito!');
     },(error)=>{
       this.loading=false;
       console.log('error al actualizar');
       this.toastr.error('Error al actualizar juzgado', 'Error!');
     })
     } 
     else{
       this.apiService.post(`/juzgados`, this.juzgado)
       .subscribe((res:any)=>{
          console.log('agregado con exito' , res.juzgado)
          this.loading=false;
          this.toastr.success('juzgado Agregado', 'Éxito!');
        this.router.navigate(['admin/admin/juzgados'])
       },(error)=>{
         this.loading=false;
         console.log('error al agregar');
         this.toastr.error('Error al agregar juzgado', 'Error!');
       })
     }
   
   }
   setRawValue(){
    this.juzgado.nombre = this.formGroup.get('nombre').value;
    this.juzgado.telefono = this.formGroup.get('telefono').value;
    this.juzgado.direccion = this.formGroup.get('direccion').value;
    this.juzgado.email = this.formGroup.get('email').value;
 
  }
   goTojuzgados(){
    this.router.navigate(['admin/admin/juzgados']);
  }




}