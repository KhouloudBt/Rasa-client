import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSynonymsComponent } from './send-synonyms.component';

describe('SendSynonymsComponent', () => {
  let component: SendSynonymsComponent;
  let fixture: ComponentFixture<SendSynonymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendSynonymsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSynonymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
