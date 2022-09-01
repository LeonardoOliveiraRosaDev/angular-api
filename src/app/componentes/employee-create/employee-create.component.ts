import { Component, Input, OnInit } from '@angular/core';
// importar o service
import { RestApiService } from 'src/app/service/rest-api.service';
// importar a classse router
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  // definir a propriedade de titulo do componente
  tituloComp:string = 'Criar Registro'
  // 1º parte - definir o objeto literal que recebera o conjunto de dados
  @Input() dadosRegistro = {
    name: '',
    email: '',
    phone: ''
  }

  constructor(
    // 2º parte - definir as referencias de instancia e criar as injeções de dependencia
    public restApi: RestApiService,
    public routeamento: Router
  ) { }

  ngOnInit(): void {
  }

  // 3º Parte - Criar um método/função para enviar os dados capturados - a partir da view - para o service
  inserirColaborador(){
    // chamar a injeção de dependencia para enviar os dados posteriormente, ser roteado para outro componente
    this.restApi.inserirDados(this.dadosRegistro).subscribe(() => {
      this.routeamento.navigate(['/employee-list'])
    })
  }

}
