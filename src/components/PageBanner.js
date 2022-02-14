import React from 'react';
import background from '../img/page_banner/page_banner1.jpg';

const PageBanner = () => {
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
              <img
                src={background}
                className="d-block w-100"
                alt="background"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageBanner;
