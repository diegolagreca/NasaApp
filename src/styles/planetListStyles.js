import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  planetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nameText: {
    flex: 1, 
    fontSize: 18,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end', 
  },
  iconButton: {
    marginLeft: 12, 
    padding: 8,
  },
});
