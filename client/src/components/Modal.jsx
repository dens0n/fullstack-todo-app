import { useState } from "react";
export default function Modal() {
    const mode = "edit";
    const handleChange = () => {
        console.log("changing");
    };
    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Let's {mode} you task</h3>
                    <button>X</button>
                </div>
                <form>
                    <input
                        type="text"
                        required
                        maxLength={30}
                        placeholder="your task goes here"
                        name="Title"
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="range">
                        Drag to select current progress
                    </label>
                    <input
                        id="range"
                        required
                        type="range"
                        min={0}
                        max={100}
                        name="progress"
                        value={5}
                        onChange={handleChange}
                    />
                    <input className={mode} type="submit" />
                </form>
            </div>
        </div>
    );
}
