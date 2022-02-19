import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  showError() {
    this.toastr.error('Error');
  };
  
  showSuccess(message: string) {
    this.toastr.success(message);
  };
}

