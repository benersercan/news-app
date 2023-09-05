import PropTypes from 'prop-types';
import './Card.scss';
import ArrowIcon from '../../assets/arrow.svg'

const Card = ({ source }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{source?.name}</h2>
        <p className="card-description">{source?.description}</p>
      </div>
      <img src={ArrowIcon} alt='arrow-icon' />
    </div>
  );
}

Card.propTypes = {
  source: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

export default Card;
