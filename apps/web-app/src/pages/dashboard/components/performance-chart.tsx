"use client";

import { useEffect, useRef } from "react";

export function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Chart data
    const subjects = ["Math", "Science", "English", "History", "Art"];
    const currentScores = [85, 72, 90, 68, 95];
    const previousScores = [80, 75, 85, 70, 90];

    // Chart dimensions
    const chartWidth = rect.width - 40;
    const chartHeight = rect.height - 60;
    const barWidth = chartWidth / subjects.length / 3;
    const spacing = barWidth / 2;

    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.font = "14px Arial";
    ctx.fillStyle = "#374151";
    ctx.textAlign = "center";
    ctx.fillText("Subject Performance Comparison", rect.width / 2, 20);

    // Draw bars
    subjects.forEach((subject, index) => {
      const x = 30 + index * (barWidth * 3 + spacing);

      // Current score bar
      ctx.fillStyle = "#3B82F6";
      const currentHeight = (currentScores[index] / 100) * chartHeight;
      ctx.fillRect(
        x,
        chartHeight + 30 - currentHeight,
        barWidth,
        currentHeight
      );

      // Previous score bar
      ctx.fillStyle = "#93C5FD";
      const prevHeight = (previousScores[index] / 100) * chartHeight;
      ctx.fillRect(
        x + barWidth + spacing / 2,
        chartHeight + 30 - prevHeight,
        barWidth,
        prevHeight
      );

      // Draw subject label
      ctx.fillStyle = "#6B7280";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(subject, x + barWidth, chartHeight + 45);
    });

    // Draw legend
    ctx.fillStyle = "#3B82F6";
    ctx.fillRect(rect.width - 100, 15, 10, 10);
    ctx.fillStyle = "#93C5FD";
    ctx.fillRect(rect.width - 100, 30, 10, 10);

    ctx.fillStyle = "#374151";
    ctx.font = "10px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Current", rect.width - 85, 23);
    ctx.fillText("Previous", rect.width - 85, 38);

    // Draw y-axis
    ctx.strokeStyle = "#E5E7EB";
    ctx.beginPath();
    ctx.moveTo(25, 30);
    ctx.lineTo(25, chartHeight + 30);
    ctx.stroke();

    // Draw y-axis labels
    ctx.fillStyle = "#6B7280";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";

    for (let i = 0; i <= 100; i += 20) {
      const y = chartHeight + 30 - (i / 100) * chartHeight;
      ctx.fillText(i.toString(), 20, y + 3);

      // Draw horizontal grid lines
      ctx.strokeStyle = "#F3F4F6";
      ctx.beginPath();
      ctx.moveTo(25, y);
      ctx.lineTo(rect.width - 20, y);
      ctx.stroke();
    }
  }, []);

  return (
    <div className="w-full h-64">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
