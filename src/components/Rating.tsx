import React from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';

interface RatingProps {
  voteCount?: number;
  voteAverage: number;
  displayCount?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  voteAverage,
  voteCount,
  displayCount,
}) => {
  const voteAverageText = voteAverage.toFixed(1);
  return (
    <div>
      <StarRateIcon className="align-bottom" color="warning" />{' '}
      {voteCount && (
        <span>
          <b>{voteAverageText}</b>/10
        </span>
      )}
      {displayCount && <div className="text-sm">({voteCount})</div>}
    </div>
  );
};

export default Rating;
