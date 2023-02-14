import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '2',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};
