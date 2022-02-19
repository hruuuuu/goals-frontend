import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/config.js';
import BlogPagination from './BlogPagination.js';

const BlogItem = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  // 總共有 lastPage 這麼多頁
  const [lastPage, setLastPage] = useState(1);

  let navigate = useNavigate();

  const { currentPage } = useParams();
  // /stock/2330 => currnetPage 會是 undefined
  // /stock/2330/2 => currentPage 會是 2
  const [page, setPage] = useState(parseInt(currentPage, 4) || 1);
  console.log('currentPage', currentPage, page);

  useEffect(() => {
    let getBlog = async () => {
      // http://localhost:3002/api/blog
      let response = await axios.get(`${API_URL}/blog?page=${page}`);
      const data = response.data;
      console.log(data);
      setData(data.dataCount);
      setLastPage(data.pagination.lastPage);
    };
    getBlog();
  }, [page]);

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={(e) => {
            setPage(i);
            navigate(`/blog/${page}`);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <>
      {error && <div>{error}</div>}
      <ul>{getPages()}</ul>
      <ul className="blogList clearfix">
        {data.map((blog) => {
          return (
            <li key={blog.id} className="col-xs-12 clearfix">
              <div className="blogList__item clearfix">
                <div className="blogList__item--Img">
                  <Link to={`/blog/${blog.id}`} title={blog.title}>
                    <img
                      className="img-responsive"
                      src={blog.image}
                      alt="BlogItem"
                    />
                  </Link>
                </div>
                <div className="blogList__item--Txt">
                  <div className="listHead">
                    <div className="dateBox">
                      <div className="date">{blog.created_at}</div>
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
      <BlogPagination setPage={setPage} />
    </>
  );
};

export default BlogItem;
