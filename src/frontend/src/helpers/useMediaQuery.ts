import { useEffect, useState } from "react";

export const useMediaQuery = (value: string) => {
    const [isRequiredResolution, setIsRequiredResolution] = useState(window.innerWidth <= +value.replace('px', ''))

    const handleResize = () => {
        if(window.innerWidth <= +value.replace('px', '')) setIsRequiredResolution(true)
        else setIsRequiredResolution(false)
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