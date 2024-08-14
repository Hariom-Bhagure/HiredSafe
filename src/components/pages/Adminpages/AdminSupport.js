import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment'; // Import moment.js for date formatting

const AdminSupport = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]); // State to store filtered contacts
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]); // State to store chat messages
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact');
        setContacts(response.data);
        setFilteredContacts(response.data); // Initially, show all contacts
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    // Filter contacts based on the search query
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setMessage(''); // Clear the message input when selecting a new contact
    setChatMessages([ // Initialize chat messages with the received message
      {
        isReceived: true,
        text: contact.message,
        timestamp: new Date(contact.date), // Use the date from the contact
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!selectedContact || !message) return;

    try {
      const response = await axios.post('http://localhost:5000/api/email/send', {
        recipientEmail: selectedContact.email,
        subject: 'Message from Admin',
        message: message,
      });

      if (response.status === 200) {
        // Add the sent message to the chatMessages state with a timestamp
        setChatMessages([...chatMessages, { isSent: true, text: message, timestamp: new Date() }]);
        setMessage(''); // Clear the message input after sending
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  };

  const formatName = (name) => {
    return name.toUpperCase();
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format('DD/MM/YYYY HH:mm'); // Format the timestamp
  };

  return (
    <Container fluid className="chat-container" style={{ padding: '20px' }}>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="chat-sidebar" style={sidebarStyle}>
          <Form.Control
            type="text"
            placeholder="Search"
            style={searchStyle}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <div className="chat-list" style={{ marginTop: '20px' }}>
            {filteredContacts.map((contact, index) => (
              <ChatListItem
                key={index}
                name={formatName(contact.name)} // Format the name to uppercase
                phone={contact.phone}
                onClick={() => handleSelectContact(contact)}
                getInitials={getInitials}
              />
            ))}
          </div>
        </Col>

        {/* Chat Window */}
        <Col md={9} className="chat-window" style={chatWindowStyle}>
          {selectedContact ? (
            <>
              <ChatHeader name={formatName(selectedContact.name)} email={selectedContact.email} getInitials={getInitials} />
              <div className="chat-messages" style={chatMessagesStyle}>
                {chatMessages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    isSent={msg.isSent}
                    isReceived={msg.isReceived}
                    text={msg.text}
                    timestamp={msg.timestamp}
                    formatTimestamp={formatTimestamp}
                  />
                ))}
              </div>
              <InputGroup className="chat-input" style={chatInputStyle}>
                <Form.Control
                  placeholder="Type Something....."
                  aria-label="Chat message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ flexGrow: 1 }}
                />
                <Button variant="primary" style={{ backgroundColor: '#287094' }} onClick={handleSendMessage}>
                  Send
                </Button>
              </InputGroup>
            </>
          ) : (
            <div>Select a contact to view the message</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const ChatListItem = ({ name, phone, onClick, getInitials }) => (
  <div className="chat-list-item" style={chatListItemStyle} onClick={onClick}>
    <div className="chat-list-avatar" style={avatarStyle}>
      {getInitials(name)}
    </div>
    <div className="chat-list-details">
      <div className="chat-list-name" style={{ fontWeight: 'bold' }}>{name}</div>
      <a href={`tel:${phone}`} className="chat-list-phone" style={phoneStyle}>{phone}</a>
    </div>
  </div>
);

const ChatHeader = ({ name, email, getInitials }) => (
  <div className="chat-header" style={chatHeaderStyle}>
    <div className="chat-header-avatar" style={avatarStyle}>
      {getInitials(name)}
    </div>
    <div className="chat-header-details">
      <div className="chat-header-name" style={{ fontWeight: 'bold' }}>{name}</div>
      <a href={`mailto:${email}`} className="chat-header-email" style={emailStyle}>{email}</a>
    </div>
  </div>
);

const ChatMessage = ({ isSent, isReceived, text, timestamp, formatTimestamp }) => (
  <div className={`chat-message ${isSent ? 'sent' : 'received'}`} style={isSent ? sentMessageStyle : receivedMessageStyle}>
    <div>{text}</div>
    <div style={timestampStyle}>{formatTimestamp(timestamp)}</div>
  </div>
);

// Styles
const sidebarStyle = {
  backgroundColor: '#f4f4f4',
  padding: '20px',
  height: '100vh',
  overflowY: 'auto',
};

const searchStyle = {
  padding: '10px',
  borderRadius: '5px',
};

const chatWindowStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const chatHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const avatarStyle = {
  width: '50px',
  height: '50px',
  backgroundColor: '#287094',
  color: '#fff',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  marginRight: '10px',
};

const emailStyle = {
  fontSize: '12px',
  color: '#287094',
  textDecoration: 'none',
};

const phoneStyle = {
  fontSize: '12px',
  color: '#287094',
  textDecoration: 'none',
};

const chatMessagesStyle = {
  flexGrow: 1,
  overflowY: 'auto',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  marginBottom: '20px',
};

const chatListItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
};

const chatInputStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  marginTop: 'auto',
};

const sentMessageStyle = {
  backgroundColor: '#287094',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '10px',
  alignSelf: 'flex-end',
  maxWidth: '75%',
};

const receivedMessageStyle = {
  backgroundColor: '#e5e5ea',
  color: '#333',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '10px',
  alignSelf: 'flex-start',
  maxWidth: '75%',
};

const timestampStyle = {
  fontSize: '10px',
  color: '#999',
  marginTop: '5px',
  textAlign: 'right',
};

export default AdminSupport;
