import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSendSuccesssComponent } from './notification-send-successs.component';

describe('NotificationSendSuccesssComponent', () => {
  let component: NotificationSendSuccesssComponent;
  let fixture: ComponentFixture<NotificationSendSuccesssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSendSuccesssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSendSuccesssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
