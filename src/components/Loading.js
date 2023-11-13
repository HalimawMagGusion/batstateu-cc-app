import React from 'react';

export const Loading = () => {
  return (
  

    <div style={{position: 'relative'}}>
        <div className="spinner-border text-danger" role="status" style={{
            position: "fixed", 
            top: "47%", 
            left: "47%", 
            height: '100px',
            width: '100px',
            transform: 'translate(-50%, =50%)'
            }}>
            <span className="visually-hidden">Loading...</span>
            
    </div>

</div>

  );
};

export default Loading;