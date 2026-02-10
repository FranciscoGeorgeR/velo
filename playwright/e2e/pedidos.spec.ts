import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('Deve consultar pedidos', async ({ page }) => {
    //Arrange
    await page.goto('http://localhost:5173');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    //Act
    const NUMERO_DO_PEDIDO = 'VLO-B6A2MC'
   
    await page.getByLabel('Número do Pedido').fill(NUMERO_DO_PEDIDO)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    //Assert
    await expect(page.getByText(NUMERO_DO_PEDIDO)).toBeVisible({timeout: 1000})
    await expect(page.getByTestId(`order-result-${NUMERO_DO_PEDIDO}`)).toContainText(NUMERO_DO_PEDIDO)

    await expect(page.getByText('APROVADO')).toBeVisible({timeout: 1000})
    await expect(page.getByTestId(`order-result-${NUMERO_DO_PEDIDO}`)).toContainText('APROVADO')

});