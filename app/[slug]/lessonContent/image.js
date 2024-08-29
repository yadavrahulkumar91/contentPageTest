import React from 'react'

export default function image ({ value }) {
  return (
    // <div>
    //     {(value && Array.isArray(value) && value.length > 0) ? value.map((image, index) => (
    //         <figure key={index} style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}>
    //             <img src={image.data.attributes.url} width={image.data.attributes.width ? image.data.attributes.width : 400} alt={`Image ${index + 1}`} />
    //             <figcaption>Fig. <span key={index} dangerouslySetInnerHTML={{ __html: image.data.attributes.caption }} /></figcaption>
    //         </figure>
    //     )) : null}
    // </div>
    <>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((image, index) => (
            <figure
              key={index}
              // style={{ float: `${image.data.attributes.float ? image.data.attributes.float : null}`, marginRight: '10px' }}
              className='border-2 inline m-2 float-end'
            >
              <img
                src={image.url}
                width={image.width ? image.width : 500}
                // height={image.height ? image.height : 600}
                // width={400}
                alt={`Image ${index + 1}`}
              />
              {image.caption ? (
                <figcaption className='text-center block m-auto'>
                <span>  Fig. </span>
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: image.caption }}
                  />
                </figcaption>
              ) : null}
              {image.credit ? (
                <div className='text-center text-sm m-auto italic'>
                 <span>Credit. </span> 
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: image.credit }}
                  />
                </div>
              ) : null}
            </figure>
          ))
        : null}
    </>
  )
}
