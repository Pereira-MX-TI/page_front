import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SeoService } from '../../../../services/seo.service';
import { PresentationComponent } from '../../components/presentation/presentation.component';
import { UsInfoComponent } from '../../components/us-info/us-info.component';
import { ComprehensiveSolutionsComponent } from '../../components/comprehensive-solutions/comprehensive-solutions.component';
import { ContainerProblemSolutionComponent } from '../../components/container-problem-solution/container-problem-solution.component';
import { MoreInfoComponent } from '../../components/more-info/more-info.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { WindowSizeService } from '../../../../services/window-size.service';

@Component({
  selector: 'app-quater',
  standalone: true,
  imports: [
    PresentationComponent,
    UsInfoComponent,
    ComprehensiveSolutionsComponent,
    ContainerProblemSolutionComponent,
    MoreInfoComponent,
    HowItWorksComponent,
  ],
  templateUrl: './quater.component.html',
  styleUrl: './quater.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class QuaterComponent {
  constructor(
    private seoService: SeoService,
    private windowSizeService: WindowSizeService
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
  }

  private setMetaTags(): void {
    this.seoService.setTitle('Administración del agua | Quater');
    this.seoService.setDescription(
      'Optimiza la gestión del agua con tecnología LoRaWAN e IoT. Monitorea consumo, calidad y distribución en tiempo real. Reduce desperdicios, mejora la eficiencia y toma decisiones con datos precisos.'
    );
    this.seoService.setIndexingFollower(true);
    this.seoService.setCanonicalURL();
  }

  openInfo(res: 'email' | 'phone'): void {
    if (this.windowSizeService.checkMinScreenSize(767)) return;

    if (res === 'email') {
      window.location.href = 'mailto:solucionescomerciales_jmpf@outlook.com';
    } else if (res === 'phone') {
      window.location.href = 'tel:2228947194';
    }
  }
}
