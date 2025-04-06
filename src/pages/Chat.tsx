
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, PaperclipIcon } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'seller';
  timestamp: Date;
}

const Chat = () => {
  const { sellerId, productId } = useParams<{ sellerId: string, productId: string }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحبا، هل المنتج ما زال متوفر؟',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'نعم، المنتج متوفر. هل لديك أسئلة محددة؟',
      sender: 'seller',
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout hideSearch>
      <div className="mb-4">
        <Link to={`/product/${productId}`} className="inline-flex items-center text-gray-600 hover:text-sooq-green mb-4">
          <ArrowLeft size={16} className="mr-1" />
          العودة إلى المنتج
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        {/* Chat Header */}
        <div className="p-4 border-b bg-gray-50 flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="/placeholder.svg" alt="البائع" />
            <AvatarFallback>بائع</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">اسم البائع</h3>
            <p className="text-sm text-gray-500">متصل الآن</p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-sooq-green text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-gray-200' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t flex">
          <Button 
            type="button" 
            variant="ghost" 
            className="text-gray-500 hover:text-sooq-green"
            size="icon"
          >
            <PaperclipIcon size={20} />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 mx-2"
          />
          <Button type="submit" className="bg-sooq-green hover:bg-sooq-green-light">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Chat;
