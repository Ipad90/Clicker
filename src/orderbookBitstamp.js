import React, { useState, useEffect } from 'react';

const BitstampOrderBook = () => {
    const [orders, setOrders] = useState([]);
    const currencyPair = 'btcusd';
    const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

    useEffect(() => {
        const subscribe = {
            event: 'bts:subscribe',
            data: {
                channel: `order_book_${currencyPair}`
            }
        }
        const ws = new WebSocket('wss://ws.bitstamp.net');

        ws.onopen = () => {
            ws.send(JSON.stringify(subscribe));
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setOrders(response.data);
            console.log(response);
        }

        ws.onclose = () => {
            ws.close();
        }

        return () => {
            ws.close();
        }
    }, [currencyPair]);

    const { bids, asks } = orders;
    const orderRows = (array) => array && array.map((item, index) => (
        <tr key = {index}>
            <td>{item[1]}</td>
            <td>{item[0]}</td>
        </tr>
    ));
    const orderHead = (title) => (
        <thead>
            <tr>
                <th colSpan = '2'>{title}</th>
            </tr>

            <tr>
                <th>Amount ({currencyArray[0]})</th>
                <th>Price ({currencyArray[1]})</th>
            </tr>
        </thead>
    );

    return (
        <div>
            <select id = 'pairs'>
                <option>Pepega</option>
            </select>
            <div className = 'order-container'>
                <table>
                    {orderHead('Bids')}
                    <tbody>{orderRows(bids)}</tbody>
                </table>

                <table>
                    {orderHead('Asks')}
                    <tbody>{orderRows(asks)}</tbody>
                </table>
            </div>
        </div>
    )
}

export default BitstampOrderBook;
