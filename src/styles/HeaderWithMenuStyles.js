import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '85%',
  },
  logoImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginRight: 16,
  },
  quoteLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  quoteText: {
    fontSize: 16,
    color: '#ffffff',
    fontStyle: 'italic',
    flexWrap: 'wrap',
  },
});

export default styles;