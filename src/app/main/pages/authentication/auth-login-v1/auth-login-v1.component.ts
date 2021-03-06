import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { LoginService } from "./auth-login.service";
import { FormRequestService } from "../form-request.service";

@Component({
  selector: "app-auth-login-v1",
  templateUrl: "./auth-login-v1.component.html",
  styleUrls: ["./auth-login-v1.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLoginV1Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public submitted = false;
  public passwordTextType: boolean;
  
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _loginService : LoginService,
    private _formRequestService : FormRequestService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    // this.router.navigate(['/pages/authentication/form-request'])
    this.submitted = true;
    
    // // stop here if form is invalid
    this._formRequestService.login(this.loginForm.value).subscribe((res) => {
      if(res){
        console.log("localstorate")
        // localStorage.setItem('currentUser',this.loginForm.value);

        this.router.navigate(['/pages/authentication/form-request']);
      }
    })
    if (!this.loginForm.invalid) {
      
      console.log(this.loginForm.value)
      return;
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
    // localStorage.setItem('currentUser',"tien");


    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
      
      // this._formRequestService.getAllUser().subscribe((res) => console.log(res))
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
