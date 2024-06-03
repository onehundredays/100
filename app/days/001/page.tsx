"use client"

import { useMouse } from 'ahooks';
import type { Sketch, SketchProps } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useRef } from 'react';

type MySketchProps = SketchProps & {
  mouse: {
    elementX: number;
    elementY: number;
  };
};

function getNoOfCols(w: number, length: number, m: number) {
  var totalLength = 0,
      noOfCols = 0;
  
  m = m || 0;
  
  while(totalLength < w) {
    totalLength += m+length;
    noOfCols++;
  }
  
  return noOfCols;
}

function getNoOfRows(h: number, sw: number, m: number) {
  return getNoOfCols(h, sw, m);
}

const canvasWidth = 300,
  canvasHeight = canvasWidth,
  length = 8,
  margin = 10,
  strokeWidth = 2,
  columns = getNoOfCols(canvasWidth, length, margin),
  rows = getNoOfRows(canvasHeight, strokeWidth, margin);
   
const sketch: Sketch<MySketchProps> = p5 => {
  let mouse: {
    elementX: number;
    elementY: number;
  } = {
    elementX: 0,
    elementY: 0
  }

  p5.setup = () => p5.createCanvas(300, 300);

  p5.updateWithProps = (props: MySketchProps) => {
    if (props.mouse) {
      mouse = props.mouse;
    }
  };

  p5.draw = () => {
    p5.clear();
    for(let i = 0; i < rows - 1; i++) {
      for(let j = 0; j < columns - 1; j++) {
        const currentOffset = {
          x: j * (length + margin) + margin,
          y: (i + 1) * (margin + strokeWidth)
        }

        // 计算中心点到鼠标的距离
        const delta = {
          x: currentOffset.x + length / 2 - mouse.elementX,
          y: currentOffset.y + strokeWidth / 2 - mouse.elementY
        };

        // 计算 line 的 中心点和鼠标连线与 x 轴的夹角
        // 范围是 [-PI, PI]，即 [-180, 180]
        const theta = Math.atan2(delta.y, delta.x), deltaThreshold = 40;
        
        p5.strokeWeight(strokeWidth);
        p5.stroke(100);
        
        if(Math.abs(delta.x) < deltaThreshold && Math.abs(delta.y) < deltaThreshold) {
          // 计算鼠标到中心点的距离
          var amt = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
          // 映射到 [0, deltaThreshold] -> [-50, 255]
          // 设置透明度
          var amtMapped = p5.map(amt, 0, deltaThreshold, -50, 200);
          p5.stroke(100, amtMapped)
        }
        
        p5.push();
        // 将坐标系平移到当前单元格的位置
        p5.translate(currentOffset.x, currentOffset.y);
        // 将坐标系旋转到正确的方向
        p5.rotate(theta);
        // 绘制线段
        p5.line(0, 0, length, 0);
        p5.pop();
      }
    }
  };
};

const Page = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse(ref);

  return (
    <div ref={ref}>
      <NextReactP5Wrapper sketch={sketch} mouse={mouse} />
    </div>
  );
};

export default Page;
