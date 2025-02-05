import BigNumber from "bignumber.js";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { LineGraphTooltipWrapper, LineGraphWrapper } from "./LineGraph.styles";
import FloatingTooltip from "../tooltip/FloatingTooltip";
import { Global, css } from "@emotion/react";

function calculateSmoothing(pointA: Point, pointB: Point) {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
}

function controlPoint(
  current: Point,
  previous?: Point,
  next?: Point,
  reverse?: boolean,
) {
  const smoothing = 0.15;
  const prePoint = previous || current;
  const nextPoint = next || current;
  const calculated = calculateSmoothing(prePoint, nextPoint);
  const angle = calculated.angle + (reverse ? Math.PI : 0);
  const length = calculated.length * smoothing;
  const x = current.x + Math.cos(angle) * length;
  const y = current.y + Math.sin(angle) * length;

  return [x, y];
}

function bezierCommand(point: Point, index: number, points: Point[]) {
  const [cpsX, cpsY] = controlPoint(
    points[index - 1],
    points[index - 2],
    point,
  );
  const [cpeX, cpeY] = controlPoint(
    point,
    points[index - 1],
    points[index + 1],
    true,
  );
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point.x},${point.y}`;
}

export interface LineGraphData {
  value: string;
  time: string;
}

export interface LineGraphProps {
  className?: string;
  color: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  strokeWidth?: number;
  datas: LineGraphData[];
  cursor?: boolean;
  smooth?: boolean;
  width?: number;
  height?: number;
  point?: boolean;
  firstPointColor?: string;
  typeOfChart?: string;
  customData?: { height: number, locationTooltip: number};
}

interface Point {
  x: number;
  y: number;
}

function parseTime(time: string) {
  const dateObject = new Date(time);
  const yaer = `${dateObject.getFullYear()}`;
  const month = `${dateObject.getMonth() + 1}`.padStart(2, "0");
  const date = `${dateObject.getDate()}`.padStart(2, "0");
  const hours = `${dateObject.getHours()}`.padStart(2, "0");
  const minutes = `${dateObject.getMinutes()}`.padStart(2, "0");
  const seconds = `${dateObject.getSeconds()}`.padStart(2, "0");
  return {
    date: `${yaer}-${month}-${date}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}

function parseTimeTVL(time: string) {
  const dateObject = new Date(time);
  const month = dateObject.toLocaleString("en-US", { month: "short" });
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const isPM = hours >= 12;
  const formattedHours = hours % 12 || 12;
  return {
    date: `${month} ${day}, ${year}`,
    time: `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${isPM ? "PM" : "AM"}`,
  };
}
const VIEWPORT_DEFAULT_WIDTH = 400;
const VIEWPORT_DEFAULT_HEIGHT = 200;

const ChartGlobalTooltip = () => {
  return (
    <Global
      styles={() => css`
        .chart-tooltip {
          > div {
            padding: 10px;
            box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.15);
          }
        }
      `}
    />
  );
};

const LineGraph: React.FC<LineGraphProps> = ({
  className = "",
  cursor,
  color,
  datas,
  strokeWidth = 2,
  gradientStartColor = `${color}66`,
  gradientEndColor = "transparent",
  smooth,
  width = VIEWPORT_DEFAULT_WIDTH,
  height = VIEWPORT_DEFAULT_HEIGHT,
  point,
  firstPointColor,
  typeOfChart,
  customData = { height: 0, locationTooltip: 0},
}) => {
  const COMPONENT_ID = (Math.random() * 100000).toString();
  const [activated, setActivated] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<Point>();
  const [chartPoint, setChartPoint] = useState<Point>();
  const [currentPointIndex, setCurrentPointIndex] = useState<number>(-1);
  const [points, setPoints] = useState<Point[]>([]);
  const { height: customHeight = 0, locationTooltip } = customData;

  const isFocus = useCallback(() => {
    return activated && cursor;
  }, [activated, cursor]);

  useEffect(() => {
    updatePoints(datas, width, height);
  }, [datas, width, height]);

  const updatePoints = (
    datas: LineGraphData[],
    width: number,
    height: number,
  ) => {
    const mappedDatas = datas.map(data => ({
      value: new BigNumber(data.value).toNumber(),
      time: new Date(data.time).getTime(),
    }));

    const values = mappedDatas.map(data => data.value);
    const times = mappedDatas.map(data => data.time);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    const optimizeValue = function (value: number, height: number) {
      return (
        height -
        new BigNumber(value - minValue)
          .multipliedBy(height)
          .dividedBy(maxValue - minValue)
          .toNumber()
      );
    };

    const optimizeTime = function (time: number, width: number) {
      return new BigNumber(time - minTime)
        .multipliedBy(width)
        .dividedBy(maxTime - minTime)
        .toNumber();
    };

    const points = mappedDatas.map<Point>(data => ({
      x: optimizeTime(data.time, width),
      y: optimizeValue(data.value, height),
    }));
    setPoints(points);
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const isTouch = event.type.startsWith("touch");
    const touch = isTouch ? (event as React.TouchEvent<HTMLDivElement>).touches[0] : null;
    const clientX = isTouch ? touch?.clientX : (event as React.MouseEvent<HTMLDivElement, MouseEvent>).clientX;
    const clientY = isTouch ? touch?.clientY : (event as React.MouseEvent<HTMLDivElement, MouseEvent>).clientY;
    if (!isFocus) {
      setCurrentPointIndex(-1);
      return;
    }

    const { currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    const positionX = (clientX || 0) - left;
    const clientWidth = currentTarget.clientWidth;
    const xPosition = new BigNumber(positionX)
      .multipliedBy(width)
      .dividedBy(clientWidth)
      .toNumber();
    let currentPoint: Point | null = null;
    let minDistance = -1;

    let currentPointIndex = -1;
    
    for (const point of points) {
      const distance = xPosition - point.x;
      currentPointIndex += 1;
      if (minDistance < 0 && distance >= 0) {
        minDistance = distance;
      }
      if (distance >= 0 && distance < minDistance + 1) {
        currentPoint = point;
        minDistance = distance;
        setCurrentPointIndex(currentPointIndex);
      }
    }
    if (currentPoint) {
      setChartPoint({ x: positionX, y: (clientY || 0) - top});
      setCurrentPoint(currentPoint);
    }
  };
  
  const getGraphLine = useCallback(
    (smooth?: boolean, fill?: boolean) => {
      function mappedPoint(point: Point, index: number, points: Point[]) {
        if (index === 0) {
          return `${fill ? "L" : "M"} ${point.x},${point.y}`;
        }
        return smooth
          ? bezierCommand(point, index, points)
          : `L ${point.x},${point.y}`;
      }
      return points
        .map((point, index) => mappedPoint(point, index, points))
        .join(" ");
    },
    [points],
  );

  const getFillGraphLine = useCallback(
    (smooth?: boolean) => {
      return `M 0,${height} ${getGraphLine(
        smooth,
        true,
      )} L ${width},${height}Z`;
    },
    [getGraphLine, height, width],
  );

  const firstPoint = useMemo(() => {
    if (points.length === 0) {
      return { x: 0, y: 0};
    }
    return points[0];
  }, [points]);
  const locationTooltipPosition = useMemo(() => {
    if ((chartPoint?.y || 0) > customHeight + height - 25) {
      if (width < (currentPoint?.x || 0) + locationTooltip) {
        return "top-end";
      } else {
        return "top-start";
      }
    }
    if (width < (currentPoint?.x || 0) + locationTooltip) return "left";
    return "right";
  }, [currentPoint, width, locationTooltip, height, chartPoint, customHeight]);
  
  const onTouchMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    onMouseMove(event);
  };
  
  const onTouchStart = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    onMouseMove(event);
  };

  return (
    <LineGraphWrapper
      className={className}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActivated(true)}
      onMouseLeave={() => setActivated(false)}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      <FloatingTooltip className="chart-tooltip" isHiddenArrow position={locationTooltipPosition} content={currentPointIndex > -1 ?
        <LineGraphTooltipWrapper>
          <div className="tooltip-body">
            <span className="date">
              {typeOfChart === "tvl"
                ? parseTimeTVL(datas[currentPointIndex].time).date
                : parseTime(datas[currentPointIndex].time).date}
            </span>
            {typeOfChart !== "tvl" && <span className="time">
              {parseTime(datas[currentPointIndex].time).time}
            </span>}
          </div>
          <div className="tooltip-header">
            <span className="value">{`$${Number(BigNumber(
              datas[currentPointIndex].value,
            )).toLocaleString()}`}</span>
          </div>
        </LineGraphTooltipWrapper> : null
      }>
        <svg viewBox={`0 0 ${width} ${height + (customHeight || 0)}`}>
          <defs>
            <linearGradient
              id={"gradient" + COMPONENT_ID}
              gradientTransform="rotate(90)"
            >
              <stop offset="0%" stopColor={gradientStartColor} />
              <stop offset="100%" stopColor={gradientEndColor} />
            </linearGradient>
          </defs>
          <g width={width} style={{ transform: "translateY(24px)" }}>
            <path
              fill={`url(#gradient${COMPONENT_ID})`}
              stroke={color}
              strokeWidth={0}
              d={getFillGraphLine(smooth)}
            />
            <path
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              d={getGraphLine(smooth)}
            />
            {point &&
              points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={1}
                  stroke={color}
                />
              ))}
          </g>
          {
            <g>
              {firstPointColor && <line
                stroke={firstPointColor ? firstPointColor : color}
                strokeWidth={1}
                x1={0}
                y1={firstPoint.y}
                x2={width}
                y2={firstPoint.y}
                strokeDasharray={3}
              />}
              {isFocus() && currentPoint && (
                <line
                  stroke={color}
                  strokeWidth={1}
                  x1={currentPoint.x}
                  y1={0}
                  x2={currentPoint.x}
                  y2={height + (customHeight ? customHeight : 0)}
                  strokeDasharray={3}
                />
              )}
              {isFocus() && currentPoint && (
                <circle
                  cx={currentPoint.x}
                  cy={currentPoint.y + 24}
                  r={3}
                  stroke={color}
                  fill={color}
                />
              )}
            </g>
          }
        </svg>
      </FloatingTooltip>
      <ChartGlobalTooltip />
    </LineGraphWrapper>
  );
};

export default LineGraph;
