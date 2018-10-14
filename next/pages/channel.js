/**
 * This is the page rendered when inside a chat room.
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import { Mention } from 'react-mentions'

import { HashLoader } from 'react-spinners'
import App from 'grommet/components/App'
import ChatIcon from 'grommet/components/icons/base/Chat'
import RefreshIcon from 'grommet/components/icons/base/Refresh'
import AddCircleIcon from 'grommet/components/icons/base/Add'
import UserIcon from 'grommet/components/icons/base/User'
import LogoutIcon from 'grommet/components/icons/base/Logout'
import Split from 'grommet/components/Split'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph'
import Label from 'grommet/components/Label'

import bootstrap from 'app/lib/bootstrap'
import MentionInput from 'app/modules/form/components/MentionInput'

const StyledRoomHeader = styled(Header)`
  border-bottom: 1px solid #ddd;
`

const StyledMessage = styled(Paragraph)`
  margin: 0;
`

const StyledAuthor = styled(Label)`
  margin: 0;
`

const StyledMentionInput = styled(MentionInput)`
  width: 100%;
  height: auto;
`

const AddChannelButton = styled(Button)`
  margin-left: auto;
`

const LoadingComponent = () => (
  <Box full='vertical' justify='center' align='center'>
    <HashLoader color='#e02438' loading />
  </Box>
)

import CurrentUserContainer from 'app/modules/auth/containers/CurrentUserContainer'
import ChannelsContainer from 'app/modules/channel/containers/ChannelsContainer'
import MessagesContainer from 'app/modules/channel/containers/MessagesContainer'
import NewMessageContainer from 'app/modules/channel/containers/NewMessageContainer'
import NewChannelContainer from 'app/modules/channel/containers/NewChannelContainer'
import UsersMentionContainer from 'app/modules/channel/containers/UsersMentionContainer'

const MentionInputComponent = ({ ...props }) => (
  <UsersMentionContainer.Fetch>
    {fetchUsers => {
      const transform = ({ data }) =>
        data.users.entities
          .map(user => user ? ({ display: user.name, id: user.uid }) : false)
          .filter(Boolean)

      const data = (query, cb) =>
        fetchUsers(query).then(transform).then(cb)

      return (
        <StyledMentionInput
          { ...props }
          displayTransform={ (_, name) => `@${name}` }
          markup='@[__display__](__id__)'
          singleLine
        >
          <Mention
            trigger='@'
            data={ data }
            style={ { backgroundColor: '#d3e5f3' } }
          />
        </StyledMentionInput>
      )
    }}
  </UsersMentionContainer.Fetch>
)

const MessageForm = ({ user, channel }) => user && user.uid ? (
  <NewMessageContainer user={ user } channel={ channel }>
    { ({ handleSubmit }) => (
      <form onSubmit={ handleSubmit }>
        <NewMessageContainer.Message
          placeholder='Message #general'
          component={ MentionInputComponent }
        />
      </form>
    ) }
  </NewMessageContainer>
) : (
  <span>Log in to post messages</span>
)

MessageForm.propTypes = {
  user: PropTypes.object,
  channel: PropTypes.string
}

const ChatRoom = ({ url, url: { query: { channel = 'general' } } }) => (
  <CurrentUserContainer>
    { ({ user }) => (
      <ChannelsContainer>
        { ({ loading, channels }) => (
          (loading && !channels.length) ? <LoadingComponent /> : (
            <App centered={ false }>
              <Split fixed flex='right'>
                <Sidebar colorIndex='neutral-1'>
                  <Header pad='medium'>
                    <Title>
                      TallerChat <ChatIcon />
                    </Title>

                    <NewChannelContainer channels={ channels }>
                      { create => (
                        <AddChannelButton
                          icon={ <AddCircleIcon /> }
                          onClick={ () => create(
                            window.prompt('Name your new channel')
                          ) }
                        />
                      ) }
                    </NewChannelContainer>
                  </Header>

                  <Box flex='grow' justify='start'>
                    <Menu primary>
                      { channels.map(({ name }) => (
                        <Link key={ name } prefetch href={ `/messages/${name}` }>
                          <Anchor className={ channel === name ? 'active' : '' }>
                            # <b>{ name }</b>
                          </Anchor>
                        </Link>
                      )) }
                    </Menu>
                  </Box>

                  <Footer pad='medium'>
                    <Button icon={ <UserIcon /> } onClick={ console.log } />
                    <Button icon={ <LogoutIcon /> } onClick={ console.log } />
                  </Footer>
                </Sidebar>

                { !user || !user.uid ? (
                  <LoadingComponent />
                ) : (
                  <MessagesContainer channel={ channels.find(({ name }) => name === channel) }>
                    { ({ loading, refetch, messages }) => (
                      <Box full='vertical'>
                        <StyledRoomHeader pad={ { vertical: 'small', horizontal: 'medium' } } justify='between'>
                          <Title>
                            { '#' + channel }
                          </Title>

                          <Button icon={ <RefreshIcon /> } onClick={ () => refetch() } />
                        </StyledRoomHeader>

                        <Box pad='medium' flex='grow'>
                          { loading ? 'Loading...' : (
                            messages.length === 0 ? 'No one talking here yet :(' : (
                              messages.map(({ id, author, message }) => (
                                <Box key={ id } pad='small' credit={ author }>
                                  <StyledAuthor>{ author }</StyledAuthor>
                                  <StyledMessage>{ message }</StyledMessage>
                                </Box>
                              ))
                            )
                          ) }
                        </Box>

                        <Box pad='medium' direction='column'>
                          <MessageForm
                            channel={ channels.find(({ name }) => name === channel) }
                            user={ user }
                          />
                        </Box>
                      </Box>
                    ) }
                  </MessagesContainer>
                ) }

              </Split>
            </App>
          )
        ) }
      </ChannelsContainer>
    ) }
  </CurrentUserContainer>
)

ChatRoom.propTypes = {
  url: PropTypes.object.isRequired,
}

export default bootstrap(ChatRoom)
