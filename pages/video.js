import React, { useContext } from 'react';
import { ColorModeContext } from '../src/components/Menu/components/ColorMode';

const video = () => {
  const context = useContext(ColorModeContext);

  return (
    <div>
      video!
      <button onClick={() => context.toggleMode()}>Trocar tema</button>
    </div>
  );
};

export default video;
