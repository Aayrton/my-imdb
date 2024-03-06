import React from 'react';

interface ContentDetailsProps {
  title: string;
  description: string;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({
  title,
  description,
}) => {
  const maxLength = 1000;
  const truncatedDescription =
    description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  return (
    <p>
      <b>{title}</b> - <span>{truncatedDescription}</span>
    </p>
  );
};

export default ContentDetails;
