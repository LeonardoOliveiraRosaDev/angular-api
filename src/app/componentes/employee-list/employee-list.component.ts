import { Component, OnInit } from '@angular/core';
// import o service
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // Deefinir uma propriedade para o titulo do nosso componente
  tituloComp:string = 'Lista Colaboradores'
  
  // 1º Parte - criar uma porpriedadee para ser a coleção iteravel de
  // dados com a qual o componente vai lidar
  listaColaboradores: any = []

  // 2º Parte - praticar a referencia de instancia o service
  // e utilizar a injeção de dependencia

  constructor(
    public restApi: RestApiService
  ) { }

  // 3º Parte - "Priorizar" o carregamento de algum conteudo na view do componente
  ngOnInit(): void {
    this.exibirRegistros()
  }

// criar um método/função para acessar o service que possui a tarefa assincrona e recupera todos os 
// registros de dados armazenados na base 
exibirRegistros(){
  // chamar a injeção de independencia para trazer os dados para o componente
  this.restApi.lerDadosColabs().subscribe((dados:{})=>{
    this.listaColaboradores = dados
  })
}

// 5º Parte - criar um método/função para acessar a tarefa assincrona
// que exclui um registro
excluirColaborador(id: any){
  // verificar se o usuario realmente quer excluir o registro
  if(confirm('Tem certeza que deseja excluir este registro ?')){
    // chamar a injeção de dependencia e acessar o método de exclusão
    this.restApi.excluirDados(id).subscribe(() => {
      this.exibirRegistros()
    })
  }
}

}
