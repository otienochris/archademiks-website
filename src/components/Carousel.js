import { Divider, Grid, IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import '../styles/Carousel.css';

export const CarouselItem = ({ children, width }) => {
  return (
    <div className='carousel-item' style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className='carousel'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className='inner'
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
      <Divider style={{ borderColor: '#ff8c00' }} />
      <div className='indicators'>
        <IconButton
          onClick={() => updateIndex(activeIndex - 1)}
          style={{ color: '#ff8c00' }}
        >
          <ArrowBackIos />
        </IconButton>
        {/* <button onClick={() => updateIndex(activeIndex - 1)}>Prev</button> */}

        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? 'active' : ''}`}
              onClick={() => updateIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50px',
                margin: 'auto 1px',
              }}
            ></button>
          );
        })}
        <IconButton
          onClick={() => updateIndex(activeIndex + 1)}
          style={{ color: '#ff8c00' }}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </div>
  );
};

export default Carousel;
