import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { Box, BoxProps } from '@chakra-ui/react';

interface ISticky {
    children: React.ReactElement,
    style?: (isSticky: boolean) => BoxProps
}


function StickyContainer({ children, style=()=>({}) }: ISticky) {

    const [isSticky, setSticky] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        if (ref.current) {
        setSticky(ref.current.getBoundingClientRect().top <= 0);
      }
    };
  
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    },[]);

    return (
        <Box 
            ref={ref}
            position={isSticky ? 'sticky' : 'relative'}
            top={0}
            zIndex={100}
            {...style(isSticky)}
        >
            {
                React.isValidElement(children)
                ?   React.cloneElement(children)
                :   null
            }
        </Box>
    )
}

export default StickyContainer

