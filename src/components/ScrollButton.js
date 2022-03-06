import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Button } from '@mui/material';

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 180) {
      setVisible(true);
    } else if (scrolled <= 180) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, [setVisible]);

  return (
    <>
      <Button>
        <FaArrowCircleUp
          style={{
            opacity: visible ? '1' : '0',
            display: visible ? 'inline' : 'none',
          }}
          onClick={scrollToTop}
          className="transition-btn"
        />
      </Button>
    </>
  );
}

export default ScrollButton;
