import { defaultProps } from 'recompose'
import { MentionsInput } from 'react-mentions'

const mentionInputStyles = {
  control: {
    backgroundColor: '#fff',
    fontWeight: 'normal',
  },

  highlighter: {
    overflow: 'hidden',
  },

  input: {
    margin: 0,
  },

  '&singleLine': {
    control: {
      display: 'inline-block',
      width: '100%',
    },

    highlighter: {
      padding: '10px 20px',
      border: '1px inset transparent',
    },

    input: {
      padding: '10px 20px',
      borderWidth: 1
    }
  },

  suggestions: {
    top: 'auto',
    bottom: 20,

    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
      borderRadius: 3,
    },

    item: {
      padding: '3px 8px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',

      '&focused': {
        backgroundColor: '#eeeeee',
      },
    },
  },
}

export default defaultProps({ style: mentionInputStyles })(MentionsInput)
