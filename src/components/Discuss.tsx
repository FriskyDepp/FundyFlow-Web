import React, { useState, useEffect } from 'react';
import { Send, Check, X } from "lucide-react";
import { ScrollArea } from './ScrollArea';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import Jennifer from '../assets/jennifer.png';
import Martin from '../assets/martin.png';
import Daisy from '../assets/daisy.png';

const Discuss = () => {
  const auth = getAuth();
  const db = getFirestore();

  const JENIFER_MATCH_ID = "kQy9CZmcuBNXuejScN7s838paQI2_qMdEjQeNHwPzC6cB1H4o1N12JAh2";

  const [selectedInvestor, setSelectedInvestor] = useState<string | null>(JENIFER_MATCH_ID);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Record<string, Array<{id:number, sender:string, text:string, time:string}>>>({
    [JENIFER_MATCH_ID]: [],
    session_martin: [],
    session_daisy: [],
  });
  const [username, setUsername] = useState("You");

  const [yourAsk, setYourAsk] = useState({ amount: "100,000", equity: "3%" });

  const investors = [
    {
      id: JENIFER_MATCH_ID,
      name: "Jenifer Braman",
      role: "Investor",
      avatar: Jennifer,
      offer: { amount: "100,000", equity: "5%" },
      unread: 1,
    },
    {
      id: "session_martin",
      name: "Martin Decoy",
      role: "Angel Investor",
      avatar: Martin,
      offer: { amount: "150,000", equity: "7%" },
      unread: 0,
    },
    {
      id: "session_daisy",
      name: "Daisy Hong",
      role: "VC Partner",
      avatar: Daisy,
      offer: { amount: "200,000", equity: "10%" },
      unread: 0,
    },
  ];

  const currentInvestor = investors.find(inv => inv.id === selectedInvestor);

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username || "You");
        }
      }
    };
    fetchUsername();
  }, [auth, db]);

  useEffect(() => {
    if (!selectedInvestor) return;

    if (selectedInvestor === JENIFER_MATCH_ID) {
      const q = query(
        collection(db, "chats", JENIFER_MATCH_ID, "messages"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        setMessages(prev => ({
          ...prev,
          [JENIFER_MATCH_ID]: snapshot.docs.map(doc => ({
            id: doc.id,
            sender: doc.data().senderName,
            text: doc.data().text,
            time: new Date(doc.data().timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }))
        }));
      });
      return () => unsubscribe();
    }
  }, [db, selectedInvestor]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedInvestor) return;

    const user = auth.currentUser;
    if (!user) return alert("Please login first!");

    if (selectedInvestor === JENIFER_MATCH_ID) {
      await addDoc(collection(db, "chats", JENIFER_MATCH_ID, "messages"), {
        text: message,
        senderId: user.uid,
        senderName: username,
        timestamp: new Date()
      });
    } else {
      const newMsg = {
        id: messages[selectedInvestor].length + 1,
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages({
        ...messages,
        [selectedInvestor]: [...messages[selectedInvestor], newMsg],
      });
    }

    setMessage("");
  };

const handlePass = () => {
  const newAmount = prompt("Please enter new money amount:", yourAsk.amount);
  if (!newAmount) return;

  let newEquity = prompt("Please enter new equity amount:", yourAsk.equity);
  if (!newEquity) return;

  if (!newEquity.includes("%")) {
    newEquity = newEquity + "%";
  }

  setYourAsk({ amount: newAmount, equity: newEquity });
};


  return (
    <div className="min-h-full min-w-screen bg-[#040E18]">
      <main className="pt-20">
        <div className="h-[calc(100vh-5rem)] flex">
          {/* Left Sidebar */}
          <div className="w-80 border-r border-[#252732] bg-blue-950/10 flex flex-col">
            <div className="p-6 border-b border-[#252732]">
              <h1 className="text-5xl font-bold text-foreground">Discuss</h1>
              <p className="text-sm text-muted-foreground mt-1">Matched investors</p>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3">
                {investors.map((investor) => (
                  <button
                    key={investor.id}
                    onClick={() => setSelectedInvestor(investor.id)}
                    className={`w-full p-4 rounded-xl mb-2 transition-all text-left hover:bg-blue-900 ${
                      selectedInvestor === investor.id ? 'bg-blue-900' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={investor.avatar} />
                        <AvatarFallback>{investor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-foreground truncate">{investor.name}</p>
                          {investor.unread > 0 && (
                            <span className="bg-blue-500 text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {investor.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{investor.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          {currentInvestor ? (
            <div className="flex-1 flex flex-col justify-">
              {/* Chat Header */}
              <div className="p-6 border-b border border-[#252732] bg-card">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={currentInvestor.avatar} />
                    <AvatarFallback>{currentInvestor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{currentInvestor.name}</h2>
                    <p className="text-sm text-muted-foreground">{currentInvestor.role}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4 max-w-4xl mx-auto">
                    <div className="flex justify-start">
    <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-blue-700/10 text-foreground">
      <p className="text-sm">
        Hey, I’ve already read your proposal, and I’m interested in investing in your business. Could you please provide more details about your company?
      </p>
      <p className="text-xs mt-1 text-muted-foreground">10:30 AM</p>
    </div>
  </div>
                  {selectedInvestor && messages[selectedInvestor].map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'Investor' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          msg.sender === 'You'
                            ? 'bg-blue-500 text-primary-foreground'
                            : 'bg-blue-700/10 text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Pricing Info Bar */}
              <div className="px-6 py-4 border-t border border-blue-400/20 bg-blue-950/10">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Their Offer</p>
                      <p className="text-lg font-bold text-foreground">${currentInvestor.offer.amount} · {currentInvestor.offer.equity}</p>
                    </div>
                    <div className="h-8 w-px bg-[#252732]" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Your Ask</p>
                      <p className="text-lg font-bold text-foreground">${yourAsk.amount} · {yourAsk.equity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="gap-2 border-red-700/50 border w-22 h-12 bg-red-700/10 rounded-xl flex items-center justify-center font-bold hover:bg-red-700"
                      onClick={handlePass}
                    >
                      <X className="w-4 h-4" />
                      Pass
                    </button>
                    <button
                      className="gap-2 bg-emerald-700 w-35 h-12 flex items-center justify-center rounded-xl hover:bg-emerald-700/50 font-bold"
                      onClick={() => alert("🎉 Congratulations! You get yourself a deal!")}
                    >
                      <Check className="w-4 h-4" />
                      Accept Deal
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border border-[#252732] bg-card">
                <div className="max-w-4xl mx-auto flex gap-3">
                  <input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-background border border-blue-500/40 h-12 rounded-xl pl-3"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="h-12 w-12 rounded-xl bg-blue-500 hover:bg-blue-500/50 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center">
                <p className="text-muted-foreground">Select an investor to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Discuss;
