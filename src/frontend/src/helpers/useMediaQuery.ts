import { useEffect, useState } from "react";

export const useMediaQuery = (value: string) => {
    const [isRequiredResolution, setIsRequiredResolution] = useState(window.innerWidth <= +value.replace('px', ''))

    const handleResize = () => {
        setIsRequiredResolution( window.innerWidth <= +value.replace('px', '') )
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    }
    // eslint-disable-next-line
    }, []);

    return isRequiredResolution;
  }