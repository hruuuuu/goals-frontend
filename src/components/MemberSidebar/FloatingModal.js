import { React, useState } from 'react';
import FloatingSidebar from './FloatingSidebar';

function FloatingMenu(props) {
  const [animation, setAnimation] = useState(false);
  const { isDisplay, setIsDisplay } = props;
  return (
    <>
      <div
        className={`c-floating-menu ${
          isDisplay &&
          'animation animation__floating-menu animation__floating-menu--in'
        }
          ${
            animation &&
            'animation animation__floating-menu animation__floating-menu--out'
          }`}
      >
        <div className="c-floating-menu__content">
          <div className="container">
            <h2>
              <FloatingSidebar />
            </h2>
          </div>
        </div>
        <div
          className="c-floating-menu__bg"
          onClick={() => {
            setAnimation(true);
            setTimeout(() => {
              setIsDisplay(false);
            }, 1000);
          }}
        ></div>
      </div>
    </>
  );
}

export default FloatingMenu;
