

export const workbookPaymentWidget = (confirmationToken) => {
    const checkout = new window.YooMoneyCheckoutWidget({
        confirmation_token: confirmationToken, //Токен, который перед проведением оплаты нужно получить от ЮKassa
        return_url: 'https://english-school-beta.vercel.app/payment/workbook', //Ссылка на страницу завершения оплаты
        //Настройка виджета
        customization: {
            //Настройка способа отображения
            modal: true
        },
        error_callback: function (error) {
            //Обработка ошибок инициализации
        }
    });
    //Отображение платежной формы в модальном окне
    checkout.render()
        //Метод возвращает Promise, исполнение которого говорит о полной загрузке платежной формы (можно не использовать).
        .then(() => {
            //Код, который нужно выполнить после отображения платежной формы.
        });
}