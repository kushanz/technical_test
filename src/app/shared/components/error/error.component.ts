import { Component, input } from '@angular/core';

@Component({
  selector: 'error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  text = input<string>('An error occurred. Please try again later.');

}
