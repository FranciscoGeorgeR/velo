import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLockupActions'

test.describe('Consulta de pedido', () => {
    test.beforeEach(async ({ app }) => {
        await app.orderLockup.open()
    })

    test('deve consultar um pedido aprovado', async ({ app }) => {
        const order: OrderDetails = {
            number: 'VLO-B6A2MC',
            status: 'APROVADO',
            color: 'Glacier Blue',
            wheels: 'sport Wheels',
            customer: {
                name: 'Francisco George',
                email: 'teste@teste.com',
            },
            payment: 'À Vista'
        }

        await app.orderLockup.searchOrder(order.number)

        await app.orderLockup.validateOrderDetails(order)
        await app.orderLockup.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido reprovado', async ({ app }) => {
        const order: OrderDetails = {
            number: 'VLO-NG12EL',
            status: 'REPROVADO',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Francisco Chico',
                email: 'teste@com.br',
            },
            payment: 'À Vista'
        }

        await app.orderLockup.searchOrder(order.number)

        await app.orderLockup.validateOrderDetails(order)
        await app.orderLockup.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ app }) => {
        const order: OrderDetails = {
            number: 'VLO-C3ST0T',
            status: 'EM_ANALISE',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Ana de Oliveira',
                email: 'teste1@teste.com',
            },
            payment: 'À Vista'
        }

        await app.orderLockup.searchOrder(order.number)

        await app.orderLockup.validateOrderDetails(order)
        await app.orderLockup.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
        const order = generateOrderCode()

        await app.orderLockup.searchOrder(order)
        await app.orderLockup.validateOrderNotFound()
    })

    test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
        const orderCode = 'XYZ-999-INVALIDO'

        await app.orderLockup.searchOrder(orderCode)
        await app.orderLockup.validateOrderNotFound()
    })
})