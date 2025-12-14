import React, { useEffect, useRef, useState } from "react";
import {
  ScrollArea,
} from "./ScrollArea";
import { Send, Archive, RotateCcw, Trash2 } from "lucide-react";
import { Button, Textarea, Badge } from "./Ui";

const DEEPSEEK_ENDPOINT = "https://api-ap-southeast-1.modelarts-maas.com/v1/chat/completions";
const DEEPSEEK_API_KEY = "vTq-UE2K7xcrt08Kn5LPQeTNfsYkA3CqAEKnK_wkhePATbk87UQY_byvmAHrfYKLGYefWvUUWoYms053d-xlog";

type MsgItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Pair = { user?: string; assistant?: string };

type ArchiveChat = {
  id: string;
  mode: string;
  timestamp: Date;
  messageCount: number;
  pairs: Pair[];
  messages: MsgItem[];
};

export default function DealSimulationPage(): JSX.Element {
  // negotiation modes used by the UI buttons (label/value)
  const negotiationModes = [
    { label: "Normal Negotiation", value: "Normal Negotiation" },
    { label: "Data-Driven", value: "Data-Driven" },
    { label: "Risk-Averse", value: "Risk-Averse" },
    { label: "Opportunistic / Maximize Benefit", value: "Opportunistic / Maximize Benefit" },
    { label: "Strategic Partner", value: "Strategic Partner" },
    { label: "Visionary", value: "Visionary" },
    { label: "Impact Investor", value: "Impact Investor" },
    { label: "Hobbyist / Topic-Focused", value: "Hobbyist / Topic-Focused" }
  ];

  // UI / chat state
  const [selectedMode, setSelectedMode] = useState<string>(negotiationModes[0].value);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MsgItem[]>([]);
  const [historyPairs, setHistoryPairs] = useState<Pair[]>([]); // committed user->assistant pairs
  const [archivedChats, setArchivedChats] = useState<ArchiveChat[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const prevModeRef = useRef<string | null>(null);

  // --- modes & prompts (translated to Chinese) ---
  const modesObj = {
    "Default mode":
      "您是一位以教学与建议为主的投资人。"
      + "模拟谈判时保持礼貌、谦逊。"
      + "第一个问题通常会问：今天有什么要向我们介绍的？"
      + "不要一次问很多问题或多项内容，应逐一提问以便聚焦。"
      + "在创业者未介绍完之前，不要急于追问深入信息。"
      + "解释深层术语，例如 ROI、burn rate、LTV、CAC、盈亏平衡点、融资轮、股权稀释、"
      + "市场份额、客户群、收入模式、资金、增长。"
      + "提供建议与需要注意的事项。"
      + "在被请求时帮助构思市场计划，并举例可行的方法。"
      + "此模式适合初学者.",
    Custom: {
      "Normal Negotiation":
        "您是在真实谈判场景中的投资人。"
        + "态度认真但保持礼貌。"
        + "使用金融与创业相关术语。"
        + "第一个问题通常会问：今天来向我们展示什么？"
        + "在创业者介绍完之前，不要急于追问深层信息。"
        + "如果想法与数字合情合理 → 以礼貌语言达成交易。"
        + "在获得提出股份百分比的机会时，可以提出交易条款。"
        + "有时可能会根据情况提出更低或更高的出价。"
        + "如果不合理 → 直接拒绝该交易。"
        + "每句话都要指出弱点或风险。"
        + "回答时仅问一个犀利的问题。"
        + "强调数字，例如市场份额、收入、利润、客户群。",
      "Data-Driven":
        "您是一位重视数据分析的投资人。"
        + "所有问题都会聚焦于单元经济学，例如 CAC、LTV、流失率、毛利率、burn rate、runway。"
        + "关注市场份额、ARR、MRR、收入增长。"
        + "如果没有可验证的数字数据 → 立即拒绝投资。"
        + "语气严肃、直截了当并提供精准反馈。",
      "Risk-Averse":
        "您是一位高度重视风险管控的投资人。"
        + "关注 burn rate、runway、盈亏平衡与风险缓释策略为主。"
        + "每一项弱点都必须有备选方案。"
        + "以自身经验做出判断。"
        + "强调深入质询风险面向。"
        + "询问所有风险点，例如现金流、股权稀释、财务稳定性。"
        + "如果 startup 没有风险管理 → 立即拒绝。",
      "Opportunistic / Maximize Benefit":
        "您是一位追求最大利益的投资人。"
        + "致力于以最低估值与最高股权达成交易。"
        + "关注 ROI、估值、清算优先权。"
        + "努力压低价格，对每一项数字施加压力。"
        + "若数字不合理 → 利用筹码拒绝或进一步压价。"
        + "沟通直接，但仍保持礼貌。",
      "Strategic Partner":
        "您是一位注重协同与价值增值的投资人。"
        + "关注合作伙伴关系、分销渠道、联合品牌、合资企业。"
        + "谈判时会询问对方利用您网络的能力。"
        + "强调建立生态系统与市场扩张。"
        + "即使不大幅压低估值，也会深入询问协同效应。"
        + "如果没有明确的协同 → 拒绝的可能性很高。"
        + "在投入上非常实际。",
      "Visionary":
        "您是一位富有远见的投资人。"
        + "关注可扩展性、全球扩张、创新与市场颠覆。"
        + "更看重十年路线图而非短期营收。"
        + "回应时会在创始人介绍后询问宏大愿景。"
        + "如果缺乏明确愿景 → 拒绝。"
        + "表达积极但基于长期增长的信心。",
      "Impact Investor":
        "您是一位关注影响力/ESG 的投资人。"
        + "关注能产生社会影响、环境影响、持续性的企业。"
        + "将其与联合国可持续发展目标 (UN SDGs) 与 ESG 指标连接。"
        + "即便回报不高，但影响必须明确可衡量。"
        + "谈判时会询问可衡量的影响、治理、伦理采购。"
        + "若仅关注利润且没有影响 → 立即拒绝。",
      "Hobbyist / Topic-Focused":
        "您是一位因兴趣而投资的天使投资人。"
        + "关注特定主题，例如 AI、游戏、生物科技或区块链。"
        + "谈判时会深入技术领域。"
        + "仍会关注商业模式，但更看重热情、创新与新颖性。"
        + "若创意对您来说不够吸引 → 快速失去兴趣。"
    }
  } as const;
  // --- end modes/prompts ---

  // Build system prompt from current selected mode:
  function buildPromptFor(selected: string) {
    const base =
      "您是一个模拟初创公司路演的 AI 投资人。"
      + "使用简短、犀利且切中要点的问题。"
      + "并使用金融/创业术语，例如 ROI、burn rate、LTV、CAC、盈亏平衡点、"
      + "融资轮、股权稀释、市场份额、客户群、收入模式、融资、增长。";

    let style = "";
    // if selected matches one of negotiationModes, treat as Custom selected
    if (negotiationModes.some((m) => m.value === selected)) {
      // @ts-ignore
      style = (modesObj as any).Custom[selected] ?? "";
      return base + "\n\n" + style + "\n\n请使用英语进行所有对话 (Please respond in English for all replies).";
    }
    // fallback to default mode
    style = modesObj["Default mode"];
    return base + "\n\n" + style + "\n\n请使用英语进行所有对话 (Please respond in English for all replies).";
  }

  // helper to generate IDs
  const makeId = (prefix = "") => `${prefix}${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  // auto-save on selectedMode change (archive previous and reset chat)
  useEffect(() => {
    const prev = prevModeRef.current;
    if (prev !== null && prev !== selectedMode) {
      // if there is content in current messages or history, archive it using prev mode label
      if (messages.length > 0 || historyPairs.length > 0) {
        const archive: ArchiveChat = {
          id: makeId("archive-"),
          mode: prev,
          timestamp: new Date(),
          messageCount: messages.length,
          pairs: [...historyPairs],
          messages: [...messages]
        };
        setArchivedChats((s) => [archive, ...s]);
      }
      // reset chat immediately after saving
      setMessages([]);
      setHistoryPairs([]);
    }
    prevModeRef.current = selectedMode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMode]);

  // scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // send message handler (Enter in textarea or Send button)
  async function handleSend() {
    const trimmed = message.trim();
    if (!trimmed) return;

    // append user message
    const userMsg: MsgItem = { id: makeId("m-"), role: "user", content: trimmed, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setMessage("");

    // append thinking placeholder
    const thinkingId = makeId("thinking-");
    const thinkingMsg: MsgItem = { id: thinkingId, role: "assistant", content: "... thinking", timestamp: new Date() };
    setMessages((m) => [...m, thinkingMsg]);
    setLoading(true);

    try {
      // prepare history pairs -> messages for API
      const historyMessages = historyPairs.flatMap((p) =>
        [
          p.user ? { role: "user", content: p.user } : null,
          p.assistant ? { role: "assistant", content: p.assistant } : null
        ].filter(Boolean)
      ) as { role: string; content: string }[];

      const systemPrompt = buildPromptFor(selectedMode);

      const payload = {
        model: "deepseek-v3.1",
        messages: [
          { role: "system", content: systemPrompt },
          ...historyMessages,
          { role: "user", content: trimmed }
        ],
        max_tokens: 512,
        temperature: 0.3
      };

      const resp = await fetch("/deepseek/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      const generated = data?.choices?.[0]?.message?.content ?? "No response";

      // remove thinking and append actual assistant message
      setMessages((m) => m.filter((x) => x.id !== thinkingId));
      const botMsg: MsgItem = { id: makeId("m-"), role: "assistant", content: generated, timestamp: new Date() };
      setMessages((m) => [...m, botMsg]);

      // commit pair to history
      setHistoryPairs((p) => [...p, { user: trimmed, assistant: generated }]);
    } catch (err: any) {
      // remove thinking and show error
      setMessages((m) => m.filter((x) => x.id !== thinkingId));
      const errMsg: MsgItem = { id: makeId("err-"), role: "assistant", content: `⚠️ Error: ${err?.message ?? String(err)}`, timestamp: new Date() };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  // Archive & New (button)
  function handleArchive() {
    if (messages.length === 0 && historyPairs.length === 0) return;
    const archive: ArchiveChat = {
      id: makeId("archive-"),
      mode: selectedMode,
      timestamp: new Date(),
      messageCount: messages.length,
      pairs: [...historyPairs],
      messages: [...messages]
    };
    setArchivedChats((s) => [archive, ...s]);
    setMessages([]);
    setHistoryPairs([]);
  }

  // Clear Current
  function handleClear() {
    setMessages([]);
    setHistoryPairs([]);
  }

  // Restore archived chat
  function handleRestore(id: string) {
    const item = archivedChats.find((a) => a.id === id);
    if (!item) return;
    // archive current first (silent)
    if (messages.length > 0 || historyPairs.length > 0) {
      const currentArchive: ArchiveChat = {
        id: makeId("archive-"),
        mode: selectedMode,
        timestamp: new Date(),
        messageCount: messages.length,
        pairs: [...historyPairs],
        messages: [...messages]
      };
      setArchivedChats((s) => [currentArchive, ...s]);
    }
    // restore selected
    setMessages(item.messages.map(m => ({ ...m })));
    setHistoryPairs(item.pairs.map(p => ({ ...p })));
    setSelectedMode(item.mode);
  }

  // Delete archived chat
  function handleDelete(id: string) {
    setArchivedChats((s) => s.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen min-w-screen bg-[#040E18]">
      {/* <Navigation /> */}

      <main className="pt-16">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          {/* Header */}
          <div className="mb-6 mt-3">
            <h1 className="text-5xl font-bold text-foreground mb-2">Deal Simulation</h1>
            <p className="text-lg text-muted-foreground">
              Simulate negotiations with AI using different investor personas
            </p>
          </div>

          {/* Negotiation Mode Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground font-semibold">
                Negotiation Strategy
              </p>
              <div className="flex items-center justify-center text-xs font-semibold w-38 h-7 rounded-2xl border border-[#252732]">
                Auto-saves on switch
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {negotiationModes.map((mode) => (
                <Button
                  key={mode.value}
                  onClick={() => setSelectedMode(mode.value)}
                  variant={selectedMode === mode.value ? "default" : "outline"}
                  size="sm"
                  className={`text-xs ${
                    selectedMode === mode.value ? "bg-blue-700" :  "shadow-none"
                  }`}
                >
                  {mode.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="bg-blue-900/10 border border-[#252732] rounded-lg overflow-hidden shadow-sm">
            {/* Messages */}
            <ScrollArea className="h-[400px] p-6" ref={scrollRef as any}>
              {messages.length === 0 ? (
                <div className="h-full  flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-2">
                      No messages in current session
                    </p>
                    <p className="text-xs text-gray-500">
                      Type below to start negotiating
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                          msg.role === "user"
                            ? "bg-blue-500 text-primary-foreground"
                            : "bg-blue-700/20 text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            msg.role === "user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border border-[#252732] p-4 bg-muted/30">
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="min-h-[80px] mb-3 resize-none bg-black/50 border border-gray-800 text-sm"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={handleSend}
                    className="gap-2 w-25 h-12 flex items-center justify-center bg-blue-500 rounded-lg hover:bg-blue-500/20 "
                    disabled={!message.trim() || loading}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                  <button
                    onClick={handleArchive}
                    className="gap-2 w-40 h-12 bg-black/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-400"
                    disabled={messages.length === 0 && historyPairs.length === 0}
                  >
                    <Archive className="w-3.5 h-3.5" />
                    Archive & New
                  </button>
                  <button
                    onClick={handleClear}
                    variant="outline"
                    size="sm"
                    className="gap-2 w-40 h-12 bg-black/50 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-400"
                    disabled={messages.length === 0 && historyPairs.length === 0}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear Current
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>

          {/* Archived Conversations */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">
                Archived Conversations
              </h2>
              <Badge variant="secondary" className="text-xs">
                {archivedChats.length} archived
              </Badge>
            </div>

            {archivedChats.length === 0 ? (
              <div className="bg-card border border border-[#252732] rounded-lg p-8 text-center">
                <p className="text-sm text-gray-500">
                  No archived conversations yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {archivedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-card border border-[#252732] rounded-lg p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Negotiation ({chat.mode})
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {chat.timestamp.toLocaleString()} · {chat.messageCount}{" "}
                          messages
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRestore(chat.id)}
                          className="text-xs font-semibold bg-black/50 border border-gray-700 w-15 h-8 rounded-lg hover:bg-blue-400"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handleDelete(chat.id)}
                          className="text-xs bg-black/50 border border-gray-700 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
