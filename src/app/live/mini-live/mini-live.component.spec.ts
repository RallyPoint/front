import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniLiveComponent } from './mini-live.component';

describe('MiniLiveComponent', () => {
  let component: MiniLiveComponent;
  let fixture: ComponentFixture<MiniLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
