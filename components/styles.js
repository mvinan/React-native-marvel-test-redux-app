import {StyleSheet} from 'react-native'

export const colors = {
  blue: '#0076FF',
  red: '#FE2851',
  orange: '#FF9600',
  yellow: '#FFCD00',
  lightBlue: '#54C7FC',
  green: '#44DB5E',
  lightGrey: '#EFEFF4',
  whiteTransparent: 'rgba(255, 255, 255, 0.95)'
}

export const spaces = {
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 3,
  comicRowHeight: 180
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    backgroundColor:'rgba(52,52,52,0.5)',
    alignSelf: 'stretch',
    height: spaces.comicRowHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButton: {
    paddingHorizontal: spaces.paddingHorizontal,
    paddingVertical: spaces.paddingVertical,
    backgroundColor: colors.blue,
    borderRadius: spaces.borderRadius
  },
  secondaryButton: {
    paddingHorizontal: spaces.paddingHorizontal,
    paddingVertical: spaces.paddingVertical,
    backgroundColor: colors.orange
  },
  textButton: {
    color: 'white'
  },
  comicRow: {
    height: spaces.comicRowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  comicText: {
    color: 'white',
    fontSize: 20
  },
  comicHeading: {
    color: '#242424',
    fontSize: 17
  },
  comicThumbnail: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
