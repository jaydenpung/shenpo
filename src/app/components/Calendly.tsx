import { CalendarMonth } from '@mui/icons-material';
import { Button, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { PopupButton, PopupModal } from 'react-calendly';

const Calendly = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="root">
      <Button
        variant="contained"
        startIcon={<CalendarMonth />}
        onClick={() => setIsOpen(true)}
        sx={{
          textTransform: 'none',
          backgroundColor: '#b88d13',
          '&:hover': { backgroundColor: '#725d21' },
        }}
      >
        Request a 1-on-1 appointment now!
      </Button>

      <PopupModal
        url="https://calendly.com/shenpo/shenpo-1-on-1"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        //@ts-ignore
        rootElement={document.getElementById('root')}
      />
    </div>
  );
};

export default Calendly;
