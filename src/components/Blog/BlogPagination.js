import React from 'react';
import { Link } from 'react-router-dom';

const BlogPagination = () => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <Link to="" class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          <li class="page-item">
            <Link to="" class="page-link">
              1
            </Link>
          </li>
          <li class="page-item">
            <Link to="" class="page-link">
              2
            </Link>
          </li>
          <li class="page-item">
            <Link to="" class="page-link">
              3
            </Link>
          </li>
          <li class="page-item">
            <Link to="" class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BlogPagination;
