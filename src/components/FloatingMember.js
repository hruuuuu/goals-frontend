import { React, useState } from 'react';
import FloatingIcon from './FloatingIcon';
import FloatingMenu from './FloatingMenu';

function FloatingMember() {
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <>
      <div className="d-lg-none">
        <FloatingIcon setIsDisplay={setIsDisplay} page="member" />
        {isDisplay && (
          <FloatingMenu
            isDisplay={isDisplay}
            setIsDisplay={setIsDisplay}
            page="member"
          />
        )}
      </div>
    </>
  );
}

export default FloatingMember;
