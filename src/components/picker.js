import React, { useState, useRef  } from 'react';
import weightData from '../assets/json/weight.json';

const HorizontalPicker = () => {
    const [selectedWeight, setSelectedWeight] = useState(50);
    const weightSliderRef = useRef(null);

    const handleScroll = () => {
        const scrollLeft = weightSliderRef.current.scrollLeft;
        const itemWidth = 3;
        const nearestWeightIndex = Math.round(scrollLeft / itemWidth);
        const newWeight = weightData[nearestWeightIndex];

        if (newWeight >= 50 && newWeight <= 200) {
            setSelectedWeight(newWeight);
        } else if (newWeight < 50) {
            setSelectedWeight(50);
            weightSliderRef.current.scrollLeft = 0;
        } else if (newWeight > 200) {
            setSelectedWeight(200);
            weightSliderRef.current.scrollLeft = (weightData.indexOf(200) * itemWidth);
        }
    };

    return (
        <main className="boarding-main">
            <div className="weight-picker">
                <div
                    className="weight-slider"
                    ref={weightSliderRef}
                    onScroll={handleScroll}
                >
                    {weightData.map((weight, index) => {
                        return (
                            <div
                                key={weight}
                                className="weight-tick"
                                style={{
                                    height: `${index % 10 === 0 ? 70 : (index % 5 === 0) ? 60 : 50}px`,
                                }}
                                onClick={() => setSelectedWeight(weight)}
                            >
                            </div>
                        );
                    })}
                </div>
                <div className="selected-weight-display">
                    Selected Weight: {selectedWeight} kg
                </div>
            </div>
        </main>
    );
};

export default HorizontalPicker;
