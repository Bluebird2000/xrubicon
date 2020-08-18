import React, { Component } from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { Animated, Dimensions } from 'react-native';

class Success extends Component {

    state = {
        top: new Animated.Value(0),
        opacity: new Animated.Value(0)
    }

    componentDidUpdate() {
        if(this.props.isSuccess) {
            Animated.timing(this.state.top, { toValue:0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(this.state.opacity, { toValue: 1, useNativeDriver: true, }).start();

            this.animation.play();
        }else {
            Animated.timing(this.state.top, { toValue:0, duration: 0, useNativeDriver: true }).start();
            Animated.timing(this.state.opacity, { toValue: 0, useNativeDriver: true }).start();

            this.animation.loop = false;
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <AnimatedContainer >
                <Lottie>
                    <LottieView
                        source={require('../assets/lotties/loading.json')}
                        autoPlay={false}
                        loop={false}
                        ref={animation => {
                            this.animation = animation;
                        }}
                    />
                </Lottie>
            </AnimatedContainer>
        )
    }
}

export default Success;

const Container = styled.View`
    position: absolute;
    top: 0;
    left 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.45)
    justify-content: center;
    align-items: center;
`;

const Lottie = styled.View`
    position: absolute;
    top: 0;
    left 0;
    width: 40%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)
