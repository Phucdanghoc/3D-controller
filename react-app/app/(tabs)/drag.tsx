import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';

const Drag = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: pan.x,
                        dy: pan.y,
                    },
                ],
                {
                    useNativeDriver: false,
                    listener: (gestureState) => {
                        console.log(gestureState.nativeEvent.locationX, gestureState.nativeEvent.locationY);
                    },
                }
            ),
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Drag the Box</Text>
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    borderColor: 'blue',
                    borderWidth: 2,
                }}
                {...panResponder.panHandlers}
            >
                <View style={styles.box} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8', // Light background color
        padding: 20,
    },
    titleText: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Darker text color
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: '#007bff', // Bootstrap primary color
        borderRadius: 10,
        elevation: 5, // Add shadow effect
        shadowColor: '#000', // Shadow for Android
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
});

export default Drag;
