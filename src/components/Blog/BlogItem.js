import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/config.js';

const BlogItem = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let getBlog = async () => {
      // http://localhost:3002/api/blog
      let response = await axios.get(`${API_URL}/blog`);
      setData(response.data);
    };
    getBlog();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <ul className="blogList clearfix">
        {data.map((blog) => {
          return (
            <li key={blog.id} className="col-xs-12 clearfix">
              <div className="blogList__item clearfix">
                <div className="blogList__item--Img">
                  <Link to={`/blog/article/${blog.id}`} title={blog.title}>
                    <img
                      className="img-responsive"
                      src={blog.image}
                      alt="BlogItem"
                    />
                  </Link>
                </div>
                <div className="blogList__item--Txt">
                  <div className="listHead">
                    <div className="day">{blog.created_at}</div>
                    <div className="dateBox">
                      <div className="date">Dec.2021</div>
                      <div className="newIcon">{blog.category}</div>
                    </div>
                  </div>
                  <h4>
                    <Link
                      className="ellipsis"
                      to="/blog/article"
                      title={blog.title}
                    >
                      {blog.title}
                    </Link>
                  </h4>
                  <p className="ellipsis--3">{blog.context}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {/* <li className="col-xs-12 clearfix">
            <div className="blogList__item clearfix">
              <div className="blogList__item--Img">
                <Link
                  to="/blog/article"
                  title="為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上"
                >
                  <img
                    className="img-responsive"
                    src={require('../../img/blog/blog_item.jpg')}
                    alt="BlogItem"
                  />
                </Link>
              </div>
              <div className="blogList__item--Txt">
                <div className="listHead">
                  <div className="day">07</div>
                  <div className="dateBox">
                    <div className="date">Dec.2021</div>
                    <div className="newIcon">健康良醫</div>
                  </div>
                </div>
                <h4>
                  <Link
                    className="ellipsis"
                    to="/blog/article"
                    title="為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上"
                  >
                    為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上
                  </Link>
                </h4>
                <p className="ellipsis--3">
                  雖然也很在意體重數字，但是更想改善的是身體曲線。明明就不胖，可是想穿的那件洋裝就是不合身，好像肉全長錯了地方，體型大崩壞。
                </p>
              </div>
            </div>
          </li>  */}
    </>
  );
};

export default BlogItem;
