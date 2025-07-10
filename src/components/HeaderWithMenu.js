import React from 'react';
import { View, Text, Image } from 'react-native';
import AvatarMenu from './AvatarMenu';

import styles from './../styles/HeaderWithMenuStyles';

const HeaderWithMenu = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Image
                    source={require('../../assets/fixmymind_splash.png')}
                    style={styles.logoImage}
                />
                <View>
                    <Text style={styles.quoteLabel}>Cytat na dziś</Text>
                    <Text style={styles.quoteText}>
                        „Najważniejsza rozmowa to ta, którą prowadzisz ze sobą.”
                    </Text>
                </View>
            </View>
            <AvatarMenu />
        </View>
    );
};

export default HeaderWithMenu;