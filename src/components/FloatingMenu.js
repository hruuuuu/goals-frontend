import { React, useState } from 'react';
import MemberSidebar from './MemberSidebar';
import CartMobile from './Cart/CartMobile';

function FloatingMenu(props) {
  const [animation, setAnimation] = useState(false);
  const { isDisplay, setIsDisplay, page } = props;
  const isMember = page === 'member';

  return (
    <>
      <div
        className={`c-floating-menu c-floating-menu--${page} ${
          isDisplay &&
          'animation animation__floating-menu animation__floating-menu--in'
        } ${
          animation &&
          'animation animation__floating-menu animation__floating-menu--out'
        }`}
      >
        <div className={`c-floating-menu__content`}>
          {isMember ? (
            <>
              <MemberSidebar />
            </>
          ) : (
            <CartMobile />
          )}
        </div>
        <div
          className="c-floating-menu__bg"
          onClick={() => {
            setAnimation(true);
            setTimeout(() => {
              setIsDisplay(false);
            }, 500);
          }}
        ></div>
      </div>
    </>
  );
}

export default FloatingMenu;
