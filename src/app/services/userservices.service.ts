import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {

  private userEmail!:string;
  private userData!:string;
  private ApiUrl = "http://localhost:3000/users"; //Variable privada que conecta la API

  constructor(private http:HttpClient) { }

  login(email:string, password:string):void {
    const loginUrl = `${this.ApiUrl}/login`
    const formData = {
      email: email,
      password: password
    }
    this.http.post(loginUrl, formData, {headers:this.getAuthHeaders()})
    .subscribe(
      (response:any) => {
        // this.authToken = response.accessToken;
        localStorage.setItem("token", response.token)
        console.log("response: ", response);
        this.userEmail = formData.email;
      },
      (error) => {
        if(error instanceof HttpErrorResponse){
          if(error.error instanceof ErrorEvent){
            console.log("Error: ", error.error.message);
          }
        else {
          console.error(`codigo de error ${error.status}` + `mensaje: ${error.error}`)
        }
        }
      }
    )
  }

  create(username:string,email:string,password:string):void{
    const createUrl = `${this.ApiUrl}/create`
    const formData = {
      username: username,
      email: email,
      password: password
    }
    this.http.post(createUrl,formData)
    .subscribe(
      (response:any) => {
        console.log("Registro exitoso. ", response);
      },
      (error) => {
        console.log("Error: ", error);
      }
    )
  }

  getUser(){
    const getUrl = `${this.ApiUrl}/${this.userEmail}`;
    return this.http.get(getUrl);
  }

  updateUser(body:any){
    const updateUrl = `${this.ApiUrl}/update/${body._id}`
    const formData = body

    console.log("Usuario actualizado con éxito", formData, updateUrl);

    this.http.put(updateUrl,formData)
    .subscribe(
      (response:any) => {
        console.log("Usuario actualizado con éxito. ", response);
      },
      (error) => {
        console.log("Error: ", error);
      }
    )
  }

  //Método para obtener la autorización del header
  private getAuthHeaders():HttpHeaders{
    const authToken = localStorage.getItem("token");
    const headers = new HttpHeaders({"Authorization":`Bearer ${authToken}`});
    return headers;
  }

}
