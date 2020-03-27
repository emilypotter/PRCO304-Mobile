import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpotDetailPage } from './spot-detail.page';

describe('SpotDetailPage', () => {
  let component: SpotDetailPage;
  let fixture: ComponentFixture<SpotDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpotDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
