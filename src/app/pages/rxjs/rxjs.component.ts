import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

   /* this.retornaObservable().pipe(
      retry(1) //tente mais uma vez
    ).subscribe(
      valor => console.log('Subs:', valor),
      error => console.warn('Error', error),
      () => console.info('Obs terminado')
      
    ); */

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo() {
    return interval(500)
            .pipe(
              take(10),
              map( valor =>  valor + 1),
              filter( valor => ( valor % 2 === 0 ) ? true: false ),
            );
  }

   private retornaObservable(): Observable<number> {
      let i = -1;

      const obs$ = new Observable<number>( observer => {
  
        const intervalo = setInterval( () => {
          
          i++;
          observer.next(i);
  
          if ( i === 4 ) {
            clearInterval( intervalo );
            observer.complete();
          }
  
          if ( i === 2 ) {
            observer.error('i llego al valor de 2 encerra la execución');
          }
  
        }, 1000 )
  
      });

      return obs$;
    }

}
