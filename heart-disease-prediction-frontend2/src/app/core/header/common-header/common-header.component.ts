import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-common-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './common-header.component.html',
  styleUrl: './common-header.component.css'
})
export class CommonHeaderComponent {

}
