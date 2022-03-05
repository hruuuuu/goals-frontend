import React from 'react';

const PageBanner = (props) => {
  const { img } = props;
  return (
    <>
      <section className="c-pageBanner">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img} className="d-block w-100" alt="background" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageBanner;
