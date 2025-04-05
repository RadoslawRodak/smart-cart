import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Smart Cart</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="toggleDarkMode()">
            <ion-icon slot="icon-only" [name]="isDarkMode ? 'sunny' : 'moon'"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="home-container">
        <h1 class="title">Smart Cart</h1>
        <ion-button expand="full" color="warning" routerLink="/new-list" class="button">
          Add List <ion-icon slot="end" name="checkmark-circle"></ion-icon>
        </ion-button>
        <ion-button expand="full" color="secondary" routerLink="/load-list" class="button">
          Load List <ion-icon slot="end" name="refresh-circle"></ion-icon>
        </ion-button>
        <ion-button expand="full" color="danger" routerLink="/delete-list" class="button">
          Delete List <ion-icon slot="end" name="close-circle"></ion-icon>
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    :root {
      --background-light: #ffffff;
      --background-dark: #121212;
      --text-light: #333;
      --text-dark: #f1f1f1;
    }

    .dark-theme {
      --ion-background-color: var(--background-dark);
      --ion-text-color: var(--text-dark);
    }

    .light-theme {
      --ion-background-color: var(--background-light);
      --ion-text-color: var(--text-light);
    }

    .home-container {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .button {
      width: 80%;
      max-width: 300px;
      margin: 10px 0;
      font-size: 18px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class HomeComponent {
  isDarkMode = false;

  constructor() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    addIcons({ moon, sunny }); // ✅ Register the icons
    this.loadTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  loadTheme() {
    const storedTheme = localStorage.getItem('darkMode');
    this.isDarkMode = storedTheme === 'true';
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      document.documentElement.style.setProperty('--ion-background-color', '#121212');
      document.documentElement.style.setProperty('--ion-text-color', '#f1f1f1');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      document.documentElement.style.setProperty('--ion-background-color', '#ffffff');
      document.documentElement.style.setProperty('--ion-text-color', '#000000');
    }
  }
}
