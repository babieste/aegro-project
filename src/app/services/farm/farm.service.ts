import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataBaseSchema } from 'src/app/models/db.model';
import { Farm } from 'src/app/models/farm.model';
import { Plot } from 'src/app/models/plot.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private db: DataBaseSchema;

  private _farms = new BehaviorSubject<Farm[]>([]);

  private _selectedFarmId = new BehaviorSubject<string | null>(null);

  constructor() {
    this.db = JSON.parse(localStorage.getItem('aegro-data') as string) as DataBaseSchema;

    if (this.db) {
      this.farms = this.db.farms;
    } else {
      this.db = {
        farms: []
      };
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

  public saveNewFarm(name: string, plotQuantity: number): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      try {
        const f = new Farm(name, plotQuantity);

        // Verifica se já existe no BD
        if (this.getById(f.id)) {
          subscriber.next(false);
          subscriber.complete();
        } else {
            this.db.farms.push(f);
            this.farms = this.db.farms;
            this.saveDb()
            subscriber.next(true);
            subscriber.complete();
        }
      } catch (error) {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  public saveFarm(farm: Farm): Observable<boolean> {
    return new Observable(subscriber => {
      const index = this.db.farms.findIndex(f => f.id === farm.id);
      if (index > -1) {
        try {
          this.db.farms[index] = farm;
          this.saveDb();
          subscriber.next(true);
          subscriber.complete();
        } catch (error) {
          subscriber.next(false);
          subscriber.complete();
        }
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

  /**
   * Saves the current DB instance to LocalStorage.
   *
   * @throws This method throws an error. As per TypeScript:
   *
   * ```Throws a "QuotaExceededError" DOMException exception if the
   * new value couldn't be set. (Setting could fail if, e.g.,
   * the user has disabled storage for the site, or if the quota has
   * been exceeded.)```.
   */
  private saveDb(): void {
    localStorage.setItem('aegro-data', JSON.stringify(this.db));
  }

}
