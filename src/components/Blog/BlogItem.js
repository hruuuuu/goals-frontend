import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/config.js';
// import BlogPagination from './BlogPagination.js';

const BlogItem = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  // 總共有 lastPage 這麼多頁
  const [lastPage, setLastPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();

  // searchCurrent = 抓queryString的數字當作currentPage
  const searchCurrent = searchParams.get('page');
  // console.log(searchCurrent);
  // /blog => searchCurrent 會是 null
  // /blog?page=1 => searchCurrent 會是 1
  const [page, setPage] = useState(parseInt(searchCurrent, 10) || 1);
  // console.log('currentPage', searchCurrent, page);

  useEffect(() => {
    let getBlog = async () => {
      // http://localhost:3002/api/blog
      let response = await axios.get(`${API_URL}/blog?page=${page}`);
      const data = response.data;
      // console.log(data);
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
          style={{
            display: 'inline-flex',
            margin: '2px',
            backgroundColor: page === i ? '#6b9c66' : '',
            borderColor: page === i ? '#6b9c66' : '#dbdbdb',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '32px',
            height: '32px',
            borderRadius: '25px',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          key={i}
          onClick={(e) => {
            setPage(i);
            navigate(`/blog?page=${i}`);
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
      <ul style={{ textAlign: 'center', marginTop: '25px' }}>{getPages()}</ul>

      {/* <BlogPagination setPage={setPage} /> */}
    </>
  );
};

export default BlogItem;
