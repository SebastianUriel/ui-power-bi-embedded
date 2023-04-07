import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reports } from 'src/app/models/model/reports';
import { EmbeddedToken } from 'src/app/models/model/embeddedToken';

@Injectable({
    providedIn: 'root'
})
export class PowerBIService {

    private baseUrl: string = "https://api.powerbi.com/v1.0/myorg";

    constructor(private http: HttpClient) { }

    public getEmbeddedToken(reportId: string, datasetId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            datasets: [
                {
                    id: datasetId
                }
            ],
            reports: [ 
                {
                    id: reportId
                }
            ]
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/GenerateToken', request, { headers: headers });
    }

    public getReports(): Observable<Reports> {
        const headers = this.getHeaders();
        return this.http.get<Reports>(this.baseUrl + '/reports', { headers: headers });
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
    }

}