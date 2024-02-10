<div align="center">
<p align="center">
  <img src="/apps/demo/src/assets/supabase-logo.png" alt="Logo">
</p>

<a href="https://github.com/rustygreen/ng-supabase">
  <h1 align="center">ng-supabase</h1>
</a>

<p align="center">
  An Angular component library for your <a href="https://supabase.com/" target="_blank">Supabase</a> project!
</p>

[![npm version](https://badge.fury.io/js/@ng-supabase%2Fcore.svg)](https://badge.fury.io/js/@ng-supabase%2Fcore)
![NPM Downloads](https://img.shields.io/npm/dt/%40ng-supabase%2Fcore)
[![Build Status](https://github.com/rustygreen/ng-supabase/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/rustygreen/ng-supabase/actions/workflows/ci.yaml/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d6d66504-cf8d-4eed-93d7-8dcbd03ec91d/deploy-status)](https://app.netlify.com/sites/ng-supabase/deploys)

</div>

---

## Features

- 🔥 Pre-designed Supabase components for popular UI libraries (PrimeNG, Material, Bootstrap)
- ✨ Eliminate boilerplate code and get right to consuming Supabase services
- 📝 Extendable and highly-configurable components
- 😍 Full Supabase authentication goodness, ready to go!
- 💪 Built on top of [Angular 17](https://blog.angular.io/introducing-angular-v17-4d7033312e4b) with [Signals](https://angular.io/guide/signals) and [SSR](https://angular.io/guide/ssr) support

## Docs

- [Example Site](https://ng-supabase.netlify.app/)
- Full docs coming soon...
  > In the meantime, please checkout the [demo code](https://github.com/rustygreen/ng-supabase/tree/main/apps/demo) for a fully working example.

## Getting Started

1. Choose the desired UI library

| UI Library       | Package                  |
| ---------------- | ------------------------ |
| PrimeNG          | `@ng-supabase/primeng`   |
| Angular Material | `@ng-supabase/material`  |
| Bootstrap        | `@ng-supabase/bootstrap` |

2. Install the desired package.

Example `npm install @ng-supabase/primeng`

3. Add package specific styling/dependencies

For the [PrimeNG package](https://www.npmjs.com/package/@ng-supabase/primeng) you need to include the [PrimeFlex CSS](https://primeflex.org/).

Add to `styles.css`

```css
/* Add whatever PrimeNG theme you desire. */
@import 'primeng/resources/themes/lara-light-blue/theme.css';
@import 'primeng/resources/primeng.css';
@import 'primeicons/primeicons.css';
@import 'primeflex/primeflex.css';
```

4. Create the desired routes in your application for each of the authentication steps:

Example:

- Login (ex: `/login`)
- Register (ex: `/register`)
- Set Password (ex: `/set-password`)
- Reset Password (ex: `/reset-password`)

5. Use each of the `ng-supabase` components in your route components.

Example:

Your app: `login.component.ts`

```ts
// Angular.
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// ng-supabase.
import { LoginComponent as PrimeNgLoginComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-primeng-login',
  standalone: true,
  imports: [CommonModule, PrimeNgLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
```

Your app: `login.component.html`

```html
<supabase-login></supabase-login>
<!-- Plus add whatever other customizations you'd like -->
```

6. Configure the `ng-supabase` library.

Your app: `app.config.ts`

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideSupabase({
      apiUrl: 'https://YOUR_SUPABASE_URL.supabase.co',
      apiKey: 'YOUR_SUPABASE_ANONYMOUS_ACCESS_KEY',
      login: {
        socials: [SocialLogIn.Apple, SocialLogIn.Google],
      },
    }),
  ],
};
```

7. Run your application and let [ng-supabase](https://github.com/rustygreen/ng-supabase) do all the work ✨.

## Components

| Component      | Default Route     |
| -------------- | ----------------- |
| Login          | `/login`          |
| Register       | `/register`       |
| Set Password   | `/set-password`   |
| Reset Password | `/reset-password` |

### PrimeNG

### Login Component

![Login Component](/assets/primeng-login.png)

### Register Component

![Register Component](/assets/primeng-register.png)

### Reset Password Component

![Reset Password Component](/assets/primeng-reset-password.png)

### Set Password Component

![Set Password Component](/assets/primeng-set-password.png)

![Set Password Feedback](/assets/primeng-set-password-feedback.png)

![Set Password Validation](/assets/primeng-set-password-validation.png)

### Bootstrap

Coming soon...

### Material

Coming soon

## Development

### Create New Release

To generate a new release, use the following steps:

1. Run `npm run nx -- release --skip-publish` locally. This will create a commit with the version and changelog updates
2. Commit changes `git add -A && git commit -m "chore: bumped version"`.
3. Create a tag for the new version `git tag <tagname>`.
4. Push the changes (including the new tag) to the remote repository with `git push && git push --tags`.
5. The publish workflow will automatically trigger and publish the packages to the npm registry.

_see more on these steps [here](https://nx.dev/recipes/nx-release/publish-in-ci-cd)_
