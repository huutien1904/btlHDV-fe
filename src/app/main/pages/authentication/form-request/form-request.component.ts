import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormRequestService } from '../form-request.service';

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})
export class FormRequestComponent implements OnInit {
  public formRequest: FormGroup;
  public id = "8e4352972abe8bd8c4f7617a5ad35876"
  constructor(
    private fb: FormBuilder,
    private _formR : FormRequestService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.formRequest = this.fb.group({
      
      idTelegram: [""],
      cityName: [""],
      tokenBotTele: [""],
      numberDays:[""],
    });
  }
  
  submitForm(){
    console.log(this.formRequest.value)
    console.log(this.formRequest.controls['cityName'].value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D'))
    this._formR.getDetailWeather(this.formRequest.get('cityName').value,this.id).subscribe((res) =>{
      console.log(res)
      if(res){
        var nhietDo = res.main.temp;
        var nhietDoMax = res.main.temp_max;
        var nhietDoMix = res.main.temp_min;
        let infor = `Thông tin thời tiết thành phố ${res.name}
        đang rất nóng
        `
        console.log(this.formRequest.get('tokenBotTele'))
        this._formR.sendInformationForTele(infor,this.formRequest.get('tokenBotTele').value).subscribe((res) =>
        {
          if(res.ok){
            this._router.navigate(['/pages/authentication/send-infomation-success']);
          }
        
        })
      }
    })
  }
}
