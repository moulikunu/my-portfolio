import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

export type CursorType = 'default' | 'name' | 'photo' | 'project' | 'skill' | 'nav' | 'button' | 'link';
export type CursorVariant = CursorType;

interface CursorContextType {
  cursorType: CursorType;
  cursorVariant: CursorType;
  setCursorType: (type: CursorType, customLabel?: string) => void;
  setCursorVariant: (variant: CursorType, customLabel?: string) => void;
  customLabel?: string;
  mousePos: { x: number; y: number };
  isInside: boolean;
  isTouch: boolean;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  cursorVariant: 'default',
  setCursorType: () => {},
  setCursorVariant: () => {},
  customLabel: undefined,
  mousePos: { x: -100, y: -100 },
  isInside: false,
  isTouch: false,
});

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorType, setCursorTypeState] = useState<CursorType>('default');
  const [customLabel, setCustomLabel] = useState<string | undefined>(undefined);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isInside) setIsInside(true);
    };

    const handleMouseLeave = () => {
      setIsInside(false);
    };

    const handleMouseEnter = () => {
      setIsInside(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isInside]);

  const setCursorType = (type: CursorType, label?: string) => {
    setCursorTypeState(type);
    setCustomLabel(label);
  };

  const value = useMemo(
    () => ({
      cursorType,
      cursorVariant: cursorType,
      setCursorType,
      setCursorVariant: setCursorType,
      customLabel,
      mousePos,
      isInside,
      isTouch,
    }),
    [cursorType, customLabel, mousePos, isInside, isTouch]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
