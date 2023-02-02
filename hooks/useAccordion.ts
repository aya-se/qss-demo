import { useEffect, useRef, useState } from "react";

const openingKeyframes = (elementHeight: number): Keyframe[] => {
  return [
    {
      height: "0px",
      offset: 0,
    },
    {
      height: `${elementHeight}px`,
      offset: 0.999,
    },
    {
      // 最終的にautoに変更することで、ウィンドウ幅が変更されても高さを可変にする
      height: "auto",
      offset: 1,
    },
  ];
};

const closingKeyframes = (elementHeight: number): Keyframe[] => {
  return [
    {
      height: "auto",
      offset: 0,
    },
    {
      height: `${elementHeight}px`,
      offset: 0.001,
    },
    {
      height: "0px",
      offset: 1,
    },
  ];
};

const option: KeyframeAnimationOptions = {
  duration: 200,
  easing: "ease-out",
  fill: "forwards",
};

export const useAccordion = () => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // refを設定したアコーディオンと直下の子要素の高さを取得する
    const element = accordionRef.current;
    if (element === null) return;
    if (element.firstElementChild === null) return;
    const elementHeight = element.clientHeight;
    const elementChildHeight = element.firstElementChild.clientHeight;

    // アコーディオンの子要素の高さをもとに、アコーディオンの開閉アニメーションを実行する
    if (isOpen) {
      element.animate(openingKeyframes(elementChildHeight), option);
    } else {
      // 初回レンダリング時にアニメーションが実行されないように、アコーディオンが開かれている場合のみアニメーションを実行する
      if (elementHeight > 0) {
        element.animate(closingKeyframes(elementChildHeight), option);
      }
    }
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    accordionRef,
  };
};
