import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { checkmarkCircle, refreshCircle, closeCircle, eye, cart } from 'ionicons/icons';

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
  <!-- Hero Section -->
  <div class="hero-section">
    <ion-icon name="cart" size="large"></ion-icon>
    <h2>Welcome to Smart Cart</h2>
    <p>Create, manage, and organize your shopping lists effortlessly.</p>
  </div>

  <!-- Featured Section -->
  <div class="featured-section">
    <ion-card class="feature-card">
      <ion-card-header>
        <ion-card-title>Create New List</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button expand="full" color="warning" style="--ion-color-warning-contrast: #ffffff;" routerLink="/new-list">
          Add List <ion-icon slot="end" name="checkmark-circle"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-card>

    <ion-card class="feature-card">
      <ion-card-header>
        <ion-card-title>Load Saved List</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button expand="full" color="secondary" routerLink="/load-list">
          Load List <ion-icon slot="end" name="refresh-circle"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-card>

    <ion-card class="feature-card">
      <ion-card-header>
        <ion-card-title>Delete List</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-button expand="full" color="danger" routerLink="/delete-list">
          Delete List <ion-icon slot="end" name="close-circle"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </div>

  <!-- Recent Activities (Optional) -->
  <div class="recent-activities">
    <h3>Recent Activities</h3>
    <ion-list>
      <ion-item>
        <ion-label>Shopping List 1</ion-label>
        <ion-button fill="clear" color="medium" routerLink="/load-list">
          <ion-icon name="eye"></ion-icon> View
        </ion-button>
      </ion-item>
      <ion-item>
        <ion-label>Shopping List 2</ion-label>
        <ion-button fill="clear" color="medium" routerLink="/load-list">
          <ion-icon name="eye"></ion-icon> View
        </ion-button>
      </ion-item>
    </ion-list>
  </div>
</ion-content>
  `,
  styles: [`
    .hero-section {
      text-align: center;
      padding: 20px;
      background-color: var(--ion-color-primary);
      color: #fff;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .hero-section h2 {
      font-size: 28px;
      margin: 10px 0;
    }

    .hero-section p {
      font-size: 16px;
      margin: 0;
    }

    .featured-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }

    .feature-card {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .recent-activities {
      margin-top: 20px;
    }

    .recent-activities h3 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    ion-card {
      margin-bottom: 15px;
    }

    ion-button {
      margin-top: 10px;
    }
  `]
})
export class HomeComponent {
  isDarkMode = false;

  constructor() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    addIcons({ moon, sunny }); // ✅ Register the icons
    this.loadTheme();

    addIcons({
      checkmarkCircle,
      refreshCircle,
      closeCircle,
      eye,
      cart

    });
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
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}
