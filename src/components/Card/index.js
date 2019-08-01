import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function Card(props) {
  const { cardBackFace, cardNumberValidData, paymentData } = props;

  return (
    <div className={`card ${cardBackFace ? 'is-flipped' : ''}`}>
      <div className="content_card">
        <div
          className={`card_face card_front ${cardNumberValidData
            && cardNumberValidData.card
            && `${cardNumberValidData.card.type} card_filled`}`}
        >
          <span className="number">
            {paymentData.cardNumber ? paymentData.cardNumber : '**** **** **** ****'}
          </span>
          <div className="group">
            <span className="name">
              {paymentData.cardName ? paymentData.cardName : 'Nome do Titular'}
            </span>
            <span className="date">{paymentData.cardDate ? paymentData.cardDate : '00/00'}</span>
          </div>
        </div>
        <div className="card_face card_back">
          <span className="cvv">{paymentData.cardCvv ? paymentData.cardCvv : '***'}</span>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  paymentData: PropTypes.shape({
    cardCvv: PropTypes.string,
    cardDate: PropTypes.string,
    cardName: PropTypes.string,
    cardNumber: PropTypes.string,
  }).isRequired,
  cardNumberValidData: PropTypes.shape({
    card: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
  cardBackFace: PropTypes.bool.isRequired,
};
