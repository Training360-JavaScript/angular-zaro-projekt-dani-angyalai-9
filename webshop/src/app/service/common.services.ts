import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export function getURL(serviceName: string) {
  return environment.apiBaseUrl + serviceName;
}

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
