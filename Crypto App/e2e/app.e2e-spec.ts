import { AppPage } from './app.po';

describe('CryptoCurrencie App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Crytocurrencies app!');
  });
});
