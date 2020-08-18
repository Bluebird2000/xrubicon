import React, { Component } from 'react';
import styled from 'styled-components';
import { Dimensions, View } from 'react-native';
import util from '../assets/utils/util';

const { width, height } = Dimensions.get('window');
const Card = ({image, title, subtitle, iconMenu, caption}) => (
    <Container>
        <Cover>
            <Wrapper>
                <Image source={ image } resizeMode="contain" />
                <Column>
                    <View style={{marginLeft: 10}}>
                        <Title>{ title }</Title>
                        <SubTitle>{ subtitle }</SubTitle>
                    </View>
                </Column>
                <View style={{alignItems: 'center'}}>
                <IconMenu>{ iconMenu}</IconMenu>
                <Caption>{ caption }</Caption>
                </View>
            </Wrapper>
        </Cover>
       
    </Container>
)

export default Card;

const Container = styled.View`
    width: ${width - 50}px;
    height: 100px;
    border-radius: 14px;
    margin-left: 12px;
    margin-top: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
`;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.View`
    padding-left: 20px;
    align-items: center;
`;

const Image = styled.Image`
    width: 100%;
    height: 220px;
    position: absolute;
    left: 0;
`;

const Title = styled.Text`
    color: #ffffff;
    font-size: ${util.md_fontsize}px;
    margin-bottom: 7%;
    font-family: ${util.nunito_bold};
    font-weight: bold;
`;
// font-family: Nunito-Bold;

const Caption = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: ${util.md_fontsize}px;
    line-height: 18px;
    color: #ECF009;
    padding-right: 20px;
    font-family: ${util.nunito_bold};
    font-weight: bold;
`;
// font-family: Nunito-Bold;


const SubTitle = styled.Text`
    color: #ffffff;
    font-size: ${util.sm_fontsize}px;
    font-family: ${util.nunito_bold};
    font-weight: bold;
`;
// font-family: Nunito-Bold;
// font-size: ${width >= 200 && width <= 320 ? RFValue(4.8, width / 2.1) : width >= 320 && width <= 420 ? RFValue(4.8, width / 2.5) : RFValue(4.8, width / 4)};



const IconMenu = styled.View`
margin-bottom: 7%;
    
`;