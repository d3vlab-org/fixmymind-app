import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 60,
    marginRight: 10
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    elevation: 4
  },
  dropdownItem: {
    padding: 10
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6
  },
  inputLabel: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  container: {
    padding: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  }
});
