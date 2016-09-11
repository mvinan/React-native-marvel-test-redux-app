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
  paddingHorizontal: 40,
  paddingVertical: 20,
  borderRadius: 3,
  comicRowHeight: 200
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
    backgroundColor: colors.red,
    borderRadius: spaces.borderRadius,
  },
  secondaryButton: {
    paddingHorizontal: spaces.paddingHorizontal,
    paddingVertical: spaces.paddingVertical,
    backgroundColor: colors.orange,
    borderRadius: spaces.borderRadius,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17
  },
  comicRow: {
    height: spaces.comicRowHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  comicText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  comicHeading: {
    color: '#242424',
    fontSize: 17
  },
  comicThumbnail: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigationBack: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  navigationBackText: {
    color: colors.blue,
    fontSize: 17,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationTitle: {
    marginTop: 10,
    color: colors.red,
    fontSize: 17
  },
  navigationFoward: {
    padding: 10
  },
  navigationBar: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: `rgba(248, 248, 248, 0.9)`,
  }
})

export default styles
