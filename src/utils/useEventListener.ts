import { useEffect, useRef } from 'react';

// Subscribes to a window event; the latest handler is always called without re-subscribing.
const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: WindowEventMap[K]) => handlerRef.current(event);
    window.addEventListener(eventName, listener);

    return () => window.removeEventListener(eventName, listener);
  }, [eventName]);
};

export default useEventListener;
