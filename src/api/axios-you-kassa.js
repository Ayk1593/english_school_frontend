import axios from "axios";

export const createPayment = (shopId, secretKey, paymentData) => {
    const config = {
        method: 'post',
        url: 'https://api.yookassa.ru/v3/payments',
        headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': paymentData.idempotenceKey
        },
        auth: {
            username: shopId,
            password: secretKey
        },
        data: JSON.stringify(paymentData)
    };

    return axios(config)
        .then(response => {
            return response.data;
        });
}