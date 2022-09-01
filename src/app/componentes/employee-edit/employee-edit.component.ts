import { Component, OnInit } from '@angular/core';
// importar o service
import { RestApiService } from 'src/app/service/rest-api.service';
// importar o Router e a classe ActivateRoute
import { Route, ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  // 1º Parte - definir uma propriedade de titulo do componente
  tituloComp: string = 'Alterar Registro'

    //2º Parte - praticar a referencia de instancia das classes importadas

  constructor(
    public restApi: RestApiService,
    public roteamento: Router,
    public copiaRota: ActivatedRoute
  ) { }

  // 3º Parte - criar propriedade para ser uma "cópia (tirar uma foto)" 
  // da rota pela qual o conjunto de dados vai circular
  rotaCopiada = this.copiaRota.snapshot.params['id']

  //  4º Parte - criar uma propriedadde par receber os dados alterados
  atualizarDados: any = {}

  // 5º Parte - "priorizar" o carregamento do registro escolido para receber as alterações
  ngOnInit(): void {
    // chamar injeção de dependencia e acessar a tarefa assincrona
    // acessarUmRegistro()
    this.restApi.acessarUmRegistro(this.rotaCopiada).subscribe((dados:any) => {
      this.atualizarDados = dados
    })
  }

// 6º Parte - criar um método/função para acessar a tarefa assincrona e 
// reenviar os dados alterados para a base
atualizacaoRegistro(){
  if(confirm('Tem certeza que deseja alterar o registro')){
    // chamar a injeção de dependdencia
    this.restApi.alterarDados(this.rotaCopiada, this.atualizarDados).subscribe(() => {
      this.roteamento.navigate(['employee-list'])
    })
  }
}

}
