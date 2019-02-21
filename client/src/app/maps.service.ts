import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

interface Location {
	latitude: string;
	longitude: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getLocation() {
  	return this.http.get<Location>('http://api.ipapi.com/api/check?acess_key=24f3513c1f1061ebc1e15a3c7b56ca11')
  }
}
