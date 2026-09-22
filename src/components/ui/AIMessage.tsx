import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { Bot } from 'lucide-react-native';

interface AIMessageProps {
  role: 'user' | 'assistant';
  text: string;
}

export function AIMessage({ role, text }: AIMessageProps) {
  const isAssistant = role === 'assistant';
  return (
    <View style={[styles.container, isAssistant ? styles.assistantContainer : styles.userContainer]}>
      {isAssistant && (
        <View style={styles.avatar}>
          <Bot size={18} color={Colors.white} strokeWidth={2} />
        </View>
      )}
      <View style={[styles.bubble, isAssistant ? styles.assistantBubble : styles.userBubble]}>
        <Text style={[styles.text, isAssistant ? styles.assistantText : styles.userText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primarySage,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
  },
  assistantBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  userBubble: {
    backgroundColor: Colors.primarySage,
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: Typography.body.fontSize,
    lineHeight: 22,
  },
  assistantText: {
    color: Colors.textPrimary,
  },
  userText: {
    color: Colors.white,
  },
});
