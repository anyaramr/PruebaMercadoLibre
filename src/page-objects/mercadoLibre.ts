import { Locator, Page, Expect, expect } from '@playwright/test';
import * as fs from 'fs';

export class MercadoLibre {
  readonly page: Page;
  readonly searchBar: Locator;
  readonly searchButton: Locator;
  readonly resultsTitle: Locator;
  readonly firstResult: Locator;
  readonly secondResult: Locator;
  readonly thirdResult: Locator;
  readonly backToListLink: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.getByPlaceholder('Buscar productos, marcas y más…');
    this.searchButton = page.getByRole('button', { name: 'Buscar' });
    this.resultsTitle = page.getByRole('heading', { name: 'Camisetas', exact: true });
    this.firstResult = page.locator('//*[@id=":R5ad9:"]/div[2]/div[1]/a/h2');
    this.secondResult = page.locator('//*[@id=":R9ad9:"]/div[2]/div[1]/a/h2');
    this.thirdResult = page.locator('//*[@id=":Rdad9:"]/div[2]/div[1]/a/h2');
    this.backToListLink = page.getByRole('link', { name: 'Volver al listado' })
    this.productTitle = page.locator('//*[@id="header"]/div/div[2]/h1');
    this.productPrice = page.locator('//*[@id="price"]/div/div/div/span/span[3]')

  }

  async SearchProduct(product: string){
    await expect(this.searchBar).toBeVisible(); 
    await this.searchBar.click();
    await this.searchBar.fill(product);
    await this.searchButton.click();
    await expect(this.resultsTitle).toBeVisible(); 
  }

  async SelectFirstProductFromResultsList(){
    await expect(this.resultsTitle).toBeVisible();
    await this.firstResult.click();
    await expect(this.productTitle).toBeVisible();
  }

  async SelectSecondProductFromResultsList(){
    await expect(this.resultsTitle).toBeVisible();
    await this.secondResult.click();
    await expect(this.productTitle).toBeVisible();
  }

  async SelectThirdProductFromResultsList(){
    await expect(this.resultsTitle).toBeVisible();
    await this.thirdResult.click();
    await expect(this.productTitle).toBeVisible();
  }

  async WriteToFile(){
    await expect(this.productTitle).toBeVisible();
    var productTitle = await this.productTitle.innerText();
    var productPrice = await this.productPrice.innerText();
    var productLink = await this.page.url();
    console.log(productTitle,productPrice,productLink);
    const result = `${productTitle}, ${productPrice}, ${productLink}\n`;
    fs.appendFileSync('./test-results.txt', result);
    //fs.writeFileSync('./test-results.txt', `${productTitle},${productPrice},${productLink}`);
  }

  async BackToList(){
    await this.backToListLink.click()
  }

}