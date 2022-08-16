# Hacker news interface

Here is an interface using the Hacker News API to display tops and news stories.

The interface displays the stories as a list and offers an infinite scroll to see more

On the UX/UI, I use Tailwind coupled to DaisyUI library to offer a simple and intuitive interface

Since there are a lot of API calls, I used the Next.JS cache control which works well, coupled with Vercel.

## Improvements

- possible internationalization with i18n (already setup)
- next-seo
- sentry -> handling error
- add unit test with JEST
- add integration test with Cypress.js
