import React from 'react'

export default function image ({value}){
return (
  // <div>
  //     {(value && Array.isArray(value) && value.length > 0) ? value.map((image, index) => (
  //         <figure key={index} style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}>
  //             <img src={image.data.attributes.url} width={image.data.attributes.width ? image.data.attributes.width : 400} alt={`Image ${index + 1}`} />
  //             <figcaption>Fig. <span key={index} dangerouslySetInnerHTML={{ __html: image.data.attributes.caption }} /></figcaption>
  //         </figure>
  //     )) : null}
  // </div>
  <div>
    {value && Array.isArray(value) && value.length > 0
      ? value.map((image, index) => (
          <figure
            key={index}
            // style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}
          >
            <img
              src={image.url}
              width={image.width ? image.width : 200}
              // width={400}
              alt={`Image ${index + 1}`}
            />
            <figcaption>
              Fig.{' '}
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: image.caption }}
              />
            </figcaption>
          </figure>
        ))
      : null}
  </div>
)


}