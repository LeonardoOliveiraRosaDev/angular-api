import { Injectable } from '@angular/core';
// importa o model domain
import { Employee } from '../model/employee';

// Importar os recursos para lidar com as requisicoes HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importar recursos para a construção das tarefas Assincronas
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable()

export class RestApiService {
  // Definir caminho nescessário para que a base de dados possa ser acessada
  apiURL: string = 'http://localhost:3000'

  // Fazer a referencia à classe HttpClient para auxiliar nas requisições http 
  // e serão implementadas
  constructor(private reqHtp: HttpClient) { }

  // Configurar as credencias de acesso para o cross-domain possa
  // acessar a base de dados e, então modifica-las
  autorizacaoAcesso = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  /*
  
  ==================================================================================================
                 CONTRUIR A API - SEUS RESPECTIVOS MÉTODOS E TAREFAS ASSINCRONAS
  ==================================================================================================
  
  */

  // Trabalhar com os métodos get() recuperar, post() inserir, put() editar, delete() excluir 
  // - CRUD - Create - Read - Update - Delete

  // 1º Parte - Definir a 1º tarefa assincrona: Estabelecer um método/função/requisição http
  // para ler todos os dados armazenados na base 
  lerDadosColabs(): Observable<Employee>{
    // http://localhost:3000/employees
    return this.reqHtp.get<Employee>(this.apiURL + '/employees')
    .pipe(
      // "duto" de cominucação diretat entre a requisição
      // estabelecida no front e o backend simulado
      retry(1),
      catchError(this.tratarErro)
    )

  }

 /*
 
  2º parte - criar um método/função/requisição para que seja acessado somente um único registro - da base
  que seja devidamente identificado. 

 */
  acessarUmRegistro(id:any): Observable<Employee>{
    // http://localhost:3000/employees/:id
    return this.reqHtp.get<Employee>(this.apiURL + '/employees/'+id)
    .pipe(retry(1),
    catchError(this.tratarErro))
  }

/*

  3º Parte - criar um método/função/requisição - para que seja descrita a possibilidade
  de inserção de dados na base

*/

inserirDados(dadosRecebidos: any): Observable<Employee>{
  return this.reqHtp.post<Employee>(this.apiURL+'/employees', JSON.stringify(dadosRecebidos), this.autorizacaoAcesso)
    .pipe(retry(1),
    catchError(this.tratarErro))
}

/* 4º Parte - criar um método/função/requeisição para atualização/alteração de um registro

- por vez - ja armazenado na base

*/
alterarDados(id:any, novosDados:any): Observable<Employee>{
   return this.reqHtp.put<Employee>(this.apiURL+'/employees/'+id, JSON.stringify(novosDados), this.autorizacaoAcesso)
   .pipe(retry(1),
    catchError(this.tratarErro))
}

/*

  5º Parte- criar um método/função/requisição para exclusão de registro da base de dados 
  desde que este registro estaja devidademente identificado

*/

excluirDados(id:any){
   return this.reqHtp.delete<Employee>(this.apiURL+'/employees/'+id, this.autorizacaoAcesso)
   .pipe(retry(1),
   catchError(this.tratarErro))
}

// Definir uma função de tratamento de erro que auxiliara na invesstigacao de onde os errose eventualmente ocorre
tratarErro(erro: any){
  // definir uma propriedade para receber o valor informativo a respeito de onde é qual foi o erro ocorrido
  let mensagemErro: any = ''

  // Criar uma estrutura de verificação
  // Saber em qual pedaço da aplicação o erro ocorre
  if(erro.error instanceof ErrorEvent){
    // trattatr o erero - se ocorreu no front
    mensagemErro = erro.error.meessage
  }else{
    // tratar o erro - se ocorrer no back
    mensagemErro = `Codigo erro: ${erro.status}\nMensagem do erro é: ${erro.meessage}`
  }
  // exibir o erro na tela
  alert(mensagemErro)
  return throwError(() => mensagemErro)
}

}
