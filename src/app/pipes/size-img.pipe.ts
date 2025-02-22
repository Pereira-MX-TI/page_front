import { inject, Pipe, PipeTransform } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'sizeImg',
  standalone: true,
})
export class SizeImgPipe implements PipeTransform {
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  // Este método se llama cuando el pipe es invocado
  transform(value: string): Observable<string> {
    // Usamos BreakpointObserver para detectar los puntos de ruptura
    return this.breakpointObserver
      .observe([
        Breakpoints.XSmall, // Para pantallas pequeñas (320px y menos)
        Breakpoints.Small, // Para pantallas medianas (480px y menos)
        Breakpoints.Medium, // Para pantallas grandes (800px y menos)
        Breakpoints.Large, // Para pantallas más grandes (1200px y menos)
        Breakpoints.XLarge, // Para pantallas extragrandes
      ])
      .pipe(
        map((result) => {
          // Dependiendo de la pantalla, devolvemos la ruta de la imagen adecuada
          if (result.matches) {
            if (result.breakpoints[Breakpoints.XSmall]) {
              return `${value}/320.avif`; // Imagen para pantallas pequeñas
            } else if (result.breakpoints[Breakpoints.Small]) {
              return `${value}/480.avif`; // Imagen para pantallas medianas
            } else if (result.breakpoints[Breakpoints.Medium]) {
              return `${value}/800.avif`; // Imagen para pantallas grandes
            } else if (result.breakpoints[Breakpoints.Large]) {
              return `${value}/1200.avif`; // Imagen para pantallas extra grandes
            } else if (result.breakpoints[Breakpoints.XLarge]) {
              return `${value}_big.avif`; // Imagen para pantallas muy grandes
            }
          }
          return value; // Si no coincide con ningún breakpoint, usamos la imagen por defecto
        })
      );
  }
}
