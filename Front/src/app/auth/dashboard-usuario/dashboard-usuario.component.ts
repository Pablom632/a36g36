import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstadisUsuariosService } from 'src/app/servicios/estadis-usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit {
  notas_glucemia: any;
  servicios: any;
  formNotasPOST: FormGroup | any;

  // Variables para el carrito
  Snombre: string = '';
  Smonto: string = '';
  nuevoPedido: any[] = [];

  dataid!: number;



  constructor(
    private paciente: EstadisUsuariosService,
    private usuario: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private routerAct: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.formNotasPOST = this.formBuilder.group({
 
      fecha_registro: ['', Validators.required],
      valor_glucemia: ['', Validators.required],
      comentario_registro: ['', Validators.required],
    });

    this.paciente.muestraNotasUsuario().subscribe({
      next: (notas_S) => {
        this.notas_glucemia = notas_S;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });

    this.paciente.muestraServicioAUsuario().subscribe({
      next: (servicios_S) => {
        this.servicios = servicios_S;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });

  // METODO PARA CAPTURAR EL ID



  }

  ////////////////////////////////////////////////////////////////////////////
  // METODO POST
  agregarNota(): void {
    if (this.formNotasPOST.valid) {
      //this.paciente.nuevaNota('http://localhost:8000/api/paciente/registros_glucemia/', {
      this.paciente.nuevaNota('http://localhost:3000/notas_usuarios', {

          fecha_registro: this.formNotasPOST.value.fecha_registro,
          valor_glucemia: this.formNotasPOST.value.valor_glucemia,
          comentario_registro: this.formNotasPOST.value.comentario_registro,
        })
        .subscribe((respuesta: any) => {
          alert('Nota registrada');
          this.getNotas()
          this.formNotasPOST.reset()

        });
    } else {
      alert('Ingrese los datos correctamente');
      this.formNotasPOST.markAllAsTouched();
    }



  }

  // METODO GET
  getNotas(){
    this.paciente.muestraNotasUsuario().subscribe({
      next: (notas_S) => {
        this.notas_glucemia = notas_S;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    });

  }
  // METODO DELETE
    eliminar(id:string){
      this.paciente.DELETE(id).subscribe(()=>{
        alert("nota modificada")
        this.getNotas()
        console.log("el id de delete es"+id)
      })
    }



  //////////////// CARRITO /////////////////
  agregarNombre(value: string): void {
    this.Snombre = value;
  }

  agregarMonto(value2: string): void {
    this.Smonto = value2;
  }

  agregarAlCarrito(): void {
    const nuevoItem = [this.Snombre, this.Smonto];

    if (!this.nuevoPedido) {
      this.nuevoPedido = [];
    }

    this.nuevoPedido.push(nuevoItem);

    this.Snombre = '';
    this.Smonto = '';
  }

  eliminarDelCarrito(index: number): void {
    if (index >= 0 && index < this.nuevoPedido.length) {
      this.nuevoPedido.splice(index, 1);
    }
  }
  calcularMontoTotal(): number {
    let total = 0;

    for (const item of this.nuevoPedido) {
      total += parseFloat(item[1]);
    }

    return total;
  }
  comprar() {
    this.router.navigateByUrl('/formulario-pago');
  }
}
