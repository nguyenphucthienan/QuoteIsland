export const environment = {
  production: true,
  apiUrl: 'https://quoteisland.herokuapp.com/api',
  whitelistedDomains: ['quoteisland.herokuapp.com'],
  blacklistedRoutes: ['quoteisland.herokuapp.com/api/auth'],
  bannerImageUrls: {
    registerPage: './assets/banners/register.jpeg',
    loginPage: './assets/banners/login.jpeg',
    aboutPage: './assets/banners/about.jpeg',
    notFoundPage: './assets/banners/not-found.jpeg',
    adminPage: './assets/banners/admin.jpeg',
    quotesPage: './assets/banners/quotes.jpeg',
    quoteDetailPage: './assets/banners/quote-detail.jpeg',
    authorsPage: './assets/banners/authors.jpeg',
    categoriesPage: './assets/banners/categories.jpeg'
  },
  defaultUserPhotoUrl: './assets/users/default.png'
};
