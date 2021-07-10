import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/shared/models/estado';
import { ApiRestService } from 'aam-core';
import { AamComponentsService } from 'aam-components';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {

  formGroup: FormGroup;
  estado: Estado = new Estado();
  estadoName: string;
  //juzgado:Juzgado;
  loading:boolean = true;
  estadoId:number;

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
        this.estadoId = p.id;

        this.compService.navbarTitle('Editar Estado');
        this.getEstadoById(p.id)
      }else{
        this.compService.navbarTitle('Agregar Estado');
        this.loading=false;
      }
    })
  }
  buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
    })
  }

  getEstadoById(id: number){
      this.apiService.get(`/estados/${id}`)
        .subscribe((res: any) => {
          
          this.estado = res.data;
          console.log("estado", this.estado);
          this.setValues();
          this.loading = false;
        }, 
        (err)=> {
          console.log("error estado > ", err);
          this.loading = false;
        })
    }
    setValues(){
      this.formGroup.controls['nombre'].setValue(this.estado.nombre);
    
    }
    
  addOrEditEstado(){
    this.loading = true;
    this.setRawValue();
    if(this.estadoId){
     this.apiService.put(`/estados/${this.estadoId}`, this.estado)
     .subscribe((res:any)=>{
        console.log('editado correctamente');
        this.loading=false;
        this.router.navigate(['admin/admin/estados'])
        this.toastr.success('estado editado', 'Éxito!');
     },(error)=>{
       this.loading=false;
       console.log('error al actualizar');
       this.toastr.error('Error al actualizar estado', 'Error!');
     })
     } 
     else{
       this.apiService.post(`/estados`, this.estado)
       .subscribe((res:any)=>{
          console.log('agregado con exito' , res.estado)
          this.loading=false;
          this.toastr.success('estado Agregado', 'Éxito!');
        this.router.navigate(['admin/admin/estados'])
       },(error)=>{
         this.loading=false;
         console.log('error al agregar');
         this.toastr.error('Error al agregar estado', 'Error!');
       })
     }
   
   }
   setRawValue(){
    this.estado.nombre = this.formGroup.get('nombre').value;

  }

   goTojuzgados(){
    this.router.navigate(['admin/admin/estados']);
  }

}
