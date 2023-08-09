import { test} from "@playwright/test"
import { MercadoLibre } from "../page-objects/mercadoLibre";

test('Test automation para obtener listado de productos, precios y links.', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.do/');
  const mercadoLibre = new MercadoLibre(page);
  await mercadoLibre.SearchProduct('camisetas');
  await mercadoLibre.SelectFirstProductFromResultsList();
  await mercadoLibre.WriteToFile();
  await mercadoLibre.BackToList();
  await mercadoLibre.SelectSecondProductFromResultsList();
  await mercadoLibre.WriteToFile();
  await mercadoLibre.BackToList();
  await mercadoLibre.SelectThirdProductFromResultsList();
  await mercadoLibre.WriteToFile();
});