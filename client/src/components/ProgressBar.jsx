import { useEffect, useRef, useState } from "react";

export default function ProgressBar({ onProgressChange, task }) {
    const [progress, setProgress] = useState(
        task.progress === 0 ? 10 : task.progress
    );
    const outerBarRef = useRef(null);
    const innerBarRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsDragging(true);
        setStartX(event.clientX);
        setStartWidth(innerBarRef.current.offsetWidth);
    };

    const handleMouseUpOrLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            onProgressChange(progress, task.id);
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const offsetX = event.clientX - startX;
            const newWidth = calculateNewWidth(offsetX);
            setProgress(Math.round(newWidth));
        }
    };

    const calculateNewWidth = (offsetX) => {
        let newWidth =
            ((startWidth + offsetX) / outerBarRef.current.offsetWidth) * 100;

        // Begränsa nya bredden till att vara mellan 10% och 100%
        if (newWidth < 10) {
            newWidth = 10;
        } else if (newWidth > 100) {
            newWidth = 100;
        }

        return newWidth;
    };

    useEffect(() => {
        const outerBar = outerBarRef.current;

        if (isDragging) {
            outerBar.addEventListener("mousemove", handleMouseMove);
            outerBar.addEventListener("mouseup", handleMouseUpOrLeave);
            outerBar.addEventListener("mouseleave", handleMouseUpOrLeave);
        } else {
            outerBar.removeEventListener("mousemove", handleMouseMove);
            outerBar.removeEventListener("mouseup", handleMouseUpOrLeave);
            outerBar.removeEventListener("mouseleave", handleMouseUpOrLeave);
        }

        return () => {
            outerBar.removeEventListener("mousemove", handleMouseMove);
            outerBar.removeEventListener("mouseup", handleMouseUpOrLeave);
            outerBar.removeEventListener("mouseleave", handleMouseUpOrLeave);
        };
    }, [isDragging, startX, startWidth, progress]);

    const getColor = (progress) => {
        if (progress < 33) {
            return "rgb(244, 67, 54)";
        } else if (progress >= 33 && progress < 66) {
            return "rgb(255, 193, 7)";
        } else {
            return "rgb(76, 175, 80)";
        }
    };

    const barColor = getColor(progress);

    return (
        <div className="outer-bar" ref={outerBarRef}>
            <div
                className="inner-bar"
                ref={innerBarRef}
                style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: barColor,
                    borderRadius: "7px",
                    cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
            >
                <span
                    className="circle"
                    style={{ backgroundColor: barColor }}
                ></span>
            </div>
        </div>
    );
}
