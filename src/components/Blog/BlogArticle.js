import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageBanner from '../../components/PageBanner.js';
import Header from '../../components/Header';
import axios from 'axios';
import { API_URL } from '../../utils/config.js';
import img from '../../img/common/illustration/food.svg';
import picBanner from '../../img/page_banner/calculator.webp';

function BlogArticle() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  /* 1.取得網址params 2.打api拿特定blog id的資料 */
  //params blogId -> 打api用
  const { blogId } = useParams();

  /*回上層*/
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (blogId) {
          let response = await axios.get(`${API_URL}/blog/${blogId}`, {
            withCredentials: true,
          });
          const blogdata = response.data[0];
          setData(blogdata);
          console.log(blogdata);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <PageBanner img={picBanner} />
      <div className="blog__article">
        <Header />
        <div className="u-margin u-margin--page-bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <div className="blog__article--img_block">
                  <div className="l-header__title">
                    <img src={img} alt="food" />
                    <h3 className="l-header__text">{data.title}</h3>
                  </div>
                  <img className="img-responsive" src={data.image} alt="blog" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-12">
                <div className="blog__article--text">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{data.context}</p>
                  <button
                    className="e-btn--primary e-btn--medium"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    回上頁
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogArticle;
