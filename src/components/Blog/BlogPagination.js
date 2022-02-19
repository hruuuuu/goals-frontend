import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BlogPagination = (props) => {
  const { setPage } = props;
  const navigate = useNavigate();
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button to="" className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button
              type="bottom"
              className="page-link"
              onClick={(e) => {
                setPage(1);
                navigate(`/blog?page=1`);
              }}
            >
              1
            </button>
          </li>
          <li className="page-item">
            <button
              type="bottom"
              className="page-link"
              onClick={(e) => {
                setPage(2);
                navigate(`/blog?page=2`);
              }}
            >
              2
            </button>
          </li>
          <li className="page-item">
            <Link to="" className="page-link">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link to="" className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BlogPagination;
