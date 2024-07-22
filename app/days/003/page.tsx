"use client"

import type { Sketch, SketchProps } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useRef } from 'react';

type MySketchProps = SketchProps

const sketch: Sketch<MySketchProps> = p5 => {
  p5.setup = () => p5.createCanvas(600, 600);
  
  const size = 600;
  const step = 10;
  const centerY = size / 2;
  // 变化范围
  const variance = 150;

  const lines = Array.from({ length: (size - 2 * step) / step }, (_, i) => {
    const y = (i + 1) * step;
    return Array.from({ length: (size - 2 * step) / step }, (_, j) => {
      const x = (j + 1) * step;
      const distanceToCenter = Math.abs(x - centerY);
      // 越靠近中心，变化范围越大
      const maxVariance = Math.max(centerY - variance - distanceToCenter, 0);
      // 往上偏移
      const random = Math.random() * maxVariance / 2 * -1;
      return { x, y: y + random };
    });
  });

  p5.draw = () => {
    p5.clear();
    
    p5.stroke(100);
    p5.noFill();

    for(var i = 5; i < lines.length; i++) {
      p5.beginShape();
      p5.curveVertex(lines[i][0].x, lines[i][0].y);
      
      for (let j = 0; j < lines[i].length - 1; j++) {
        const x = (lines[i][j].x + lines[i][j + 1].x) / 2;
        const y = (lines[i][j].y + lines[i][j + 1].y) / 2;
        p5.curveVertex(x, y);
      }
      
      p5.curveVertex(lines[i][lines[i].length-1].x, lines[i][lines[i].length-1].y);
      p5.endShape();
    }
  }
};

const Page = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
};

export default Page;
