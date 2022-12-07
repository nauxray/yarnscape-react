import React, { useState } from 'react'

export default function SliderImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {imgError
        ?
        <div className="details-image">
          This image could not be shown
        </div>
        :
        <img
          className="details-image"
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
        />}
      <style jsx="true">
        {`
          .details-image {
            width: 20rem;
            height: 20rem;
            border: 2px solid var(--beige-yellow);
            border-radius: 6px;
          }
          div.details-image {
            display: flex;
            font-weight: 400;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
