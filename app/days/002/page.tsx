"use client"

import type { Sketch, SketchProps } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useRef } from 'react';

type MySketchProps = SketchProps

const polygon = (p5: any, radius: number, sides: number = 3, angle: number = 0) => {
  p5.beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle + p5.TWO_PI * (i / sides);
    let sx = p5.cos(a) * radius;
    let sy = p5.sin(a) * radius;
    // 连接多边形的顶点
    p5.vertex(sx, sy);
  }
  p5.endShape(p5.CLOSE);
};

const sketch: Sketch<MySketchProps> = p5 => {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.clear();
    const dim = Math.min(p5.width, p5.height);

    p5.noFill();
    p5.stroke(100);

    // 将时间单位转换成秒
    const time = p5.millis() / 1000;
    // 通过正弦函数生成一个 0 到 1 之间的值, 开始值为 0
    const pingPong = p5.sin(time * 0.75 - p5.PI / 2) * 0.5 + 0.5;
    // 通过 lerp 函数将值从 2 到 100 之间进行插值
    const points = p5.lerp(2, 100, Math.pow(pingPong, 2.5));
    const radius = dim / 3;
    // 通过正弦函数生成一个 0 到 2π 之间的值
    const angle = pingPong * p5.PI * 2;

    polygon(p5, radius, points, angle);
  };
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
