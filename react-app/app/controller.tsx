import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { io } from 'socket.io-client';
import { router } from 'expo-router';
import * as Device from 'expo-device';

const ControlScreen: React.FC = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [seekBarValue, setSeekBarValue] = useState(1);
    const [socket, setSocket] = useState<any>(null);
    const SERVER_URL = 'https://64cc-2402-800-637c-794e-5589-80ba-440d-bd4.ngrok-free.app';
    const [deviceName, setDeviceName] = useState('');

    useEffect(() => {
        const socketConnection = io(SERVER_URL);
        console.log(`Connecting to ${SERVER_URL}`);
        setSocket(socketConnection);


        socketConnection.on('connect', () => {
            console.log('Connected to server');
            socketConnection.emit("device_name", Device.modelName);
        });

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    useEffect(() => {
        pan.setValue({ x: 0, y: 0 });
    }, []);
    const ZONE_RADIUS = 80;
    const CURSOR_RADIUS = 25;
    const panResponder = PanResponder.create({
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
                listener: () => {
                    const locationX = pan.x._value;
                    const locationY = pan.y._value;
                    const distanceFromCenter = Math.sqrt(locationX ** 2 + locationY ** 2);
                    if (distanceFromCenter > ZONE_RADIUS - CURSOR_RADIUS) {
                        const angle = Math.atan2(locationY, locationX);
                        pan.setValue({
                            x: (ZONE_RADIUS - CURSOR_RADIUS) * Math.cos(angle),
                            y: (ZONE_RADIUS - CURSOR_RADIUS) * Math.sin(angle),
                        });
                    }

                    console.log(locationX, locationY);

                    if (socket) {
                        if (locationX < 50 && locationY < 50) {
                           
                        }
                        const clamp = (value: number) => Math.abs(value) > 50 ? 50 * Math.abs(value) / value : value;
                        socket.emit('cursor_position', {
                            x: clamp(locationX),
                            y: clamp(locationY),
                        });
                    }
                },
            }
        ),
        onPanResponderRelease: () => {
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
            }).start();
        },
    });

    const handleSeekBarChange = (value: number) => {
        setSeekBarValue(value);
        console.log(`Zoom level changed to: ${value}`);
        if (socket) {
            socket.emit('zoomval', value);
        }
    };

    const resetCursorPosition = () => {
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
        socket.emit('reset_position');
    };

    const backScreen = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={backScreen}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.card}>
                <Text style={styles.header}>Control Screen</Text>
                <View style={styles.zone}>
                    <Animated.View
                        style={[
                            styles.cursor,
                            {
                                transform: [{ translateX: pan.x }, { translateY: pan.y }],
                            },
                        ]}
                        {...panResponder.panHandlers}
                    />
                </View>
                <Text style={styles.label}>Zoom Control</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={3}
                    value={seekBarValue}
                    onValueChange={handleSeekBarChange}
                    minimumTrackTintColor="#1fb28a"
                    maximumTrackTintColor="#d3d3d3"
                />
                <Text style={styles.zoomLevel}>Zoom Level: {seekBarValue.toFixed(2)}</Text>
                <TouchableOpacity style={styles.resetButton} onPress={resetCursorPosition}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8', 
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 80,
        height: 80,
        backgroundColor: '#007bff', 
        borderRadius: 40, 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, 
        shadowColor: '#000', 
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    zone: {
        width: 160,
        height: 160,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100, 
        marginBottom: 20,
    },
    cursor: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 25, 
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
    },
    slider: {
        width: 300,
        height: 40,
    },
    zoomLevel: {
        fontSize: 16,
        marginTop: 10,
    },
    resetButton: {
        marginTop: 20,
        width: 100,
        height: 40,
        backgroundColor: '#ff5722', 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ControlScreen;
