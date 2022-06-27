import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormRequestService } from '../form-request.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.scss']
})
export class FormRequestComponent implements OnInit {
  public formRequest: FormGroup;
  public id = "8e4352972abe8bd8c4f7617a5ad35876"
  public myMoment: moment.Moment
  public body = {
    "username": "tien19042003",
    "password": "12345"  
}
public check = false;
  constructor(
    private fb: FormBuilder,
    private _formR : FormRequestService,
    private _router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formRequest = this.fb.group({
      
      idTelegram: [""],
      cityName: [""],
      tokenBotTele: [""],
      numberDays:[""],
    });
    this._formR.login(this.body).subscribe(res => {
      var users = res;
      console.log('data response', users);
    });
  }
  
  submitForm(){
    console.log(this.formRequest.value)
    console.log(this.formRequest.controls['cityName'].value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D'))

    this._formR.getDetailWeather(this.formRequest.get('cityName').value,this.id,this.formRequest.get('numberDays').value).subscribe((res) =>{
      console.log(res)
      if(res){
        
        
        let infor = `Thông tin thời tiết thành phố ${res.city.name}`
        res.list.map((item,index) =>{
          var today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0!
          let dd = today.getDate();
          var nhietDo = Math.round(item.main.temp) ;
          var nhietDoMax = Math.round(item.main.temp_max);
          var nhietDoMix = Math.round(item.main.temp_min);
          var tocDOGio = item.wind.speed
          dd+=index
          var today1 = dd + '/' + mm + '/' + yyyy;
          infor+=`
          Ngày ${today1}
          
          Hiện tại trời đang ${item.weather[0].description} , 

          Nhiệt độ hiện tại đang là ${nhietDo} độ, 
  
          Nhiệt độ cao nhất trong ngày là ${nhietDoMax},
  
          Nhiệt độ thấp nhất trong ngày là ${nhietDoMix},
  
          Tốc độ gió là ${tocDOGio} km/h`
        })
        infor+="Chúc bạn 1 ngày tốt lành"
        console.log(infor)
        this._formR.sendInformationForTele(infor,this.formRequest.get('tokenBotTele').value).subscribe((res) =>
        {
          console.log(res)
          if(res){
            console.log("test")
            // this.toastr.success('👋 Bạn đã tạo HSM mới', 'Thành công', {
            //   positionClass: 'toast-top-center',
            //   toastClass: 'toast ngx-toastr',
            //   closeButton: true
            // });
            this._router.navigate(['/pages/authentication/send-infomation-success']);
          }
          else{
            this.check = true;
          }
        
        })
      }
    })
  }
}
