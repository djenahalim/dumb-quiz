import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import correct from '../assets/correct.json';
import wrong from '../assets/wrong.json';
const LottieComponent = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    //   animationData
    });
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100vh' }} />;
};
