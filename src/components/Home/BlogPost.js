import React from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

function BlogPost(props) {
  const { blog } = props;
  const { id, image, title, created_at, context, category } = blog;
  return (
    <>
      <div className="blogList__item clearfix">
        <div className="blogList__item--Img">
          <Link to={`/blog/${id}`} title={title}>
            <img className="img-responsive" src={image} alt="BlogItem" />
          </Link>
        </div>
        <div className="blogList__item--Txt">
          <div className="listHead">
            <div className="dateBox">
              <div className="date">{created_at}</div>
              <div className="newIcon">{category}</div>
            </div>
          </div>
          <h4>
            <Link className="ellipsis" to="/blog/article" title={title}>
              {title}
            </Link>
          </h4>
          <p className="ellipsis--3">{context}</p>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
