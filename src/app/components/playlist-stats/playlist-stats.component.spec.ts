import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistStatsComponent } from './playlist-stats.component';

describe('PlaylistStatsComponent', () => {
  let component: PlaylistStatsComponent;
  let fixture: ComponentFixture<PlaylistStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
