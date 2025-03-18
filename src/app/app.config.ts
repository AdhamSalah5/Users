import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { UsersComponent } from './users/users.component'; // ✅ Ensure this import works

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // ✅ Provides HttpClientModule for API calls
    provideRouter([
      { path: '', component: UsersComponent } // ✅ Correctly registered UsersComponent
    ])
  ],
};
