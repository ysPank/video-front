import { useRef, useState, useEffect } from "react";

export const useSafeState = (initValue) => {
  const unmounted = useRef(false);
  const [data, setData] = useState(initValue);
  const setUnmountedData = (...args) => {
    if (!unmounted.current) {
      setData(...args);
    }
  };

  useEffect(() => {
    return () => unmounted.current = true;
  }, []);

  return [data, setUnmountedData];
};


export const useSafeMultipleStates = () => {
  const unmounted = useRef(false);
  const useSafeState = (initValue) => {
    const [data, setData] = useState(initValue);
    const setUnmountedData = (...args) => {
      if (!unmounted.current) {
        setData(...args);
      }
    };

    return [data, setUnmountedData];
  };

  useEffect(() => () => { unmounted.current = true; }, []);

  return useSafeState;
};
