import React, { useContext } from 'react'
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { AnimatedContext } from '../../../provider/Animated_Provider';

export default function StatusScreen() {
    const AnimatedState = useContext(AnimatedContext)
    return (
        < >
            <Animated.View style={[{flex: 1},
            AnimatedState.themeAnimatedStyles]}>
            <Text>Status Screen</Text>
            </Animated.View>
        </>
    )
}

