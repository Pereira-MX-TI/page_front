import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'message-empty',
  standalone: true,
  templateUrl: './message-empty.component.html',
  styleUrls: ['./message-empty.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageEmptyComponent {
  @Input() nameRegister = '';
}
