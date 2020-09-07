import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor : pointer;
    }
`;

const Formulario = () => {

    // state del listado de Criptomonedas

    const [listacripto, guardarCriptomonedas] = useState([]);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'}, 
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    //utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    // utilizar useCriptoMoneda
    const [criptomoneda, SelectCripto] = useCriptoMoneda('Elihge tu Criptomoneda', '', listacripto);

    // Ejecutar llamado a API

    useEffect(() => {
        const consultarAPI = async () => {
            const url= 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    return ( 
        <form>

            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;