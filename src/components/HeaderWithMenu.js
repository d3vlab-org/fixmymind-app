import React from 'react';
import { View, Text, Image } from 'react-native';
import AvatarMenu from './AvatarMenu';
import { useTheme } from '../contexts/ThemeContext';

import styles from './../styles/HeaderWithMenuStyles';

const HeaderWithMenu = () => {
    const { isDarkTheme } = useTheme();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Image
                    source={require('../../assets/fixmymind_splash.png')}
                    style={[
                        styles.logoImage,
                        { tintColor: isDarkTheme ? undefined : '#000000' }
                    ]}
                />
                <View>
                    <Text style={[
                        styles.quoteLabel,
                        { color: isDarkTheme ? '#ffffff' : '#333333' }
                    ]}>Cytat na dziś</Text>
                    <Text style={[
                        styles.quoteText,
                        { color: isDarkTheme ? '#ffffff' : '#333333' }
                    ]}>
                        „Najważniejsza rozmowa to ta, którą prowadzisz ze sobą.”
                    </Text>
                </View>
            </View>
            <AvatarMenu />
        </View>
    );
};

export default HeaderWithMenu;
