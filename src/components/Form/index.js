import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import valid from 'card-validator';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import './index.scss';

export default function Form(props) {
  const [cardDateValidData, setCardDateValidData] = useState(null);
  const [cardNameValidData, setCardNameValidData] = useState(null);
  const [cardCvvValidData, setCardCvvValidData] = useState(null);
  const [cardInstallmentsValidData, setCardInstallmentsValidData] = useState(null);

  const {
    paymentData,
    setPaymentData,
    setCardBackFace,
    setCardNumberValidData,
    cardNumberValidData,
  } = props;

  /**
   * Notify wrong fom values
   *
   */
  function notify() {
    toast.error('Preencha os campos corretamente!');
  }

  /**
   * Handle form submit
   *
   * @param {Object} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    const formIsValid = (cardNumberValidData && cardNumberValidData.isValid)
      * (cardDateValidData && cardDateValidData.isValid)
      * (cardNameValidData && cardNameValidData.split(' ').length > 1)
      * (cardCvvValidData && cardCvvValidData.isValid)
      * (cardInstallmentsValidData && cardInstallmentsValidData !== null);

    if (!formIsValid) {
      notify();
    } else {
      fetch('/pagar', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    }
  }

  /**
   * Handle input submit
   *
   * @param {Object} event
   */
  function changeInput(event) {
    switch (event.target.name) {
      case 'CARD_NUMBER':
        setPaymentData({ ...paymentData, cardNumber: event.target.value });
        break;
      case 'CARD_NAME':
        setPaymentData({ ...paymentData, cardName: event.target.value });
        break;
      case 'CARD_DATE':
        setPaymentData({ ...paymentData, cardDate: event.target.value });
        break;
      case 'CARD_CVV':
        setPaymentData({ ...paymentData, cardCvv: event.target.value });
        break;
      case 'CARD_INSTALLMENTS':
        setPaymentData({ ...paymentData, cardInstallments: event.target.value });
        break;

      default:
        break;
    }
  }

  return (
    <form className="payment" onSubmit={handleSubmit}>
      <div
        className={
          cardNumberValidData && cardNumberValidData.isValid ? 'form-control' : 'form-control error'
        }
      >
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=""
          type="text"
          placeholder="Número do cartão"
          name="CARD_NUMBER"
          value={paymentData.cardNumber || ''}
          required
          onChange={changeInput}
          onBlur={event => setCardNumberValidData(valid.number(event.target.value))}
        />
        {cardNumberValidData && !cardNumberValidData.isValid && (
          <span className="error-info">Número de cartão inválido</span>
        )}
      </div>

      <div
        className={
          cardNameValidData && cardNameValidData.split(' ').length === 1
            ? 'form-control error'
            : 'form-control'
        }
      >
        <InputMask
          type="text"
          placeholder="Nome (igual ao cartão)"
          value={paymentData.cardName || ''}
          name="CARD_NAME"
          required
          onChange={changeInput}
          onBlur={event => setCardNameValidData(event.target.value)}
        />
        {cardNameValidData && cardNameValidData.split(' ').length === 1 && (
          <span className="error-info">Insira seu nome completo</span>
        )}
      </div>

      <div className="input-group">
        <div
          className={
            cardDateValidData && cardDateValidData.isValid ? 'form-control' : 'form-control error'
          }
        >
          <InputMask
            mask="99/99"
            maskChar=""
            type="text"
            value={paymentData.cardDate || ''}
            placeholder="Validade"
            name="CARD_DATE"
            required
            onChange={changeInput}
            onBlur={event => setCardDateValidData(valid.expirationDate(event.target.value))}
          />
          {cardDateValidData && !cardDateValidData.isValid && (
            <span className="error-info">Data inválida</span>
          )}
        </div>

        <div
          className={
            cardCvvValidData && cardCvvValidData.isValid ? 'form-control' : 'form-control error'
          }
        >
          <InputMask
            mask="999"
            maskChar=""
            type="text"
            placeholder="CVV"
            name="CARD_CVV"
            value={paymentData.cardCvv || ''}
            required
            onChange={changeInput}
            onFocus={() => setCardBackFace(true)}
            onBlur={(event) => {
              setCardBackFace(false);
              setCardCvvValidData(valid.cvv(event.target.value));
            }}
          />
          {cardCvvValidData && !cardCvvValidData.isValid && (
            <span className="error-info">Código inválido</span>
          )}
        </div>
      </div>

      <div
        className={
          cardCvvValidData && cardCvvValidData.isValid ? 'form-control' : 'form-control error'
        }
      >
        <select
          placeholder="Número de parcelas"
          name="CARD_INSTALLMENTS"
          required
          onChange={changeInput}
          value={paymentData.cardInstallments || ''}
          onBlur={event => setCardInstallmentsValidData(event.target.value)}
        >
          <option value="" disabled hidden>
            Número de parcelas
          </option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="3">3x</option>
          <option value="4">4x</option>
          <option value="5">5x</option>
        </select>

        {!cardInstallmentsValidData && cardInstallmentsValidData !== null && (
          <span className="error-info">Insira o número de parcelas</span>
        )}
      </div>
      <button type="submit">Continuar</button>
    </form>
  );
}

Form.propTypes = {
  paymentData: PropTypes.shape({
    cardInstallments: PropTypes.string,
    cardCvv: PropTypes.string,
    cardDate: PropTypes.string,
    cardName: PropTypes.string,
    cardNumber: PropTypes.string,
  }).isRequired,
  cardNumberValidData: PropTypes.shape({
    isValid: PropTypes.bool,
  }),
  setPaymentData: PropTypes.func.isRequired,
  setCardBackFace: PropTypes.func.isRequired,
  setCardNumberValidData: PropTypes.func.isRequired,
};
