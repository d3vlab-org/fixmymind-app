import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/AuthFormStyles';

const AuthForm = ({
                      title,
                      email,
                      onEmailChange,
                      password,
                      onPasswordChange,
                      buttonText,
                      onSubmit,
                      footerText,
                      onFooterPress,
                  }) => {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={onEmailChange}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Hasło"
                value={password}
                onChangeText={onPasswordChange}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>

            {footerText && onFooterPress && (
                <TouchableOpacity onPress={onFooterPress}>
                    <Text style={styles.footerText}>{footerText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default AuthForm;