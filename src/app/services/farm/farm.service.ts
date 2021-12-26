import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataBaseSchema } from 'src/app/models/db.model';
import { Farm } from 'src/app/models/farm.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private _farms = new BehaviorSubject<Farm[]>([]);

  private _selectedFarmId = new BehaviorSubject<string | null>(null);

  constructor() {
    const db = JSON.parse(localStorage.getItem('aegro-data') as string) as DataBaseSchema;
    if (db) {
      this.farms = db.farms;
    }
  }

  private get farms() {
    return this._farms.getValue();
  }

  private set farms(value: Farm[]) {
    this._farms.next(value);
  }

  public get selectFarmId(): string | null {
    return this._selectedFarmId.getValue();
  }

  public set selectFarmId(id: string | null) {
    this._selectedFarmId.next(id);
  }

  public getFarms(): Observable<Farm[]> {
    return this._farms.asObservable();
  }

  public selectFarm(): Observable<Farm | null> {
    return new Observable(subscriber => {
      let selectedFarmId$ = this._selectedFarmId.asObservable();
      selectedFarmId$.subscribe((id: string | null) => {
        const f = this.getById(id as string);
        subscriber.next(f);
      });
    });
  }

  public addFarm(name: string, plotQuantity: number): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      let db = JSON.parse(localStorage.getItem('aegro-data') as string) as DataBaseSchema;

      if(!db) {
        db = {
          farms: []
        };
      }

      try {
        const f = new Farm(name, plotQuantity);

        // Verifica se já existe no BD
        if (this.getById(f.id)) {
          subscriber.next(false);
          subscriber.complete();
        } else {
            db.farms.push(f);
            this.farms = db.farms;
            localStorage.setItem('aegro-data', JSON.stringify(db));
            subscriber.next(true);
            subscriber.complete();
        }
      } catch (error) {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  public getById(id: string): Farm | null {
    const f = this.farms.find(farm => farm.id === id);
    if (f) {
      return f;
    }
    return null;
  }

}
