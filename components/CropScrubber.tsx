import React from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface Props {
  duration: number;
  onChange: (start: number, end: number) => void;
}

export default function CropScrubber({ duration, onChange }: Props) {
  const [values, setValues] = React.useState<[number, number]>([0, duration]);

  const handleChange = (vals: number[]) => {
    if (vals.length === 2) {
      setValues([vals[0], vals[1]]);
      onChange(vals[0], vals[1]);
    }
  };

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={{ color: 'white', textAlign: 'center', marginBottom: 8 }}>
        Start: {values[0].toFixed(1)}s — End: {values[1].toFixed(1)}s
      </Text>
      <MultiSlider
        values={values}
        min={0}
        max={duration}
        step={0.1}
        sliderLength={300}
        onValuesChange={handleChange}
        selectedStyle={{ backgroundColor: '#ef4444' }}
        unselectedStyle={{ backgroundColor: '#555' }}
        markerStyle={{ backgroundColor: '#ef4444' }}
        containerStyle={{ alignSelf: 'center' }}
      />
    </View>
  );
}
