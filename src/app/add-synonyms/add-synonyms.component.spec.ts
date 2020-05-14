import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSynonymsComponent } from './add-synonyms.component';

describe('AddSynonymsComponent', () => {
  let component: AddSynonymsComponent;
  let fixture: ComponentFixture<AddSynonymsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSynonymsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSynonymsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
