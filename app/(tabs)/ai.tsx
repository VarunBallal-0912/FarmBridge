import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { AIMessage as AIMessageBubble } from '@/components/ui/AIMessage';
import { SuggestionChip } from '@/components/ui/SuggestionChip';
import { SUGGESTED_QUESTIONS, MOCK_RESPONSES, INITIAL_MESSAGES } from '@/mock/ai';
import { Bot, Sparkles, ArrowUp } from 'lucide-react-native';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('season') || q.includes('grow') || q.includes('crop')) return MOCK_RESPONSES.season;
  if (q.includes('yellow') || q.includes('tomato') || q.includes('leaves')) return MOCK_RESPONSES.tomato_leaves;
  if (q.includes('onion') || q.includes('price') || q.includes('today')) return MOCK_RESPONSES.onion_price;
  if (q.includes('scheme') || q.includes('government') || q.includes('subsidy')) return MOCK_RESPONSES.schemes;
  return MOCK_RESPONSES.default;
}

let msgId = 100;
function newId() { return String(++msgId); }

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', text: INITIAL_MESSAGES[0].text },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: newId(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(text);
      const aiMsg: Message = { id: newId(), role: 'assistant', text: response };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  }

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.aiAvatar}>
            <Bot size={22} color={Colors.white} strokeWidth={2} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Kisan AI</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.subtitle}>Instant Agricultural Advisory</Text>
            </View>
          </View>
        </View>

        {/* Suggestion chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suggestionsScroll}
          contentContainerStyle={styles.suggestionsContent}
        >
          {SUGGESTED_QUESTIONS.map(q => (
            <SuggestionChip
              key={q}
              label={q}
              icon={Sparkles}
              onPress={() => sendMessage(q)}
            />
          ))}
        </ScrollView>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <AIMessageBubble role={item.role} text={item.text} />}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingContainer}>
                <View style={styles.typingBubble}>
                  <Text style={styles.typingText}>Kisan AI is analyzing...</Text>
                </View>
              </View>
            ) : null
          }
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask about crops, prices, diseases..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={300}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            activeOpacity={0.8}
            disabled={!input.trim() || isTyping}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <ArrowUp size={20} color={Colors.white} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.screenBg,
  },
  aiAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  subtitle: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  suggestionsScroll: {
    flexGrow: 0,
  },
  suggestionsContent: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  messageList: {
    padding: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  typingContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  typingBubble: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  typingText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.screenBg,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: Colors.border,
  },
});
