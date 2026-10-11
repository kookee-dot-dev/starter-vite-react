import { KookeeChatWidget } from '@kookee/react/chat';
import '@kookee/react/chat.css';
import { API_KEY } from '../lib/env';

export default function ChatWidget() {
  return <KookeeChatWidget clientOptions={{ apiKey: API_KEY ?? undefined }} theme="auto" />;
}
