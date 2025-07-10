// src/components/VoiceWave.js
import React from 'react';
import { View } from 'react-native';

export default function VoiceWave({ color = 'bg-purple-400' }) {
    return (
        <View className="flex-row gap-0.5 items-end h-4 ml-2">
            {[1, 2, 3, 2, 1].map((delay, i) => (
                <View
                    key={i}
                    className={`w-1 ${color} rounded-full animate-bounce`}
                    style={{ animationDelay: `${delay * 100}ms`, height: 4 + i * 2 }}
                />
            ))}
        </View>
    );
}