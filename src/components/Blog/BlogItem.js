import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = () => {
  return (
    <>
      <ul className="blogList clearfix">
        <li class="col-xs-12 clearfix">
          <div class="blogList__item clearfix">
            <div class="blogList__item--Img">
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
            <div class="blogList__item--Txt">
              <div class="listHead">
                <div class="day">07</div>
                <div class="dateBox">
                  <div class="date">Dec.2021</div>
                  <div class="newIcon">健康良醫</div>
                </div>
              </div>
              <h4>
                <Link
                  to="/blog/article"
                  title="為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上"
                >
                  為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上
                </Link>
              </h4>
              <p>
                雖然也很在意體重數字，但是更想改善的是身體曲線。明明就不胖，可是想穿的那件洋裝就是不合身，好像肉全長錯了地方，體型大崩壞。
              </p>
            </div>
          </div>
        </li>
        <li class="col-xs-12 clearfix">
          <div class="blogList__item clearfix">
            <div class="blogList__item--Img">
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
            <div class="blogList__item--Txt">
              <div class="listHead">
                <div class="day">07</div>
                <div class="dateBox">
                  <div class="date">Dec.2021</div>
                  <div class="newIcon">健康良醫</div>
                </div>
              </div>
              <h4>
                <Link
                  to="/blog/article"
                  title="為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上"
                >
                  為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上
                </Link>
              </h4>
              <p>
                雖然也很在意體重數字，但是更想改善的是身體曲線。明明就不胖，可是想穿的那件洋裝就是不合身，好像肉全長錯了地方，體型大崩壞。
              </p>
            </div>
          </div>
        </li>
        <li class="col-xs-12 clearfix">
          <div class="blogList__item clearfix">
            <div class="blogList__item--Img">
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
            <div class="blogList__item--Txt">
              <div class="listHead">
                <div class="day">07</div>
                <div class="dateBox">
                  <div class="date">Dec.2021</div>
                  <div class="newIcon">健康良醫</div>
                </div>
              </div>
              <h4>
                <Link
                  to="/blog/article"
                  title="為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上"
                >
                  為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上
                </Link>
              </h4>
              <p>
                雖然也很在意體重數字，但是更想改善的是身體曲線。明明就不胖，可是想穿的那件洋裝就是不合身，好像肉全長錯了地方，體型大崩壞。
              </p>
            </div>
          </div>
        </li>
        <li class="col-xs-12 clearfix">
          <div class="blogList__item clearfix">
            <div class="blogList__item--Img">
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
            <div class="blogList__item--Txt">
              <div class="listHead">
                <div class="day">07</div>
                <div class="dateBox">
                  <div class="date">Dec.2021</div>
                  <div class="newIcon">健康良醫</div>
                </div>
              </div>
              <h4>
                <Link
                  to="/blog/article"
                  title="為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上"
                >
                  為什麼越運動越大隻？專家揭超NG塑身法：做錯這件事，讓你的肉都長在大腿上
                </Link>
              </h4>
              <p>
                雖然也很在意體重數字，但是更想改善的是身體曲線。明明就不胖，可是想穿的那件洋裝就是不合身，好像肉全長錯了地方，體型大崩壞。
              </p>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default BlogItem;
