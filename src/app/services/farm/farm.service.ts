import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataBaseSchema } from 'src/app/models/db.model';
import { Farm } from 'src/app/models/farm.model';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private farms = new BehaviorSubject<Farm[]>([]);

  constructor() {
    const db = JSON.parse(localStorage.getItem('aegro-data') as string) as DataBaseSchema;
    if (db) {
      this._farms = db.farms;
    }
  }

  private get _farms() {
    return this.farms.getValue();
  }

  private set _farms(value: Farm[]) {
    this.farms.next(value);
  }

  public getFarms(): Observable<Farm[]> {
    return this.farms.asObservable();
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
        this
          .getById(f.id)
          .subscribe(
            (res: Farm | null) => {
              if (res) {
                subscriber.next(false);
                subscriber.complete();
              } else {
                db.farms.push(f);
                localStorage.setItem('aegro-data', JSON.stringify(db));
                this._farms = db.farms;
                subscriber.next(true);
                subscriber.complete();
              }
            }
          );
      } catch (error) {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  public getById(id: string): Observable<Farm | null> {
    return new Observable(subscriber => {
      const db = JSON.parse(localStorage.getItem('agro-data') as string) as DataBaseSchema;
      if (db) {
        let farm: Farm | undefined = db.farms.find(farm => farm.id === id);
        if (farm) {
          subscriber.next(farm);
        } else {
          subscriber.next(null);
        }
        subscriber.complete();
      } else {
        subscriber.next(null);
        subscriber.complete();
      }
    });
  }

}
