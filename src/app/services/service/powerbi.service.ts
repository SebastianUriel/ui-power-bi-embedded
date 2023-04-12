import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reports } from 'src/app/models/model/reports';
import { EmbeddedToken } from 'src/app/models/model/embeddedToken';
import { Report } from 'src/app/models/model/report';
import { Dashboards } from 'src/app/models/model/dashboards';
import { Dashboard, Tile } from 'powerbi-client';
import { Tiles } from 'src/app/models/model/tiles';

@Injectable({
    providedIn: 'root'
})
export class PowerBIService {

    private baseUrl: string = "https://api.powerbi.com/v1.0/myorg";

    constructor(private http: HttpClient) { }

    public getEmbeddedToken(reportId: string, datasetId: string): Observable<EmbeddedToken> {
        const headers = this.getHeaders();
        let request = {
            datasets: [{ id: datasetId }],
            reports: [{ id: reportId }]
        };
        return this.http.post<EmbeddedToken>(this.baseUrl + '/GenerateToken', request, { headers: headers });
    }

    public getReports(): Observable<Reports> {
        const headers = this.getHeaders();
        return this.http.get<Reports>(this.baseUrl + '/reports', { headers: headers });
    }

    public getReport(reportId: string): Observable<Report> {
        const headers = this.getHeaders();
        return this.http.get<Report>(this.baseUrl + '/reports/' + reportId, { headers: headers });
    }

    public getDashboards(): Observable<Dashboards> {
        const headers = this.getHeaders();
        return this.http.get<Dashboards>(this.baseUrl + '/dashboards', { headers: headers });
    }

    public getDashboard(dashboardId: string): Observable<Dashboard> {
        const headers = this.getHeaders();
        return this.http.get<Dashboard>(this.baseUrl + '/dashboards/' + dashboardId, { headers: headers });
    }

    public getTiles(dashboardId: string): Observable<Tiles> {
        const headers = this.getHeaders();
        return this.http.get<Tiles>(this.baseUrl + '/dashboards/' + dashboardId + '/tiles', { headers: headers });
    }

    public getTile(dashboardId: string, tileId: string): Observable<Tile> {
        const headers = this.getHeaders();
        return this.http.get<Tile>(this.baseUrl + '/dashboards/' + dashboardId + '/tiles/' + tileId, { headers: headers });
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
    }

}